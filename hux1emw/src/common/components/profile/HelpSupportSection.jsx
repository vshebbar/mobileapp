import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const HelpSupportSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.optionButton} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.subSection}>
          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome name="question-circle" size={20} color="#fff" />
            <Text style={styles.optionText}>FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Entypo name="chat" size={20} color="#fff" />
            <Text style={styles.optionText}>Chat with Support</Text>
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

export default HelpSupportSection;
