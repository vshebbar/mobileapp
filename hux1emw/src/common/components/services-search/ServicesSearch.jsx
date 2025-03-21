import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../context/context-provider/ContextProvider";
import { searchInGooglePlaces } from "../../services/GoogleServices";

const ServicesSearch = ({ searchQuery, results, setResults }) => {
  const { appData } = useContext(AppContext);
  const searchShops = async (appliance) => {
    if (!appliance) return;

    const query = encodeURIComponent(`${appliance} service center`);
    const latitude = appData?.address?.location?.lat;
    const longitude = appData?.address?.location?.lng;
    const results = await searchInGooglePlaces(query, latitude, longitude, 5000);

    setResults(results); // Update results state
  };

  useEffect(() => {
    searchQuery === "" ? setResults([]) : searchShops(searchQuery);
  }, [searchQuery]);
  return (
    <View>
      {/* Results Display */}
      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultLocation}>{item.location}</Text>
                <Text style={styles.resultRating}>Rating: {item.rating}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ServicesSearch;

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultLocation: {
    fontSize: 14,
    color: "#666",
  },
  resultRating: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 4,
  },
});
