import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fetchHomeLayoutSuggestions } from "../../../services/ChatGptServices";
import Address from "../../address/Address";
import RoomCard from "../room-card/RoomCard";
import { v4 as uuidv4 } from "uuid";

const HomeForm = ({ home, onSave, onCancel }) => {
  const isNewHome = !home?.id; // ✅ Check if this is a new home
  const [address, setAddress] = useState(home.address);
  const [layoutData, setLayoutData] = useState(home.layout || { roomWiseLayout: [] });
  const [loading, setLoading] = useState(false);

  // Fetch AI-powered home layout suggestions
  const handleFetchSuggestion = async () => {
    if (!address?.dimensions) return;
    setLoading(true);
    try {
      const response = await fetchHomeLayoutSuggestions(address?.dimensions, address?.country, address?.zipcode);
      setLayoutData(response);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle save
  const handleSave = () => onSave?.({ ...home, address, layout: layoutData });

  // Add a new empty room
  const handleAddRoom = () => {
    setLayoutData((prev) => ({
      ...prev,
      roomWiseLayout: [...prev.roomWiseLayout, { id: uuidv4(), room: "New Room", description: "", appliances: [] }],
    }));
  };

  const handleRemoveRoom = (roomId) => {
    setLayoutData((prev) => ({
      ...prev,
      roomWiseLayout: prev.roomWiseLayout.filter((room) => room.id !== roomId), // ✅ Now filtering by unique ID
    }));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView>
        {/* Address Input */}
        <Address addressData={address} setAddressData={setAddress} />

        {/* Buttons: Save & Cancel */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.actionButtons} onPress={handleSave}>
            <Text style={{ color: "#fff" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={onCancel}>
            <Text style={{ color: "#fff" }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={onCancel}>
            <Text style={{ color: "#fff" }}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* Show "Get Suggestions" button only for new homes */}
        {isNewHome && (
          <TouchableOpacity
            style={[styles.suggestButton, { backgroundColor: address?.country && address?.zipcode ? "#FFA500" : "#f7ce81" }]}
            onPress={handleFetchSuggestion}
            disabled={!address?.country || !address?.zipcode || loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text>Get Suggestions</Text>}
          </TouchableOpacity>
        )}

        {/* Add New Room Button */}
        <TouchableOpacity style={styles.addRoomButton} onPress={handleAddRoom}>
          <Text style={styles.addRoomText}>+ Add New Room</Text>
        </TouchableOpacity>

        {/* Display Rooms */}
        {layoutData?.roomWiseLayout?.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onUpdate={(updatedRoom) => {
              setLayoutData((prev) => ({
                ...prev,
                roomWiseLayout: prev.roomWiseLayout.map((r) => (r.id === room.id ? updatedRoom : r)),
              }));
            }}
            onRemove={() => handleRemoveRoom(room.id)}
          />
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#1E1E1E", flex: 1 },
  suggestButton: { backgroundColor: "#FFA500", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  addRoomButton: { backgroundColor: "#6B46C1", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  addRoomText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  buttonsContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  actionButtons: {
    borderColor: "#fff",
    borderWidth: 1,
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 24,
    flex: 1,
    margin: 5,
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default HomeForm;
