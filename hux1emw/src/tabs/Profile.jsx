import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../common/context/context-provider/ContextProvider";
import { DEFAULT_APP_CONTEXT } from "../common/utilities/constants";
import { LOG } from "../common/utilities/logger";
import { clearStorage } from "../common/utilities/storageUtility";
import SearchBar from "../common/components/serach-bar/SearchBar";
import SettingsSection from "../common/components/profile/SettingsSection";
import PaymentsSection from "../common/components/profile/PaymentsSection";
import HistorySection from "../common/components/profile/HistorySection";
import NotificationsSection from "../common/components/profile/NotificationsSection";
import HelpSupportSection from "../common/components/profile/HelpSupportSection";
import AboutSection from "../common/components/profile/AboutSection";

const Profile = () => {
  const { setAppdata } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    LOG.info("Initiating logout");
    clearStorage();
    setAppdata(DEFAULT_APP_CONTEXT);
    LOG.info("Successfully logged out");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sections */}
        <SettingsSection />
        <PaymentsSection />
        <HistorySection />
        <NotificationsSection />
        <HelpSupportSection />
        <AboutSection />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.signout}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  searchContainer: { alignItems: "center" },
  scrollContainer: { padding: 20, paddingTop: 0 },
  logoutButton: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  signout: { fontSize: 16, color: "#fff", marginVertical: 10 },
});

export default Profile;
