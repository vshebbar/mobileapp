import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ServicesSearch from "../common/components/services-search/ServicesSearch";
import { useTheme } from "../common/context/theme-provider/ThemeProvider";
import { useRoute } from "@react-navigation/native";
import HomeServices from "../common/components/home-services/HomeServices";

const FindAPro = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const { theme } = useTheme();
  const selectedDate = route.params?.selectedDate || new Date().toISOString().split("T")[0];

  useEffect(() => {
    console.log("Selected Date for Find a Pro:", selectedDate);
  }, [selectedDate]);

  const handleClearText = () => {
    setSearchText("");
    setSearchQuery("");
    setResults([]);
  };

  const handleSearch = () => {
    setSearchQuery(searchText);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundLevel2 }]}>
      {/* <Text style={[styles.headerText, { color: theme.text }]}>Find a Professional</Text>
      <Text style={[styles.dateText, { color: theme.text }]}>Date: {selectedDate}</Text> */}

      {/* <View style={[styles.searchContainer, { backgroundColor: theme.gradientRangeInside }]}>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search for a Professional"
          placeholderTextColor={theme.placeholderText}
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.iconContainer}>
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearText} style={styles.iconButton}>
              <Ionicons name="close" size={20} color={theme.placeholderText} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
            <Ionicons name="search" size={20} color={theme.placeholderText} />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* <ServicesSearch results={results} setResults={setResults} searchQuery={searchQuery} />
      {results.length === 0 && (
        <View>
          <View style={styles.noResultContainer}>
            <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={[styles.iconCircle, { shadowColor: theme.gradientPurple }]}>
              <SimpleLineIcons name="user-unfollow" size={120} color={theme.lightPurple} />
            </LinearGradient>
          </View>
          <Text style={[styles.infoText, { color: theme.text }]}>This application is for</Text>
          <Text style={[styles.infoText, { color: theme.placeholderText }]}>home maintenance only.</Text>
        </View>
      )} */}
      <HomeServices />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    alignSelf: "flex-start",
  },
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
});

export default FindAPro;
