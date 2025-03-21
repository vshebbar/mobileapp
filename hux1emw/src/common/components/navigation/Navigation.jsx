import { NavigationContainer } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultProfilePic from "../../../../assets/images/defaultProfilePic.png";
import { AppContext } from "../../context/context-provider/ContextProvider";
import { useTheme } from "../../context/theme-provider/ThemeProvider";
import BottomTabs from "../bottoms-tabs/BottomTabs";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../serach-bar/SearchBar";

const Header = () => {
  const { appData } = useContext(AppContext);
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    /* TODO: Handle search */
  };
  const handleClearText = () => {
    setSearchText("");
  };
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <Image
            source={DefaultProfilePic} // Replace with actual profile picture URL
            style={styles.profileImage}
          />
          <Text style={[styles.greeting, { color: theme.text }]}>
            Hello, <Text style={styles.username}>{appData?.userInfo?.displayName ?? Cincy}</Text>
          </Text>
        </View>
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.circularIconBackground }]}>
          <Ionicons name="notifications-circle" size={32} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} onSearch={handleSearch} onClear={handleClearText} />
      </View>
    </View>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Header />
      <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 50,
    padding: 10,
  },
  profileRow: {
    flexDirection: "row",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "left",
  },
  greeting: {
    padding: 10,
    fontSize: 18,
    alignItems: "left",
  },
  username: {
    fontWeight: "bold",
  },
  searchButton: {
    // padding: 10,
    // paddingRight: 0,
    borderRadius: 20,
    right: -18,
    top: 1,
  },
  searchContainer: {
    // width: "90%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
  },
});
