import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/theme-provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ServiceCard from "./service-card/ServiceCard";
const CheckoutComponent = ({ navigation, route }) => {
  const { theme } = useTheme();
  const selectedServices = route.params?.selectedServices || [];
  const applianceServices = route.params?.applianceServices || [];

  // Extract full objects of selected services
  const selectedServiceObjects = applianceServices.filter((service) => selectedServices.includes(service.name));

  // State for accordion and selected sub-services
  const [expandedServices, setExpandedServices] = useState({});
  const [selectedSubServices, setSelectedSubServices] = useState({});
  const [otherInputs, setOtherInputs] = useState({});

  // Toggle function for accordion
  const toggleAccordion = (serviceName) => {
    setExpandedServices((prevState) => ({
      ...prevState,
      [serviceName]: !prevState[serviceName], // Toggle state
    }));
  };

  // Toggle sub-service selection
  const toggleSubService = (serviceName, subService) => {
    setSelectedSubServices((prevState) => {
      const currentSelections = prevState[serviceName] || [];
      const isSelected = currentSelections.includes(subService);

      return {
        ...prevState,
        [serviceName]: isSelected
          ? currentSelections.filter((s) => s !== subService) // Remove
          : [...currentSelections, subService], // Add
      };
    });
  };

  // Calculate total amount
  const totalAmount = selectedServiceObjects.reduce((total, service) => total + service.price, 0);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
      </TouchableOpacity>

      {/* 🔥 Service Cards for Selected Services */}
      <View style={styles.accordionContainer}>
        {selectedServiceObjects.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            theme={theme}
            toggleAccordion={toggleAccordion}
            expandedServices={expandedServices}
            toggleSubService={toggleSubService}
            selectedSubServices={selectedSubServices}
            setOtherInputs={setOtherInputs}
            otherInputs={otherInputs}
          />
        ))}
      </View>

      {/* Total & Checkout All */}
      <Text style={[styles.totalText, { color: theme.text }]}>
        Estimated Total Amount: <Text style={styles.totalPrice}>${totalAmount}</Text>
      </Text>
      <TouchableOpacity style={styles.checkoutButton}>
        <LinearGradient colors={[theme.gradientPurple, theme.gradientBlack]} style={styles.gradient}>
          <Text style={styles.checkoutText}>Checkout All</Text>
        </LinearGradient>
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
  accordionContainer: {
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  checkoutButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default CheckoutComponent;
