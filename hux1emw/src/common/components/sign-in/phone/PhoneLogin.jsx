import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../../context/theme-provider/ThemeProvider";
import { LOG } from "../../../utilities/logger";

const PhoneLogin = () => {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneLogin = () => {
    if (!phoneNumber.trim()) {
      LOG.error("Phone number is required");
      return;
    }
    LOG.info(`Attempting phone login with number: ${phoneNumber}`);
    // Integrate Firebase or Twilio OTP verification here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.background }]}
        placeholder="Enter your phone number"
        placeholderTextColor={theme.placeholderText}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={[styles.button, phoneNumber.trim() ? styles.enabledButton : styles.disabledButton]} onPress={handlePhoneLogin} disabled={!phoneNumber.trim()}>
        <Text style={[styles.buttonText, { color: phoneNumber.trim() ? theme.text : "#A0A0A0" }]}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: "#ccc",
  },
  button: {
    width: "90%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  enabledButton: {
    backgroundColor: "#6B46C1",
  },
  disabledButton: {
    backgroundColor: "#4B4B4B",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PhoneLogin;
