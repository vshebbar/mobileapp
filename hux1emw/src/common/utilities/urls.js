import Constants from "expo-constants";

/* KEYS section */
export const GOOGLE_MAPS_API_KEY = Constants.expoConfig.extra.googleMapsApiKey;
export const GOOGLE_SPEECH_TEXT_API_KEY = Constants.expoConfig.extra.googleSpeechToTextApiKey;
export const GOOGLE_AUTH_ANDROID_CLIENT_ID = Constants.expoConfig.extra.googleAndroidClientId;
export const GOOGLE_AUTH_IOS_CLIENT_ID = Constants.expoConfig.extra.googleIosClientId;
export const GOOGLE_AUTH_WEB_CLIENT_ID = Constants.expoConfig.extra.googleWebClientId;
export const SENTRY_DSN = Constants.expoConfig.extra.sentryDsn;
export const LOG_LEVEL = Constants.expoConfig.extra.logLevel ?? 1;
export const OPENAI_API_KEY = Constants.expoConfig.extra.openApiKey;
export const OPENAI_ASSISTANT_ID = Constants.expoConfig.extra.openApiAssistantId;

/* URLs */
export const HUXY_SERVICES_URL = Constants.expoConfig.extra.huxyServicesUrl;
export const HUXY_EP = "/huxy/Task";
export const HOME_LAYOUT_SUGGESTION_EP = "/api/Gpt/home-layout-suggestion";
export const GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
export const GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode";
export const GOOGLE_SPEECH_URL = "https://speech.googleapis.com/v1/speech";
export const GOOGLE_IAM_URL = "https://www.googleapis.com/userinfo/v2/me";
export const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
export const OPENAI_THREAD_URL = "https://api.openai.com/v1/threads";

export const API_CONSTANTS = {
  Authorization: "Authorization",
  ApiVersion: "api-version",
  ContentType: "Content-Type",
  ApplicationJSON: "application/json",
  v100: "1.0.0",
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
};

export const PresetAppliances = [
  "Television",
  "Air Conditioner",
  "Ceiling Fan",
  "Refrigerator",
  "Microwave/Oven",
  "Dishwasher",
  "Water Heater",
  "Washing Machine/Dryer",
  "Vacuum Cleaner",
  "Smoke Detector",
  "Security Camera",
  "Smart Thermostat",
];

export const PredefinedStructure = {
  roomWiseLayout: [{ room: "", description: "", appliances: [{ name: "", quantity: 0 }] }],
  applianceWiseTotalQuantity: [{ appliance: "", quantity: 0 }],
};
