import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import CheckoutComponent from "../common/components/checkout/CheckoutComponent";
import HomeServices from "../common/components/home-services/HomeServices";

const Stack = createStackNavigator();

const FindAPro = () => {
  const route = useRoute();
  const selectedDate = route.params?.selectedDate || new Date().toISOString().split("T")[0];

  useEffect(() => {
    console.log("Selected Date for Find a Pro:", selectedDate);
  }, [selectedDate]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* HomeServices Screen */}
      <Stack.Screen name="HomeServices">{(props) => <HomeServices {...props} selectedDate={selectedDate} />}</Stack.Screen>

      {/* CheckoutComponent Screen */}
      <Stack.Screen name="Checkout">{(props) => <CheckoutComponent {...props} selectedDate={selectedDate} />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default FindAPro;
