import { FontAwesome5, MaterialIcons, Feather, EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/theme-provider/ThemeProvider";
import { handleComingSoon } from "../../../utilities/alertsUtility";
import { CATEGORIES } from "../../../utilities/constants";

const TodoCard = ({ task, onFocus, onUpdateTask }) => {
  const { theme } = useTheme();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [selectedCategory, setSelectedCategory] = useState(task.category);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const categoryRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const showDropdown = () => {
    categoryRef.current?.measureInWindow((x, y, width, height) => {
      setModalPosition({ top: y + height + 5, left: x, width: width || 150 });
      setCategoryModalVisible(true);
    });
  };

  const toggleEditing = () => {
    if (isEditing) {
      onUpdateTask(task.id, { ...task, title, description });
    } else {
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.measure((x, y, width, height, pageX, pageY) => {
            if (pageY < 150) {
              titleRef.current.focus();
            }
          });
        }
      }, 200);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <TouchableOpacity key={task.id} style={[styles.card, { backgroundColor: theme.backgroundLevel2 }]}>
      {/* 🟢 First Row: Title, Calendar & Edit Button */}
      <View style={styles.row}>
        <View style={styles.editableContainer}>
          {isEditing ? (
            <TextInput
              ref={titleRef}
              style={[styles.taskTitle, { color: theme.text, borderBottomColor: theme.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter Title"
              placeholderTextColor={theme.secondaryText}
              onFocus={() => onFocus(titleRef)}
            />
          ) : (
            <Text style={[styles.taskTitle, { color: theme.softText }]}>{title}</Text>
          )}
        </View>

        <View style={styles.iconContainer}>
          <Pressable onPress={() => handleComingSoon("Add to calendar")}>
            <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={styles.circularIcon}>
              <FontAwesome5 name="calendar-alt" size={20} color={theme.text} />
            </LinearGradient>
          </Pressable>

          <TouchableOpacity onPress={toggleEditing} style={styles.editButton}>
            {isEditing ? <Feather name="check" size={22} color={theme.text} /> : <EvilIcons name="pencil" size={26} color={theme.text} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* 🟢 Second Row: Description & Dropdown */}
      <View style={styles.descriptionRow}>
        <View style={styles.editableContainer}>
          {isEditing ? (
            <TextInput
              ref={descriptionRef}
              style={[styles.taskDescription, { color: theme.text, borderBottomColor: theme.text }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter Description"
              placeholderTextColor={theme.secondaryText}
              multiline
              onFocus={() => onFocus(descriptionRef)}
            />
          ) : (
            <Text style={[styles.taskDescription, { color: theme.softText }]} numberOfLines={2} ellipsizeMode="tail">
              {description}
            </Text>
          )}
        </View>

        {/* Category Dropdown */}
        <TouchableOpacity ref={categoryRef} style={[styles.dropdown, { backgroundColor: theme.backgroundLevel3 }]} onPress={showDropdown}>
          <Text style={[styles.dropdownText, { color: theme.text }]}>{selectedCategory}</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* ✅ Category Dropdown Modal */}
      <Modal visible={categoryModalVisible} transparent animationType="fade" onRequestClose={() => setCategoryModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setCategoryModalVisible(false)}>
          <View style={[styles.modalContainer, { top: modalPosition.top, left: modalPosition.left, width: modalPosition.width }]}>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCategory(item);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalText, { color: theme.text }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  editableContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "transparent",
    paddingVertical: 2,
    marginRight: 5,
  },
  taskDescription: {
    fontSize: 14,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "transparent",
    paddingVertical: 2,
    marginRight: 5,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    justifyContent: "space-between",
    marginLeft: 10,
    minWidth: 120,
  },
  dropdownText: {
    fontSize: 11,
    flex: 1,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginLeft: 8,
    padding: 5,
  },
  circularIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "absolute",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  modalText: {
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
