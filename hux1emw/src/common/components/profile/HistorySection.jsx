import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const HistorySection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.optionButton} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.sectionTitle}>History</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.subSection}>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="history" size={20} color="#fff" />
            <Text style={styles.optionText}>View Service History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome5 name="file-invoice" size={20} color="#fff" />
            <Text style={styles.optionText}>View Past Invoices</Text>
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

export default HistorySection;
