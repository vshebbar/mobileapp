import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TaskCard from "../task-card/TaskCard";

const TaskList = ({ tasks = [], selectedDate }) => {
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.taskContainer}>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </ScrollView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  taskContainer: {
    padding: 15,
  },
});
