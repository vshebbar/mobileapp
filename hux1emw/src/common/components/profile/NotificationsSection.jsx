import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationsSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.optionButton} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.sectionTitle}>Notifications</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.subSection}>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="notifications" size={20} color="#fff" />
            <Text style={styles.optionText}>Manage Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialCommunityIcons name="email" size={20} color="#fff" />
            <Text style={styles.optionText}>Email Preferences</Text>
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

export default NotificationsSection;
