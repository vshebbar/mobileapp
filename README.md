# huxedo-apps

`npx expo init hux1emw` OR `npx create-expo-app`

- Reference ICONS: `https://icons.expo.fyi/Index`
- Reference libraries: https://reactnative.directory/
- Sandbox link: https://snack.expo.dev/?platform=ios

`npx expo install firebase expo-auth-session expo-crypto expo-web-browser expo-application expo-dev-client @react-native-async-storage/async-storage`

`npx expo customize metro.config.js`
Update the contents like below:

```
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
```

`npx expo install expo-linear-gradient @expo/vector-icons react-native-logs expo-av expo-device react-native-calendars react-native-google-places-autocomplete @react-native-async-storage/async-storage react-native-get-random-values`

For expo Managed flow:

`eas init`
`eas update --branch development`

For expo Bare flow:

`eas build:configure`
`npx expo prebuild` [npx expo prebuild --clean]
Generate SHA1: `eas credentials -p android`

`npx pod-install`

Publish to eas:
`eas build` [eas build --profile development]
`eas update --branch development`

`eas build --profile development --platform ios`
`eas submit --platform ios`

## Adding/Updating env

### plaintext

eas env:create --name EXPO_PUBLIC_LOG_LEVEL --value error --visibility plaintext
eas env:create --name EXPO_PUBLIC_APP_VERSION --value 0.0.1 --visibility plaintext
eas env:create --name EXPO_PUBLIC_HUXYSERVICES_URL --value <value> --visibility plaintext

### sensitive

eas env:create --name SENTRY_DSN --value <value> --visibility sensitive
eas env:create --name OPEN_API_ASSISTANT_ID --value <value> --visibility sensitive

### secret

eas env:create --name SENTRY_AUTH_TOKEN --value <value> --visibility secret
eas env:create --name GOOGLE_MAPS_API_KEY --value <value> --visibility secret
eas env:create --name OPEN_API_KEY --value <value> --visibility secret

### Pull env to local env(.env.local)

eas env:pull --environment development
