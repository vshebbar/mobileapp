import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme-provider/ThemeProvider";

const SearchBar = ({ searchText, setSearchText, onSearch, onClear }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.searchContainer, { backgroundColor: theme.gradientRangeInside }]}>
      <TextInput
        style={[styles.searchInput, { color: theme.text }]}
        placeholder="Search"
        placeholderTextColor={theme.placeholderText}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* 🔥 Icons placed next to each other */}
      <View style={styles.iconContainer}>
        {searchText.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.iconButton}>
            <Ionicons name="close" size={20} color={theme.placeholderText} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onSearch} style={styles.iconButton}>
          <Ionicons name="search" size={20} color={theme.placeholderText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 15,
    width: "100%",
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: 50,
  },
  iconContainer: {
    flexDirection: "row", // 🔥 Ensures icons are in a row
    alignItems: "center",
  },
  iconButton: {
    padding: 8, // Adds spacing between icons
  },
});

export default SearchBar;
