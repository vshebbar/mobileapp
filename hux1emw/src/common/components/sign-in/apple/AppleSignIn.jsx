import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { Button, View, Alert, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LOG } from "../../../utilities/logger";
import { GOOGLE_AUTH_ANDROID_CLIENT_ID, GOOGLE_AUTH_IOS_CLIENT_ID, GOOGLE_AUTH_WEB_CLIENT_ID, GOOGLE_IAM_URL } from "../../../utilities/urls";
import { AntDesign } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession(); // Required for web-based OAuth

const AppleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_AUTH_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
    expoClientId: GOOGLE_AUTH_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      LOG.info("Authentication object:", authentication);

      // Use the access token to fetch user info
      fetch(GOOGLE_IAM_URL, {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          LOG.info("User Info:", userInfo);
        })
        .catch((error) => {
          Alert.alert("Error fetching user info", error.message);
          LOG.error("Error fetching user info", error.message);
        });
    }
  }, [response]);

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <AntDesign name="apple1" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6B46C1",
    paddingVertical: 10,
    paddingRight: 30,
    borderRadius: 5,
    minWidth: 300,
    justifyContent: "center",
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppleSignIn;
