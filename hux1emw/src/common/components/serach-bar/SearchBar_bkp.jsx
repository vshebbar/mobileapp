import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/theme-provider/ThemeProvider";

const optionsFiller1 = ["maintain", "repair", "replace", "install"];
const optionsFiller3 = ["kitchen", "bathroom", "garage", "living room"]; // Example options

const SearchBar = ({ onSearch }) => {
  const { theme } = useTheme();

  const [filler1, setFiller1] = useState(optionsFiller1[0]);
  const [filler2, setFiller2] = useState("");
  const [filler3, setFiller3] = useState(optionsFiller3[0]);
  const [modalVisible, setModalVisible] = useState({ filler1: false, filler3: false });

  const searchQuery = `I want to ${filler1} my ${filler2} in ${filler3}`;

  return (
    <View style={[styles.searchContainer, { backgroundColor: theme.gradientRangeInside }]}>
      <Text style={styles.text}>I want to </Text>
      {/* Filler1 Dropdown */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible({ ...modalVisible, filler1: true })}>
        <Text style={[styles.dropdownText, { color: theme.text }]}>{filler1}</Text>
        <Ionicons name="chevron-down" size={16} color={theme.text} />
      </TouchableOpacity>

      <Text style={styles.text}>my</Text>

      {/* Filler2 Input */}
      <TextInput
        style={[styles.inputField, { color: theme.text }]}
        placeholder="Enter item"
        placeholderTextColor={theme.placeholderText}
        value={filler2}
        onChangeText={setFiller2}
      />

      <Text style={styles.text}>in</Text>

      {/* Filler3 Dropdown */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible({ ...modalVisible, filler3: true })}>
        <Text style={[styles.dropdownText, { color: theme.text }]}>{filler3}</Text>
        <Ionicons name="chevron-down" size={16} color={theme.text} />
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity onPress={() => onSearch(searchQuery)} style={styles.iconButton}>
        <Ionicons name="search" size={20} color={theme.text} />
      </TouchableOpacity>

      {/* Dropdown Modals */}
      {["filler1", "filler3"].map((key) => (
        <Modal key={key} visible={modalVisible[key]} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible({ ...modalVisible, [key]: false })}>
            <View style={[styles.modalContainer, { backgroundColor: theme.backgroundLevel2 }]}>
              <FlatList
                data={key === "filler1" ? optionsFiller1 : optionsFiller3}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      key === "filler1" ? setFiller1(item) : setFiller3(item);
                      setModalVisible({ ...modalVisible, [key]: false });
                    }}
                  >
                    <Text style={[styles.modalText, { color: theme.text }]}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 10,
    // width: "90%",
    height: 50,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#333",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 5,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#777",
  },
  iconButton: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 200,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  modalText: {
    fontSize: 16,
  },
});

export default SearchBar;
