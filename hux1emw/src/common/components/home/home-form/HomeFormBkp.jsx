import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { fetchHomeLayoutSuggestions, fetchLayoutSuggestion, fetchLayoutSuggestionUsingAssistant } from "../../../services/ChatGptServices";
import { AppContext } from "../../../context/context-provider/ContextProvider";
import { Ionicons } from "@expo/vector-icons";
import LocationInput from "../../location-input/LocationInput";

const HomeForm = ({ home, onSave, onCancel }) => {
  const [address, setAddress] = useState(home.address);
  const [dimensions, setDimensions] = useState(home.dimensions);
  const [layoutData, setLayoutData] = useState(home.layout);
  const [loading, setLoading] = useState(false);
  const { appData } = useContext(AppContext);

  const handleFetchSuggestion = async () => {
    if (!dimensions) return;
    setLoading(true);
    try {
      const latitude = address?.location?.lat ?? appData?.address?.location?.lat;
      const longitude = address?.location?.lng ?? appData?.address?.location?.lng;
      const response = await fetchHomeLayoutSuggestions(dimensions, latitude, longitude);
      setLayoutData(response);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateApplianceQuantity = (roomIndex, applianceIndex, change) => {
    setLayoutData((prev) => {
      const newRooms = [...prev.roomWiseLayout];
      const updatedAppliance = { ...newRooms[roomIndex].appliances[applianceIndex] };
      updatedAppliance.quantity += change;

      if (updatedAppliance.quantity <= 0) {
        newRooms[roomIndex].appliances.splice(applianceIndex, 1);
      } else {
        newRooms[roomIndex].appliances[applianceIndex] = updatedAppliance;
      }
      return { ...prev, roomWiseLayout: [...newRooms] };
    });
  };

  const handleAddRoom = () => {
    setLayoutData((prev) => ({
      ...prev,
      roomWiseLayout: [...prev.roomWiseLayout, { room: "New Room", description: "", appliances: [] }],
    }));
  };

  const handleRemoveRoom = (index) => {
    setLayoutData((prev) => ({
      ...prev,
      roomWiseLayout: prev.roomWiseLayout.filter((_, i) => i !== index),
    }));
  };

  const handleAddAppliance = (roomIndex) => {
    setLayoutData((prev) => {
      const newRooms = [...prev.roomWiseLayout];
      newRooms[roomIndex].appliances.push({ name: "New Appliance", quantity: 1 });
      return { ...prev, roomWiseLayout: newRooms };
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ address, dimensions, layout: layoutData });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView>
        <LocationInput setAddress={setAddress} currentAddress={home?.address?.text} />
        <TextInput style={styles.input} placeholder="Enter property dimensions (e.g., 3500 sqft)" placeholderTextColor="#aaa" value={dimensions} onChangeText={setDimensions} />
        <TouchableOpacity style={styles.suggestButton} onPress={handleFetchSuggestion} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.suggestButtonText}>Get Suggestions</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.addRoomButton} onPress={handleAddRoom}>
          <Ionicons name="add-circle-outline" size={22} color="green" />
          <Text style={styles.addButton}> Add Room</Text>
        </TouchableOpacity>

        {layoutData && (
          <View>
            <FlatList
              data={layoutData.roomWiseLayout}
              keyExtractor={(_item, index) => index.toString()}
              nestedScrollEnabled={true}
              renderItem={({ item: roomItem, index: roomIndex }) => (
                <View style={styles.roomItem}>
                  <View style={styles.roomHeader}>
                    <TextInput
                      style={styles.roomTitle}
                      value={roomItem.room}
                      onChangeText={(text) => {
                        const updatedRooms = [...layoutData.roomWiseLayout];
                        updatedRooms[roomIndex].room = text;
                        setLayoutData({ ...layoutData, roomWiseLayout: updatedRooms });
                      }}
                    />
                    <TouchableOpacity onPress={() => handleRemoveRoom(roomIndex)}>
                      <Ionicons name="trash-outline" size={22} color="red" />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={roomItem.appliances}
                    keyExtractor={(_appliance, applianceIndex) => applianceIndex.toString()}
                    nestedScrollEnabled={true}
                    renderItem={({ item: applianceItem, index: applianceIndex }) => (
                      <View style={styles.applianceRow}>
                        <TextInput
                          style={styles.applianceItem}
                          value={applianceItem?.name}
                          onChangeText={(text) => {
                            const updatedLayout = { ...layoutData };
                            updatedLayout.roomWiseLayout[roomIndex].appliances[applianceIndex].name = text;
                            setLayoutData(updatedLayout);
                          }}
                        />

                        <View style={styles.quantityControls}>
                          <TouchableOpacity onPress={() => handleUpdateApplianceQuantity(roomIndex, applianceIndex, -1)}>
                            <Ionicons name="remove-circle-outline" size={22} color="red" />
                          </TouchableOpacity>
                          <Text style={styles.quantity}>{applianceItem?.quantity}</Text>
                          <TouchableOpacity onPress={() => handleUpdateApplianceQuantity(roomIndex, applianceIndex, 1)}>
                            <Ionicons name="add-circle-outline" size={22} color="green" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                  <TouchableOpacity onPress={() => handleAddAppliance(roomIndex)} style={styles.addApplianceButton}>
                    <Ionicons name="add-circle-outline" size={22} color="green" />
                    <Text style={styles.addButton}> Add Appliance</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#1E1E1E", flex: 1 },
  input: { backgroundColor: "#2D2D2D", color: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 },
  suggestButton: { backgroundColor: "#FFA500", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  suggestButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  addRoomButton: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  roomItem: { backgroundColor: "#2D2D2D", padding: 12, borderRadius: 8, marginBottom: 10 },
  roomHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  roomTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  applianceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 4 },
  applianceItem: { color: "#fff", fontSize: 14, flex: 1 },
  quantityControls: { flexDirection: "row", alignItems: "center" },
  quantity: { color: "#fff", fontSize: 14, marginHorizontal: 8 },
  addApplianceButton: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  addButton: { color: "#fff", fontSize: 14, marginLeft: 6 },
  saveButton: { backgroundColor: "#28a745", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 12 },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  cancelButton: { backgroundColor: "#dc3545", padding: 12, borderRadius: 8, alignItems: "center", flex: 1, marginLeft: 5 },
  cancelButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default HomeForm;
