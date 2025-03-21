import "dotenv/config";
import { version } from "./package.json";

export default {
  expo: {
    name: "hux1emw",
    slug: "hux1emw",
    scheme: "hux1emw",
    version,
    orientation: "portrait",
    icon: "./assets/ux-design/icons/favicon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/ux-design/icons/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#000",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.hux1emw",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/ux-design/icons/adaptive-icon.png",
        backgroundColor: "#000",
      },
      package: "com.hux1emw",
    },
    web: {
      favicon: "./assets/ux-design/icons/favicon.png",
    },
    extra: {
      eas: {
        projectId: "6e072bfc-199d-4a62-9686-258b33aa8da8",
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      googleSpeechToTextApiKey: process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY,
      googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL,
      sentryDsn: process.env.SENTRY_DSN,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      huxyServicesUrl: process.env.EXPO_PUBLIC_HUXYSERVICES_URL,
      openApiKey: process.env.OPEN_API_KEY,
      openApiAssistantId: process.env.OPEN_API_ASSISTANT_ID,
    },
    owner: "sdkdeepakcr",
    runtimeVersion: version,
    updates: {
      url: "https://u.expo.dev/6e072bfc-199d-4a62-9686-258b33aa8da8",
    },
    plugins: [
      [
        "@sentry/react-native/expo",
        {
          organization: "huxy",
          project: "hux1emw",
          // If you are using a self-hosted instance, update the value of the url property
          // to point towards your self-hosted instance. For example, https://self-hosted.example.com/.
          url: "https://sentry.io/",
        },
      ],
    ],
  },
};
