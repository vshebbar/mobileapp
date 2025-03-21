import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import PLUMBER from "../../../../../assets/images/PLUMBER.png";
import { useTheme } from "../../../context/theme-provider/ThemeProvider";

const ManageTask = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background, shadowColor: theme.background }]}>
      {/* Left Side: Image and Title */}
      <View style={styles.leftContainer}>
        <Image source={PLUMBER} style={styles.image} />
        <Text style={[styles.title, { color: theme.text }]}>Find a Pro</Text>
      </View>

      {/* Right Side: Four Stacked Buttons */}
      <View style={styles.rightContainer}>
        {/* <TouchableOpacity style={styles.button}> */}
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
          <MaterialIcons name="task-alt" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Complete task</Text>
        </LinearGradient>
        {/* </TouchableOpacity> */}
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
          <MaterialIcons name="snooze" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Snooze task</Text>
        </LinearGradient>
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
          <MaterialIcons name="edit-calendar" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Reschedule task</Text>
        </LinearGradient>
        <LinearGradient colors={[theme.gradientRangeStart, theme.gradientBlack]} start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
          <MaterialIcons name="cancel" size={20} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Reject task</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    elevation: 5, // Android shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 15,
  },
  leftContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: 150, // Set fixed width for consistency
    height: 210, // Set fixed height
    borderRadius: 15,
    marginBottom: 5,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: 160, // Wider buttons for better readability
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 14,
  },
});

export default ManageTask;
