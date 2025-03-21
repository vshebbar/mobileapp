import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeForm from "../home-form/HomeForm";
import { AppContext } from "../../../context/context-provider/ContextProvider";
import { generateMockHomes } from "../../../../resources/mocks/home/mockHome";

const ManageHomes = () => {
  const { appData } = useContext(AppContext);
  // const [homes, setHomes] = useState(generateMockHomes());
  const [homes, setHomes] = useState([]);
  const [addingNew, setAddingNew] = useState(false);

  // ✅ Expand only one home at a time
  const toggleExpand = (index) => {
    setHomes((prevHomes) =>
      prevHomes.map((home, i) => ({
        ...home,
        expanded: i === index ? !home.expanded : false,
      }))
    );
  };

  // ✅ Update home name inline
  const setHomeName = (name, id) => {
    setHomes((prevHomes) => prevHomes.map((home) => (home.id === id ? { ...home, name } : home)));
  };

  // ✅ Add a new home
  const handleAddHome = () => {
    setAddingNew(true);
  };

  // ✅ Save home details
  const handleSave = (updatedHome) => {
    if (updatedHome.id) {
      // Update existing home
      setHomes((prevHomes) => prevHomes.map((home) => (home.id === updatedHome.id ? { ...updatedHome, expanded: false } : { ...home, expanded: false })));
    } else {
      // Add new home with unique ID
      setHomes((prevHomes) => [...prevHomes, { ...updatedHome, id: Date.now(), expanded: false }]);
    }
    setAddingNew(false);
  };

  // ✅ Collapse all on cancel
  const handleCancelAll = () => {
    setHomes((prevHomes) => prevHomes.map((home) => ({ ...home, expanded: false })));
    setAddingNew(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manage Houses</Text>
      {homes.map((home, index) => (
        <View key={home.id} style={styles.homeContainer}>
          <TouchableOpacity style={styles.header} onPress={() => toggleExpand(index)}>
            <TextInput style={styles.headerText} value={home.name} onChangeText={(text) => setHomeName(text, home.id)} />
            <Ionicons name={home.expanded ? "chevron-up" : "chevron-down"} size={20} color="#fff" />
          </TouchableOpacity>
          {home.expanded && <HomeForm home={home} onSave={handleSave} onCancel={handleCancelAll} />}
        </View>
      ))}
      {addingNew ? (
        <HomeForm home={{ id: null, address: appData?.address, layout: null }} onSave={handleSave} onCancel={handleCancelAll} />
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddHome}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Home</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#1c1c1e", borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  homeContainer: { marginBottom: 15, backgroundColor: "#2c2c2e", borderRadius: 5 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#444", borderRadius: 5 },
  headerText: { color: "#fff", fontSize: 16, flex: 1 },
  addButton: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  addButtonText: { color: "#fff", marginLeft: 10, fontSize: 16 },
});

export default ManageHomes;
