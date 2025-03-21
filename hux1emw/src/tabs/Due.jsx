import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomCalendar from "../common/components/calendar/CustomCalendar";
import TaskList from "../common/components/tasks/task-list/TaskList";
import { useTheme } from "../common/context/theme-provider/ThemeProvider";
import { LOG } from "../common/utilities/logger";
import { generateMockTasks } from "../resources/mocks/tasks/tasks";

const today = new Date().toISOString().split("T")[0];
const MockTasks = generateMockTasks();

const Due = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const screenHeight = Dimensions.get("window").height;
  const [selectedDate, setSelectedDate] = useState(today);

  const formattedTasks = useMemo(() => {
    const taskMap = {};
    MockTasks.forEach((task) => {
      if (!taskMap[task.date]) {
        taskMap[task.date] = [];
      }
      taskMap[task.date].push(task.status.toLowerCase());
    });
    return taskMap;
  }, [MockTasks]);

  const selectedDayTrigger = (date) => {
    LOG.info(`Selected date: ${date}`);
    setSelectedDate(date);
  };

  const filteredTasks = MockTasks.filter((task) => task.date === selectedDate);

  const handleFindAPro = () => {
    navigation.navigate("Find a Pro", { selectedDate });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomCalendar screenHeight={screenHeight} tasks={formattedTasks} startDate={null} endDate={null} selectedDayTrigger={selectedDayTrigger} />

      {/* Show No Tasks UI If No Tasks Exist */}
      {filteredTasks.length === 0 && (
        <View style={styles.noTasksContainer}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={[styles.message, { color: theme.text }]}>Enjoy the freedom, no plans today! ✨</Text>
        </View>
      )}

      {/* Task List */}
      {filteredTasks.length > 0 && <TaskList tasks={MockTasks} selectedDate={selectedDate} />}

      {/* Floating "Find a Pro" Button */}
      <TouchableOpacity style={styles.fabContainer} onPress={handleFindAPro}>
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={styles.fabButton}>
          <FontAwesome name="plus" size={30} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Due;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noTasksContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emoji: {
    fontSize: 36,
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  /* 🔥 Floating "Find a Pro" Button */
  fabContainer: {
    position: "absolute",
    bottom: 80,
    right: 20,
    zIndex: 10, // Ensures it stays above other UI elements
    elevation: 10, // For Android
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
