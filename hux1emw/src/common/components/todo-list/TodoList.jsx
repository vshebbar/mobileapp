import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Change bathroom exhaust flap", category: "Plumbing", priority: "High" },
    { id: 2, title: "Paint backyard gate", category: "Electrical", priority: "High" },
  ]);

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modalType, setModalType] = useState(null); // "category" or "priority"

  const categories = ["Plumbing", "Electrical", "Painting", "Carpentry"];
  const priorities = ["Low", "Medium", "High"];

  const openModal = (todo, type) => {
    setSelectedTodo(todo);
    setModalType(type);
  };

  const selectOption = (value) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === selectedTodo.id ? { ...todo, [modalType]: value } : todo)));
    setSelectedTodo(null);
    setModalType(null);
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoContainer}>
      {/* Description (Single Row) */}
      <Text style={styles.todoTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>

      {/* Dropdowns & Buttons Container */}
      <View style={styles.detailsContainer}>
        {/* Category Selector */}
        <View style={styles.row}>
          <Text style={styles.label}>Category:</Text>
          <TouchableOpacity style={styles.selector} onPress={() => openModal(item, "category")}>
            <Text style={styles.selectorText}>{item.category}</Text>
            <Ionicons name="chevron-down" size={18} color="#F1F1F1" />
          </TouchableOpacity>
        </View>

        {/* Priority Selector */}
        <View style={styles.row}>
          <Text style={styles.label}>Priority:</Text>
          <TouchableOpacity style={styles.selector} onPress={() => openModal(item, "priority")}>
            <Text style={styles.selectorText}>{item.priority}</Text>
            <Ionicons name="chevron-down" size={18} color="#F1F1F1" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.proButton}>
            <Text style={styles.buttonText}>Find a Pro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarButton}>
            <Text style={styles.buttonText}>Add to Calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={todos} keyExtractor={(item) => item.id.toString()} renderItem={renderTodoItem} />

      {/* MODAL OVERLAY FOR DROPDOWN */}
      {selectedTodo && (
        <Modal transparent={true} animationType="fade" visible={!!selectedTodo} onRequestClose={() => setSelectedTodo(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select {modalType === "category" ? "Category" : "Priority"}</Text>
              {modalType === "category"
                ? categories.map((option) => (
                    <TouchableOpacity key={option} style={styles.modalOption} onPress={() => selectOption(option)}>
                      <Text style={styles.modalOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))
                : priorities.map((option) => (
                    <TouchableOpacity key={option} style={styles.modalOption} onPress={() => selectOption(option)}>
                      <Text style={styles.modalOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
              <TouchableOpacity style={styles.modalCancel} onPress={() => setSelectedTodo(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark theme background
    padding: 15,
  },
  todoContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
  },
  todoTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsContainer: {
    paddingTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: "#AFAFAF",
    fontSize: 14,
    marginRight: 10,
  },
  selector: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectorText: {
    color: "#F1F1F1",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  proButton: {
    backgroundColor: "#4267B2", // Blue "Find a Pro"
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "48%",
  },
  calendarButton: {
    backgroundColor: "#17A2B8", // Light blue "Add to Calendar"
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  modalOptionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  modalCancel: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: "#444",
    borderRadius: 6,
  },
  modalCancelText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default TodoList;
