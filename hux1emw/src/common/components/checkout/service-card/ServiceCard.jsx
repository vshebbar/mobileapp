import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ServiceCard = ({ service, theme, toggleSubService, selectedSubServices, setOtherInputs, otherInputs }) => {
  const isOtherSelected = selectedSubServices[service.name]?.includes("Other");

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.backgroundLevel2 }]}>
      {/* 🔹 Row 1: Header (Title, Price/Rating, Checkout) */}
      <View style={styles.headerContainer}>
        {/* Column 1 (Title & Price/Rating) */}
        <View style={styles.headerLeft}>
          {/* R1C1R1 - Title */}
          <Text style={[styles.serviceTitle, { color: theme.text }]}>{service.name}</Text>

          {/* R1C1R2 - Cash & Stars Inline */}
          <View style={styles.priceRatingContainer}>
            <Text style={[styles.price, { color: theme.text }]}>
              <Ionicons name="cash-outline" size={14} color={theme.text} /> ${service.price}
            </Text>
            <Text style={[styles.rating, { color: theme.text }]}>
              <Ionicons name="star" size={14} color="gold" /> {service.rating} ({service.reviews})
            </Text>
          </View>
        </View>

        {/* Column 2 - Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton}>
          <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={styles.gradient}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 🔹 Row 2: Sub-services Pills */}
      <View style={styles.subServiceContainer}>
        {service.subServices.map((subService, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.subServicePill, selectedSubServices[service.name]?.includes(subService) && styles.selectedPill]}
            onPress={() => toggleSubService(service.name, subService)}
          >
            <Text style={[styles.subServiceText, selectedSubServices[service.name]?.includes(subService) && { color: "#fff" }]}>{subService}</Text>
          </TouchableOpacity>
        ))}

        {/* 🔹 Other Option */}
        <TouchableOpacity
          style={[styles.subServicePill, isOtherSelected && styles.selectedOtherButton]}
          onPress={() => toggleSubService(service.name, "Other")}
        >
          <Text style={[styles.otherText, isOtherSelected && { color: "#fff" }]}>Other</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Other Input Field (Only if 'Other' is selected) */}
      {isOtherSelected && (
        <TextInput
          style={styles.otherInput}
          placeholder="Describe your request..."
          placeholderTextColor={theme.softText}
          value={otherInputs[service.name] || ""}
          onChangeText={(text) => setOtherInputs((prev) => ({ ...prev, [service.name]: text }))}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    marginRight: 15,
  },
  rating: {
    fontSize: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  checkoutButton: {
    alignSelf: "center",
  },
  gradient: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 14,
    color: "#fff",
  },
  subServiceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subServicePill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderColor: "#444",
    borderWidth: 2,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedPill: {
    backgroundColor: "#7B61FF",
  },
  subServiceText: {
    fontSize: 14,
    color: "#444",
  },
  otherButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderColor: "#444",
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOtherButton: {
    backgroundColor: "#7B61FF",
  },
  otherText: {
    fontSize: 14,
    color: "#444",
  },
  otherInput: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#333",
    marginVertical: 10,
    color: "#fff",
  },
});

export default ServiceCard;
