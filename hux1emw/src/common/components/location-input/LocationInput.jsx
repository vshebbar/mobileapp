import "react-native-get-random-values";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppContext } from "../../context/context-provider/ContextProvider";
import { setAddressDataInStorage } from "../../utilities/storageUtility";
import { LOG } from "../../utilities/logger";
import { GOOGLE_MAPS_API_KEY } from "../../utilities/urls";
import { useTheme } from "../../context/theme-provider/ThemeProvider";

const LocationInput = ({ setAddress, currentAddress }) => {
  const { appData, setAppdata } = useContext(AppContext);
  const { theme } = useTheme();

  return (
    <View style={styles.innerContainer}>
      <GooglePlacesAutocomplete
        placeholder={currentAddress ?? appData?.address?.text ?? "Enter your home address"}
        fetchDetails={true}
        onPress={async (data, details = null) => {
          console.log("Inside");
          LOG.info("Selected Address:", data);
          let location = { lat: "", lng: "" };
          if (details) {
            location = details.geometry.location; // Extract lat/lng
            LOG.info("Coordinates:", location);
          }
          const address = { text: data.description, location };
          if (setAddress) {
            setAddress(address);
          } else {
            setAppdata({ ...appData, address });
            await setAddressDataInStorage(address);
          }
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        styles={{
          container: { flex: 1, zIndex: 10 },
          textInput: [styles.textInput, { color: theme.background, backgroundColor: theme.inputBackground }],
          listView: { backgroundColor: "#fff", zIndex: 100, elevation: 5 },
        }}
        renderLeftButton={() => <Icon name="location-pin" size={24} color={theme.rejected} style={styles.icon} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 40,
    paddingRight: 10,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    position: "absolute",
    zIndex: 10,
    left: 10,
    top: 13,
  },
  suggestionsList: {
    backgroundColor: "#fff",
    zIndex: 100,
    elevation: 5,
  },
});

export default LocationInput;
