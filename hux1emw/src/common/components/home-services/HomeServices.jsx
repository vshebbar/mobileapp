import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconHouseShifting from "../../../../assets/ux-design/icons/IconHouseShifting.png";
import RepairIcon from "../../../../assets/ux-design/icons/IconRepair.png";
import IconVacuum from "../../../../assets/ux-design/icons/IconVacuum.png";
import { useTheme } from "../../context/theme-provider/ThemeProvider";
import ServiceIconComponent from "./service-icon/ServiceIconComponent";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeServices = ({ navigation, selectedDate }) => {
  const { theme } = useTheme();
  const [selectedServices, setSelectedServices] = useState([]); // Track multiple selections

  // ✅ Sample House Data (Replace with Context API when needed)
  const { selectedHouse } = {
    selectedHouse: {
      appliances: [
        {
          name: "Appliance Repairs",
          icon: RepairIcon,
          popular: true,
          category: "Handyman",
          price: 79,
          rating: 4.8,
          reviews: 1800,
          subServices: ["Regular Maintenance", "Emergency Repair", "Installation"],
        },
        {
          name: "House Shifting",
          icon: IconHouseShifting,
          popular: true,
          category: "Other",
          price: 95,
          rating: 4.6,
          reviews: 1200,
          subServices: ["Local Move", "Long Distance Move", "Packing Assistance"],
        },
        {
          name: "House Cleaning",
          icon: IconVacuum,
          popular: true,
          category: "Cleaning",
          price: 50,
          rating: 4.7,
          reviews: 1600,
          subServices: ["Deep Clean", "Move-In/Move-Out Cleaning", "Post-Event Clean", "Eco-Friendly Clean"],
        },
        {
          name: "House Painting",
          icon: RepairIcon,
          popular: true,
          category: "Painting",
          price: 85,
          rating: 4.9,
          reviews: 2100,
          subServices: ["Interior Painting", "Exterior Painting", "Touch-Ups"],
        },
        {
          name: "Television",
          icon: IconHouseShifting,
          popular: false,
          category: "Electrical",
          price: 60,
          rating: 4.5,
          reviews: 1100,
          subServices: ["Installation", "Smart TV Configuration", "Home Theater Setup", "Repair"],
        },
        {
          name: "Range",
          icon: IconVacuum,
          popular: false,
          category: "Other",
          price: 55,
          rating: 4.4,
          reviews: 800,
          subServices: ["Installation", "Burner Repair", "Gas Line Check"],
        },
        {
          name: "HVAC",
          icon: RepairIcon,
          popular: false,
          category: "HVAC",
          price: 100,
          rating: 4.9,
          reviews: 2500,
          subServices: ["AC Installation", "Duct Cleaning", "Thermostat Setup"],
        },
        {
          name: "Oven",
          icon: IconHouseShifting,
          popular: false,
          category: "Other",
          price: 45,
          rating: 4.3,
          reviews: 900,
          subServices: ["Installation", "Heating Element Repair", "Temperature Calibration"],
        },
        {
          name: "Coffee Maker",
          icon: IconVacuum,
          popular: false,
          category: "Other",
          price: 30,
          rating: 4.1,
          reviews: 700,
          subServices: ["Descaling", "Pump Repair", "Filter Replacement"],
        },
        {
          name: "Security Camera",
          icon: RepairIcon,
          popular: false,
          category: "Electrical",
          price: 75,
          rating: 4.8,
          reviews: 2000,
          subServices: ["Installation", "Remote Monitoring Setup", "Maintenance"],
        },
        {
          name: "Smoke Detector",
          icon: IconHouseShifting,
          popular: false,
          category: "Electrical",
          price: 40,
          rating: 4.2,
          reviews: 900,
          subServices: ["Installation", "Battery Replacement", "Carbon Monoxide Detection"],
        },
        {
          name: "Trash Compressor",
          icon: IconVacuum,
          popular: false,
          category: "Other",
          price: 65,
          rating: 4.5,
          reviews: 1400,
          subServices: ["Installation", "Motor Repair", "Odor Control"],
        },
        {
          name: "Refrigerator",
          icon: RepairIcon,
          popular: false,
          category: "Other",
          price: 90,
          rating: 4.7,
          reviews: 2200,
          subServices: ["Compressor Repair", "Gas Refill", "Cooling Efficiency Check"],
        },
      ],
    },
  };

  // ✅ Categorizing Appliances
  const popularServices = selectedHouse.appliances.filter((appliance) => appliance.popular);
  // const applianceServices = selectedHouse.appliances.filter((appliance) => !appliance.popular);
  const applianceServices = selectedHouse.appliances;

  const toggleSelection = (serviceName) => {
    setSelectedServices(
      (prevSelected) =>
        prevSelected.includes(serviceName)
          ? prevSelected.filter((name) => name !== serviceName) // Remove if already selected
          : [...prevSelected, serviceName] // Add if not selected
    );
  };
  const isProceedEnabled = selectedServices.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundLevel2 }]}>
      <ScrollView>
        {/* 🔥 Popular Services (1 Row, Horizontal Scroll) */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {popularServices.map((service, index) => (
            <ServiceIconComponent
              key={index}
              service={service}
              isSelected={selectedServices.includes(service.name)}
              onPress={() => toggleSelection(service.name)}
              customStyles={[styles.serviceItem]}
            />
          ))}
        </ScrollView>

        {/* 🔥 Appliance Services (2 Rows, Horizontal Scroll) */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 50 }]}>All Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.twoRowContainer}>
            {applianceServices.map((service, index) => (
              <ServiceIconComponent
                key={index}
                service={service}
                isSelected={selectedServices.includes(service.name)}
                onPress={() => toggleSelection(service.name)}
                customStyles={[styles.serviceItem]}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.proceedContainer}>
        <TouchableOpacity
          style={[styles.proceedButton, !isProceedEnabled && styles.disabledButton]} // Apply disabled style
          disabled={!isProceedEnabled} // Disable when needed
          // onPress={() => onProceed(selectedServices)} // Pass selected services
          onPress={() => navigation.navigate("Checkout", { selectedDate, selectedServices, applianceServices })} // Pass selected services
        >
          <LinearGradient
            colors={isProceedEnabled ? [theme.gradientPurple, theme.gradientBlack] : ["#888", "#444"]} // Grey out if disabled
            style={[styles.proceedGradient, !isProceedEnabled && styles.disabledGradient]}
          >
            <Text style={[styles.proceedText, { color: theme.text }, !isProceedEnabled && styles.disabledText]}>Proceed</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
  },
  subTitle: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  horizontalScroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceItem: {
    width: SCREEN_WIDTH / 4, // Ensures 4 items per row
    alignItems: "center",
  },
  selectedService: {
    borderColor: "#7B61FF",
    borderWidth: 2,
    backgroundColor: "rgba(123, 97, 255, 0.2)", // Light purple background
  },
  serviceText: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 80,
  },
  twoRowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: SCREEN_WIDTH * 1.5, // Ensures 2 rows fit in scroll view
  },
  proceedContainer: {
    alignItems: "center",
    bottom: 80,
  },
  proceedButton: {
    alignSelf: "center",
  },
  proceedGradient: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  proceedText: {
    fontSize: 16,
  },
  // ✅ Disabled Styles
  disabledButton: {
    opacity: 0.5, // Reduce opacity
  },
  disabledGradient: {
    backgroundColor: "#444", // Dark grey background
  },
  disabledText: {
    color: "#bbb", // Light grey text
  },
});
