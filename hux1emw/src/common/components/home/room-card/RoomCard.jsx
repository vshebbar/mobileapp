import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RoomCard = ({ room, onRemove, onUpdate }) => {
  const [roomData, setRoomData] = useState(room);

  // 📌 Update room name
  const handleUpdateRoomName = (text) => {
    const updatedRoom = { ...roomData, room: text };
    setRoomData(updatedRoom);
    onUpdate(updatedRoom);
  };

  // 📌 Update appliance name
  const handleUpdateApplianceName = (index, text) => {
    const updatedAppliances = [...roomData.appliances];
    updatedAppliances[index].name = text;
    const updatedRoom = { ...roomData, appliances: updatedAppliances };
    setRoomData(updatedRoom);
    onUpdate(updatedRoom);
  };

  // 📌 Update appliance quantity
  const handleUpdateApplianceQuantity = (index, change) => {
    const updatedAppliances = [...roomData.appliances];
    if (change === -1 && updatedAppliances[index].quantity === 0) {
      return;
    }
    updatedAppliances[index].quantity += change;

    const updatedRoom = { ...roomData, appliances: updatedAppliances };
    setRoomData(updatedRoom);
    onUpdate(updatedRoom);
  };

  // 📌 Add a new appliance
  const handleAddAppliance = () => {
    const newAppliances = [...roomData.appliances, { name: "New Appliance", quantity: 1 }];
    const updatedRoom = { ...roomData, appliances: newAppliances };
    setRoomData(updatedRoom);
    onUpdate(updatedRoom);
  };

  return (
    <View style={styles.roomItem}>
      {/* Room Header */}
      <View style={styles.roomHeader}>
        <TextInput
          style={styles.roomTitle}
          value={roomData.room}
          onChangeText={handleUpdateRoomName}
          placeholder="Enter Room Name"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={22} color="#d13f4d" />
        </TouchableOpacity>
      </View>

      {/* List Appliances */}
      {roomData.appliances.map((appliance, index) => (
        <ApplianceCard
          key={index}
          appliance={appliance}
          onUpdateName={(text) => handleUpdateApplianceName(index, text)}
          onIncrease={() => handleUpdateApplianceQuantity(index, 1)}
          onDecrease={() => handleUpdateApplianceQuantity(index, -1)}
        />
      ))}

      {/* Add Appliance Button */}
      <TouchableOpacity onPress={handleAddAppliance} style={styles.addApplianceButton}>
        <Ionicons name="add-circle-outline" size={22} color="white" />
        <Text style={styles.addButton}> Add Appliance</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * 📌 ApplianceCard Subcomponent (Inside RoomCard)
 */
const ApplianceCard = ({ appliance, onUpdateName, onIncrease, onDecrease }) => (
  <View style={styles.applianceRow}>
    {/* Editable Appliance Name */}
    <TextInput style={styles.applianceInput} value={appliance.name} onChangeText={onUpdateName} placeholder="Appliance Name" placeholderTextColor="#aaa" />

    {/* Quantity Controls */}
    <View style={styles.quantityControls}>
      <TouchableOpacity onPress={onDecrease}>
        <Ionicons name="remove-circle-outline" size={22} color="white" />
      </TouchableOpacity>
      <Text style={styles.quantity}>{appliance.quantity}</Text>
      <TouchableOpacity onPress={onIncrease}>
        <Ionicons name="add-circle-outline" size={22} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

export default RoomCard;

/**
 * 📌 Styles
 */
const styles = StyleSheet.create({
  roomItem: { backgroundColor: "#2D2D2D", padding: 12, borderRadius: 8, marginBottom: 10 },
  roomHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  roomTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", flex: 1, marginRight: 10 },
  applianceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 6 },
  applianceInput: {
    backgroundColor: "#444",
    color: "#fff",
    fontSize: 14,
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  quantityControls: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  quantity: { color: "#fff", fontSize: 14, marginHorizontal: 8 },
  addApplianceButton: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  addButton: { color: "#fff", fontSize: 14, marginLeft: 6 },
});
