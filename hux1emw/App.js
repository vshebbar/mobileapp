import * as Sentry from "@sentry/react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, View } from "react-native";
import Navigation from "./src/common/components/navigation/Navigation";
import Register from "./src/common/components/register/Register";
import { AppContext, AppProvider } from "./src/common/context/context-provider/ContextProvider";
import { ThemeProvider } from "./src/common/context/theme-provider/ThemeProvider";
import { DARK_THEME } from "./src/common/utilities/colors";
import { LOG } from "./src/common/utilities/logger";
import { loadDataFromStorage } from "./src/common/utilities/storageUtility";

const CheckIfAuthorized = () => {
  const { appData, setAppdata } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [_, setSkipSignIn] = useState(true);

  const checkAndLoadDataFromStorage = useCallback(async () => {
    try {
      await loadDataFromStorage(appData, setAppdata);
    } catch (error) {
      LOG.error("Failed to load data from storage:", error);
    } finally {
      setLoading(false);
    }
  }, [appData, setAppdata]);

  useEffect(() => {
    checkAndLoadDataFromStorage();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return appData?.userInfo?.displayName ? <Navigation /> : <Register />;
};

const App = () => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      LOG.info("Deep link received:", event.url);
    };
    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppProvider>
      <ThemeProvider>
        <View style={styles.container}>
          <CheckIfAuthorized />
        </View>
      </ThemeProvider>
    </AppProvider>
  );
};
export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.background,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
