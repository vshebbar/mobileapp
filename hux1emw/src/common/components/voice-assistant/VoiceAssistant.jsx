import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { prepareRecording, startRecording, stopRecording } from "../../utilities/avUtility";
import { LOG } from "../../utilities/logger";
import { useTheme } from "../../context/theme-provider/ThemeProvider";

const VoiceAssistant = ({ setIsListening, setTranscript }) => {
  const { theme } = useTheme();
  const [recording, setRecording] = useState(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startListening = async () => {
    try {
      LOG.info("Starting to listen for the user query");
      setIsListening(true);
      const recording = await prepareRecording();
      if (await startRecording(recording)) {
        setRecording(recording);
      }
    } catch (error) {
      LOG.error(`Failed to capture voice commands from user with error: ${JSON.stringify(error)}`);
    }
  };

  const stopListening = async () => {
    try {
      if (recording) {
        LOG.info("Extracting transcript from recording");
        const transcript = await stopRecording(recording);
        setTranscript(transcript);
      } else {
        LOG.warn("Recording is not available to process!");
      }
    } catch (error) {
      LOG.error(`Failed to extract transcripts from recordings with error: ${JSON.stringify(error)}`);
    } finally {
      setIsListening(false);
    }
  };

  return (
    <Animated.View style={[styles.micContainer, { transform: [{ scale: pulseAnim }], borderColor: theme.borderPurple }]}>
      <Pressable onPressIn={startListening} onPressOut={stopListening}>
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.micButton}>
          <Ionicons name="mic" size={36} color="white" />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default VoiceAssistant;

const styles = StyleSheet.create({
  micContainer: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    borderWidth: 3,
  },
  micButton: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});
