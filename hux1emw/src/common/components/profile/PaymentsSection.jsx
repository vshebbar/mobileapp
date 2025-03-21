import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Octicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const PaymentsSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.optionButton} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.sectionTitle}>Payments</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.subSection}>
          <TouchableOpacity style={styles.optionButton}>
            <Octicons name="credit-card" size={20} color="#fff" />
            <Text style={styles.optionText}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome name="cc-paypal" size={20} color="#fff" />
            <Text style={styles.optionText}>PayPal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome5 name="apple-pay" size={20} color="#fff" />
            <Text style={styles.optionText}>Apple Pay</Text>
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

export default PaymentsSection;
