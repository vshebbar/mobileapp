import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import HuxHomeBackground from "../../assets/images/huxedo-home-background.png";
import { useTheme } from "../common/context/theme-provider/ThemeProvider";
import SearchBar from "../common/components/serach-bar/SearchBar";

const Huxedo = () => {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    /* TODO: Handle search */
  };
  const handleClearText = () => {
    setSearchText("");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* <SearchBar searchText={searchText} setSearchText={setSearchText} onSearch={handleSearch} onClear={handleClearText} /> */}
      <View style={styles.imageContainer}>
        <Image source={HuxHomeBackground} style={styles.image} />
      </View>
      <View style={[styles.titleContainer]}>
        <Text style={[styles.text, styles.title, { color: theme.text }]}>Huxedo</Text>
        <Text style={[styles.text, styles.subtitle, { color: theme.text }]}>Home maintenance tailored</Text>
        <Text style={[styles.text, styles.subtitle, { color: theme.text }]}>to fit your lifestyle</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 450,
    height: 450,
    resizeMode: "contain",
  },
  titleContainer: {
    alignItems: "center",
    margin: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Huxedo;
