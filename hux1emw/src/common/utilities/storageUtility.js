import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_ADDRESS_KEY, STORAGE_USER_KEY } from "./constants";
import { LOG } from "./logger";

export const loadDataFromStorage = async (appData, setAppdata) => {
  LOG.info("Checking session data from storage");
  try {
    const [sessionJSON, addressJSON] = await Promise.all([AsyncStorage.getItem(STORAGE_USER_KEY), AsyncStorage.getItem(STORAGE_ADDRESS_KEY)]);

    const sessionData = sessionJSON ? JSON.parse(sessionJSON) : null;
    const addressData = addressJSON ? JSON.parse(addressJSON) : null;
    const updatedData = { ...appData };

    if (sessionData) {
      updatedData.userInfo = sessionData.userInfo;
      updatedData.session = sessionData.session;
      LOG.info("Extracted user & session data from storage");
    }

    if (addressData) {
      updatedData.address = addressData;
      LOG.info("Extracted address data from storage");
    }

    if (sessionData || addressData) {
      setAppdata(updatedData);
    }
  } catch (error) {
    LOG.error("Failed to load data from storage:", error);
  }
};

export const clearStorage = () => {
  LOG.info("Clearing storage");
  AsyncStorage.clear();
};

export const setSessionDataInStorage = async (user) => {
  LOG.info("Setting session data in storage");
  await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
};

export const setAddressDataInStorage = async (address) => {
  LOG.info("Setting address data in storage");
  await AsyncStorage.setItem(STORAGE_ADDRESS_KEY, JSON.stringify(address));
};
