import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import * as Device from "expo-device";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { getTranscriptFromGoogle } from "../services/GoogleServices";
import { LOG } from "./logger";

const requestMicrophonePermission = async () => {
  try {
    const response = await Audio.requestPermissionsAsync();
    const isSimulator = Platform.OS === "ios" && !Platform.isTV && !Device.isDevice;
    if (isSimulator) {
      LOG.warn("Since the device is running in simulator, proceeding with proxy permission");
      return { status: "granted" };
    } else {
      return response;
    }
  } catch (error) {
    LOG.error(`Failed fetching microphone permissions with error: ${JSON.stringify(error)}`);
  }
};

const configureAudioMode = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
  } catch (error) {
    LOG.error(`Failed configuring audio mode with error: ${JSON.stringify(error)}`);
  }
};

export const prepareRecording = async () => {
  try {
    await configureAudioMode();

    const { status } = await requestMicrophonePermission();
    if (status !== "granted") {
      alert("Permission to access microphone is required.");
      return;
    }
    const recording = new Audio.Recording();
    LOG.info("Beginning preparation to record audio");
    await recording.prepareToRecordAsync({
      android: {
        extension: ".wav",
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_LINEAR_PCM,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_PCM_16BIT,
        sampleRate: 16000,
        numberOfChannels: 1,
      },
      ios: {
        extension: ".wav",
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 16000,
        numberOfChannels: 1,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    });
    LOG.info("Recording is prepared, async operations can start!");
    return recording;
  } catch (error) {
    LOG.error(`Failed to prepare recording with error: ${JSON.stringify(error)}`);
  }
};

export const startRecording = async (recording) => {
  try {
    LOG.info("Starting recording!");
    await recording.startAsync();
    LOG.info("Recording started successfully!");
    return true;
  } catch (error) {
    LOG.error("Failed to start recording with error:", error);
    return false;
  }
};

export const stopRecording = async (recording) => {
  try {
    if (!recording) {
      LOG.warn("No recording instance found.");
      return null;
    }

    // Stop recording and get URI
    await recording.stopAndUnloadAsync();
    const fileUri = recording.getURI();

    if (!fileUri) {
      LOG.error("Failed to retrieve recording URI.");
      return null;
    }

    // Convert audio file to base64
    const base64Audio = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (!base64Audio) {
      LOG.error("Failed to encode audio as Base64.");
      return null;
    }

    // Run audio playback & transcription in parallel
    const [_, transcript] = await Promise.all([
      playAudio(fileUri),
      getTranscriptWithRetry(base64Audio, 4), // Retry twice if network error occurs
    ]);

    return transcript;
  } catch (error) {
    LOG.error("Error processing voice input:", error?.message, error?.status);
    return null;
  }
};

// Function to play back recorded audio
const playAudio = async (uri) => {
  try {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri });
    LOG.info("Playing back recorded audio...");
    await sound.playAsync();
  } catch (error) {
    LOG.error("Error playing back audio:", error?.message);
  }
};

// Function to get transcript with retry mechanism
const getTranscriptWithRetry = async (base64Audio, retries = 3) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await getTranscriptFromGoogle(base64Audio);
    } catch (error) {
      if (attempt < retries && isNetworkError(error)) {
        LOG.warn(`Network error detected, retrying... (${attempt + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1))); // Exponential backoff
      } else {
        LOG.error("Failed to retrieve transcript after retries:", error?.message);
        LOG.error("Error:", error);
        return null;
      }
    }
  }
};

// Function to check if an error is a network issue
const isNetworkError = (error) => {
  return !error.response || error.message === "Network request failed";
};
