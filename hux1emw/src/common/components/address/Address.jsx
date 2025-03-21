import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import COUNTRIES from "../../../resources/defaults/countries.json";
import { extractAddressFromGeocode } from "../../services/GoogleServices";
import { LOG } from "../../utilities/logger";

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === "US").name;

const Address = ({ addressData, setAddressData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const updateParentState = (key, value) => {
    setAddressData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!addressData?.country) {
      updateParentState("country", DEFAULT_COUNTRY);
    }
  }, []);

  const validateInputs = () => {
    if (!addressData?.country) {
      LOG.error("Validation Failed", "Country is required.");
      return false;
    }
    if (!addressData?.zipcode) {
      LOG.error("Validation Failed", "Zip Code is required.");
      return false;
    }
    if (!addressData?.dimensions) {
      LOG.error("Validation Failed", "Area is required.");
      return false;
    }
    return true;
  };

  const handleLocateMe = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        LOG.error("Permission Denied", "Location permission is required to fetch your address.");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      await reverseGeocode(latitude, longitude);
    } catch (error) {
      LOG.error("Error fetching location:", error);
      LOG.error("Error", "Could not fetch location.");
    }
    setLoading(false);
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const addressComponents = await extractAddressFromGeocode(latitude, longitude);
      if (addressComponents) {
        let street = "";
        let city = "";
        let state = "";
        let country = "";
        let zipcode = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("street_number")) {
            street = component.long_name + " ";
          }
          if (component.types.includes("route")) {
            street += component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("country")) {
            country = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            zipcode = component.long_name;
          }
        });

        updateParentState("street", street);
        updateParentState("city", city);
        updateParentState("state", state);
        updateParentState("country", country);
        updateParentState("zipcode", zipcode);
      } else {
        LOG.error("Failed to retrieve address");
      }
    } catch (error) {
      LOG.error(`Failed to fetch geocoding with error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Locate Me Button */}
      <TouchableOpacity style={styles.locateButton} onPress={handleLocateMe} disabled={loading}>
        <Text style={styles.locateButtonText}>{loading ? "Locating..." : "📍 Use my location"}</Text>
      </TouchableOpacity>

      {/* Street Address */}
      <TextInput
        style={[styles.input, styles.street]}
        placeholder="Street"
        placeholderTextColor="#aaa"
        value={addressData?.street || ""}
        onChangeText={(text) => updateParentState("street", text)}
      />

      {/* City & State */}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="City"
          placeholderTextColor="#aaa"
          value={addressData?.city || ""}
          onChangeText={(text) => updateParentState("city", text)}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="State"
          placeholderTextColor="#aaa"
          value={addressData?.state || ""}
          onChangeText={(text) => updateParentState("state", text)}
        />
      </View>

      {/* Country & Zip Code */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.countrySelector} onPress={() => setModalVisible(true)}>
          <Text style={styles.countryText}>{addressData?.country}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Zip Code *"
          placeholderTextColor="#ff4444"
          keyboardType="numeric"
          value={addressData?.zipcode || ""}
          onChangeText={(text) => updateParentState("zipcode", text)}
        />
      </View>

      <View style={styles.row}>
        {/* Dimensions Input */}
        <TextInput
          style={[styles.input, styles.dimensions]}
          placeholder="Area (Ex: 3500 sqft) *"
          placeholderTextColor="#ff4444"
          value={addressData?.dimensions || ""}
          onChangeText={(text) => updateParentState("dimensions", text)}
        />

        {/* Set as Default Checkbox */}
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsDefault(!isDefault)}>
          <View style={[styles.checkbox, isDefault && styles.checkboxChecked]}>
            {isDefault ? <Ionicons name="checkmark-sharp" size={14} color="#000" /> : null}
          </View>
          <Text style={styles.checkboxText}>Set as default</Text>
        </TouchableOpacity>
      </View>

      {/* Country Selection Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <ScrollView>
              <View style={styles.countryGrid}>
                {COUNTRIES.map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    style={styles.countryItem}
                    onPress={() => {
                      updateParentState("country", item.name);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.countryText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: { backgroundColor: "#1E1E1E", borderRadius: 10, minWidth: "100%" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  countrySelector: { flex: 1, backgroundColor: "#2D2D2D", borderRadius: 8, padding: 12, marginRight: 8 },
  countryText: { color: "#fff" },
  input: { flex: 1, backgroundColor: "#2D2D2D", color: "#fff", padding: 12, borderRadius: 8 },
  street: { marginBottom: 10, marginTop: 5 },
  dimensions: { marginRight: 10, flex: 0.85 },
  locateButton: { borderColor: "#fff", borderWidth: 1, backgroundColor: "#1E1E1E", padding: 12, borderRadius: 24, alignItems: "center", marginBottom: 10 },
  locateButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 15, // ✅ Increased size for better visibility
    height: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  checkboxChecked: {
    backgroundColor: "#e0e0e0", // ✅ Changes background when checked
    borderColor: "#e0e0e0",
  },
  checkboxText: {
    color: "#e0e0e0",
    fontSize: 14,
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { backgroundColor: "#333", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 18, color: "#fff", fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  countryGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  countryItem: { width: "48%", padding: 12, backgroundColor: "#444", marginBottom: 8, borderRadius: 8, alignItems: "center" },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: "#ff4444", borderRadius: 8, alignItems: "center" },
  closeButtonText: { color: "#fff", fontSize: 16 },
});
