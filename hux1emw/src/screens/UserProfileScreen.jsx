import React, { useContext, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileImage from "../../assets/images/defaultProfilePic.png";
import { AppContext } from "../common/context/context-provider/ContextProvider";
import COUNTRIES from "../resources/defaults/countries.json";

const UserProfileScreen = () => {
  const { appData, setAppdata } = useContext(AppContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [countryCode, setCountryCode] = useState(
    appData?.userInfo?.phone ? "" : "+1" // ✅ Only set country code for new numbers
  );
  const [phoneNumber, setPhoneNumber] = useState(appData?.userInfo?.phone ?? "");

  const handleSave = () => {
    setAppdata({ ...appData, userInfo: { ...appData.userInfo, phone: `${countryCode} ${phoneNumber}` } });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAppdata({ ...appData, userInfo: { ...appData.userInfo, photoURL: result.assets[0].uri } });
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.optionButton} onPress={() => setShowDetails(!showDetails)}>
        <Ionicons name="person" size={20} color="#fff" />
        <Text style={styles.optionText}>User Profile</Text>
      </TouchableOpacity>
      {showDetails && (
        <View style={styles.container}>
          <Text style={styles.title}>Edit User Profile</Text>
          <TouchableOpacity onPress={pickImage}>
            {/* <Image source={{ uri: profileData.image }} style={styles.profileImage} /> */}
            <Image source={ProfileImage} style={styles.profileImage} />
          </TouchableOpacity>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={appData?.userInfo?.displayName}
            onChangeText={(text) => setAppdata({ ...appData, userInfo: { ...appData.userInfo, displayName: text } })}
          />

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            {countryCode && (
              <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.countryCodeButton}>
                <Text style={styles.callingCode}>{countryCode}</Text>
              </TouchableOpacity>
            )}
            <TextInput style={styles.phoneInput} keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
          </View>
          {/* <CountryPicker
            show={showPicker}
            countryCodes={COUNTRIES.map((country) => country.code)}
            pickerButtonOnPress={(item) => {
              setCountryCode(`${item.dial_code}`);
              setShowPicker(false);
            }}
          /> */}

          <Text style={styles.label}>Email ID</Text>
          <TextInput
            style={styles.input}
            value={appData?.userInfo?.email}
            onChangeText={(text) => setAppdata({ ...appData, userInfo: { ...appData.userInfo, email: text } })}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  optionText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20, paddingTop: 35 },
  backText: { color: "grey", fontSize: 16, marginBottom: 10 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 },
  profileImage: { width: 100, height: 100, borderRadius: 80, alignSelf: "center", marginBottom: 20 },
  label: { color: "#aaa", fontSize: 14, marginTop: 10 },
  input: { backgroundColor: "#222", color: "#fff", padding: 10, borderRadius: 5, marginTop: 5 },
  phoneContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#222", borderRadius: 5, paddingHorizontal: 10, marginTop: 5 },
  countryCodeButton: { padding: 10, marginRight: 10 },
  callingCode: { color: "#fff", fontSize: 16 },
  phoneInput: { flex: 1, color: "#fff", padding: 10 },
  saveButton: { backgroundColor: "#6a5acd", padding: 15, borderRadius: 5, marginTop: 20, alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default UserProfileScreen;
