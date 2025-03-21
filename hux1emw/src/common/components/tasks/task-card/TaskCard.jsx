import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const TaskCard = ({ task }) => {
  return (
    <View key={task.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.taskDate}>📅 {task.date}</Text>
        <Image source={{ uri: task.icon }} style={styles.agentIcon} />
      </View>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{task?.title}</Text>
        <TouchableOpacity style={styles.statusButtonContainer}>
          <LinearGradient
            colors={task.status.toLowerCase() === "done" ? ["#4CAF50", "#2E7D32"] : task.status.toLowerCase() === "due" ? ["#2196F3", "#1565C0"] : ["#F44336", "#D32F2F"]}
            style={styles.statusButton}
          >
            <Text style={styles.statusText}>{task.status}</Text>
            {task.status.toLowerCase() === "done" && <FontAwesome name="download" size={16} color="white" style={styles.downloadIcon} />}
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.taskCategory}>
        {task?.category} • {task?.agent}
      </Text>
      <View style={styles.taskDetails}>
        {task.price ? <Text style={styles.price}>💰 {task.price}</Text> : null}
        {task.ratings ? <Text style={styles.ratings}>⭐ {task.ratings} out of 5</Text> : null}
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDate: {
    color: "#b0b0b0",
    fontSize: 14,
  },
  agentIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  taskInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  taskTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  taskCategory: {
    color: "#b0b0b0",
    fontSize: 14,
    marginTop: 3,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  price: {
    color: "#f0c674",
    fontSize: 14,
  },
  ratings: {
    color: "#f0c674",
    fontSize: 14,
  },
  statusButtonContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusText: {
    color: "#ffffff",
    fontWeight: "bold",
    marginRight: 5,
  },
  downloadIcon: {
    marginLeft: 5,
  },
});
