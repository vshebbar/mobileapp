import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageAIAssistant from "../../assets/images/IMG_AI_Assistant.png";
import RotateImageInLoop from "../common/components/rotate-image-in-loop/RotateImageInLoop";
import VoiceAssistant from "../common/components/voice-assistant/VoiceAssistant";
import { handleComingSoon } from "../common/utilities/alertsUtility";
import { useTheme } from "../common/context/theme-provider/ThemeProvider";

const Home = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.listeningText}>{isListening ? "I'm listening..." : ""}</Text>
      <RotateImageInLoop rotate={isListening} imageSource={ImageAIAssistant} classNames={styles.aiOrb} />

      {/* Detected Speech */}
      <Text style={styles.speechText}>{transcript}</Text>

      {/* Voice Control Buttons */}
      <View style={styles.buttonContainer}>
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.actionButton}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleComingSoon("Language selection")}>
            <Ionicons name="language" size={22} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        <VoiceAssistant setIsListening={setIsListening} setTranscript={setTranscript} />

        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.actionButton}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleComingSoon("Clearing of voice results")}>
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  listeningText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  aiOrb: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginVertical: 15,
  },
  speechText: {
    color: "gray",
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 100,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
