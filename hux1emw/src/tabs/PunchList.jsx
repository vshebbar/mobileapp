import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TodoList from "../common/components/tasks/todo-list/TodoList";
import { useTheme } from "../common/context/theme-provider/ThemeProvider";
import TODOs from "../resources/mocks/tasks/todos.json";

const PunchList = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState(TODOs);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: "New Task",
      description: "Task description",
      category: "General",
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundLevel2 }]}>
      {/* Header with Add Task Button */}
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.text }]}>My To-do List</Text>

        {/* Add Task Button with Gradient */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={styles.addButtonCircle}>
            <FontAwesome name="plus" size={24} color={theme.text} />
          </LinearGradient>
          {/* <Text style={styles.addButtonText}>Add Task</Text> */}
        </TouchableOpacity>
      </View>

      {/* <Text style={[styles.headerSubText, { color: theme.placeholderText }]}>List all your home maintenance to-dos here</Text> */}

      <View style={[styles.contentContainer, { backgroundColor: theme.gradientRangeInside }]}>
        <TodoList tasks={tasks} setTasks={setTasks} />
      </View>
      {/* </View> */}
    </View>
  );
};

export default PunchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    paddingTop: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Aligns button to the right
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
  },
  headerSubText: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
  },
  addButton: {
    alignItems: "center",
  },
  addButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    marginTop: 5,
    color: "#fff",
    fontSize: 14,
  },
});
