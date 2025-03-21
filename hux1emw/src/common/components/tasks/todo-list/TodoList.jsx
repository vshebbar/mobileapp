import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useTheme } from "../../../context/theme-provider/ThemeProvider";
import TodoCard from "../todo-card/TodoCard";

const TodoList = ({ tasks, setTasks }) => {
  const { theme } = useTheme();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null); // ✅ Reference to `KeyboardAwareScrollView`

  const handleFocus = (ref) => {
    if (scrollViewRef.current && ref?.current) {
      scrollViewRef.current.scrollToFocusedInput(ref.current);
    }
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  if (tasks.length === 0) {
    return (
      // <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No Tasks Yet</Text>
          <Text style={[styles.emptyMessage, { color: theme.secondaryText }]}>Stay organized! Start by adding your first task.</Text>
        </View>
      </TouchableWithoutFeedback>
      // </KeyboardAwareScrollView>
    );
  }

  return (
    // <View style={[styles.taskContainer, { maxHeight: isKeyboardVisible ? "100%" : "90%" }]}>
    <View style={[styles.taskContainer]}>
      {/* <KeyboardAwareScrollView
        ref={scrollViewRef}
        extraScrollHeight={Platform.OS === "ios" ? 120 : 100}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.flex}
      > */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} keyboardShouldPersistTaps="handled">
        <View style={styles.taskListContainer}>
          {tasks.map((task) => (
            <TodoCard key={task.id} task={task} onUpdateTask={updateTask} onFocus={handleFocus} />
          ))}
        </View>
      </TouchableWithoutFeedback>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
  },
  taskContainer: {
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    flex: 1,
  },
  taskListContainer: {
    padding: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
});
