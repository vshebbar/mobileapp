import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../../context/theme-provider/ThemeProvider";
// import { useTheme } from "../../context/theme-provider/ThemeProvider";

// Dummy time slots
const timeSlots = ["10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00", "19:30", "21:00"];

// Card Component for Services
const ServiceSlotCard = ({ service, selectedSlots, setSelectedSlots }) => {
  const { theme } = useTheme();

  const toggleSlot = (time) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [service.name]: prev[service.name] === time ? null : time,
    }));
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.backgroundLevel2 }]}>
      {/* 🔹 Row 1: Header (Title, Price, Rating, Show Pro) */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={[styles.serviceTitle, { color: theme.text }]}>{service.name}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={[styles.price, { color: theme.text }]}>
              <Ionicons name="cash-outline" size={14} color={theme.text} /> ${service.price}
            </Text>
            <Text style={[styles.rating, { color: theme.text }]}>
              <Ionicons name="star" size={14} color="gold" /> {service.rating} ({service.reviews})
            </Text>
          </View>
        </View>
        {/* Show Pro Button */}
        <TouchableOpacity style={styles.showProButton}>
          <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={styles.gradient}>
            <Text style={styles.checkoutText}>Show Pro</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 🔹 Row 2: Time Slots */}
      <View style={styles.timeSlotContainer}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.timeSlotPill, selectedSlots[service.name] === time && styles.selectedSlot]}
            onPress={() => toggleSlot(time)}
          >
            <Text style={[styles.timeSlotText, selectedSlots[service.name] === time && { color: "#fff" }]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Main Component
const BookSlot = ({ navigation, route }) => {
  const { theme } = useTheme();
  const selectedServices = route.params?.selectedServices || [];
  const applianceServices = route.params?.applianceServices || [];

  const selectedServiceObjects = applianceServices.filter((service) => selectedServices.includes(service.name));

  const [selectedSlots, setSelectedSlots] = useState({});

  // Check if at least one slot is selected
  const isProceedEnabled = Object.values(selectedSlots).some((slot) => slot !== null);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>Book Slot</Text>

      {/* Selected Services Cards */}
      <View style={styles.serviceList}>
        {selectedServiceObjects.map((service, index) => (
          <ServiceSlotCard key={index} service={service} selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots} />
        ))}
      </View>

      {/* Proceed to Payment */}
      <TouchableOpacity
        style={[styles.proceedButton, !isProceedEnabled && styles.disabledButton]}
        disabled={!isProceedEnabled}
        onPress={() => navigation.navigate("PaymentScreen", { selectedSlots })}
      >
        <Text style={[styles.proceedText, !isProceedEnabled && { color: theme.secondaryText }]}>Proceed To Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  serviceList: {
    marginBottom: 20,
  },
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
  showProButton: {
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
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeSlotPill: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#444",
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSlot: {
    backgroundColor: "#7B61FF",
  },
  timeSlotText: {
    fontSize: 14,
  },
  proceedButton: {
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: "#7B61FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#555",
  },
  proceedText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default BookSlot;
