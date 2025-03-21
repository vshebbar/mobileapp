import { Alert } from "react-native";
import { LOG } from "./logger";

export const handleComingSoon = (functionality) => {
  LOG.info(`Functionality: ${functionality} is triggered`);
  Alert.alert(`Functionality: '${functionality}' is coming soon!`);
};
