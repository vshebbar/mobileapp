import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import UserProfileScreen from "../../../screens/UserProfileScreen";
import ManageHomes from "../home/manage-home/ManageHome";

const SettingsSection = () => {
  const [expanded, setExpanded] = useState(true);
  const [showManageHomes, setShowManageHomes] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.optionButton} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.sectionTitle}>Settings</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.subSection}>
          <UserProfileScreen />
          <TouchableOpacity style={styles.optionButton} onPress={() => setShowManageHomes(!showManageHomes)}>
            <MaterialCommunityIcons name="home-group" size={20} color="#fff" />
            <Text style={styles.optionText}>Manage Home Profile</Text>
          </TouchableOpacity>
          {showManageHomes && <ManageHomes />}
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="card" size={20} color="#fff" />
            <Text style={styles.optionText}>Manage Membership</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionButton: { flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#555" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  optionText: { color: "#fff", marginLeft: 10, fontSize: 16 },
  subSection: { paddingLeft: 10 },
});

export default SettingsSection;
