import React, { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import HuxHomeBackground from "../../../../assets/images/huxedo-home-background.png";
import { AppContext } from "../../context/context-provider/ContextProvider";
import { useTheme } from "../../context/theme-provider/ThemeProvider";
import AppleSignIn from "../sign-in/apple/AppleSignIn";
import GoogleSignIn from "../sign-in/google/GoogleSignIn";
import PhoneLogin from "../sign-in/phone/PhoneLogin"; // Phone login component

const Register = () => {
  const { appData, setAppdata } = useContext(AppContext);
  const { theme } = useTheme();

  const setSessionData = () => {
    if (!appData?.userInfo?.displayName) {
      const sessionData = {
        session: appData?.session,
        userInfo: { ...appData.userInfo, displayName: "Tanuj", email: "mock@email.com", phone: "+17853023776" },
      };
      setAppdata({ ...appData, ...sessionData });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.avoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Section */}
          <View style={styles.imageContainer}>
            <Image source={HuxHomeBackground} style={styles.image} />
            <Text style={[styles.text, styles.title, { color: theme.text }]}>Huxedo</Text>
          </View>

          {/* Sign-In Buttons */}
          <View style={styles.buttonWrapper}>
            <GoogleSignIn setSessionData={setSessionData} />
            <AppleSignIn />
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={[styles.orText, { color: theme.text }]}>OR</Text>
              <View style={styles.separatorLine} />
            </View>
            {/* New Login using phone button */}
            <PhoneLogin />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    width: "80%",
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#aaa",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Register;
