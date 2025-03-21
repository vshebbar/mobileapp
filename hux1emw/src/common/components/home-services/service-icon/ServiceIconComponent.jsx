import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/theme-provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons"; // ✅ Importing checkmark icon

const ServiceIconComponent = ({ service, isSelected, customStyles, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.iconContainer,
        isSelected && styles.isSelected,
        { backgroundColor: isSelected ? "rgba(40, 9, 194, 0.3)" : "transparent" },
        ...customStyles,
      ]}
      onPress={onPress}
    >
      {/* ✅ Service Icon */}
      <Image source={service.icon} style={styles.icon} />

      {/* ✅ Service Name */}
      <Text style={[styles.serviceText, { color: theme.text }]}>{service.name}</Text>

      {/* ✅ Checkmark Icon for Selected State */}
      {isSelected && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={16} color="#7B61FF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ServiceIconComponent;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 15,
    position: "relative",
  },
  isSelected: {
    borderColor: "#7B61FF",
    borderWidth: 2,
    borderRadius: 15,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 80,
  },
  checkmarkContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 2,
  },
});
