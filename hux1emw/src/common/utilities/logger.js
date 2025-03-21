import * as Sentry from "@sentry/react-native";
import * as FileSystem from "expo-file-system";
import { consoleTransport, fileAsyncTransport, logger } from "react-native-logs";
import { LOG_LEVEL, SENTRY_DSN } from "./urls";

const InteractionManager = require("react-native").InteractionManager;

const LOG_LEVELS = {
  debug: ["debug", "info", "warn", "error", "fatal"], // All levels
  info: ["info", "warn", "error", "fatal"], // Info and above
  warn: ["warn", "error", "fatal"], // Warn and above
  error: ["error", "fatal"], // Error and above
};

const sentryTransport = ({ msg, level }) => {
  if (LOG_LEVELS[LOG_LEVEL]?.includes(level.text)) {
    const cleanMsg = typeof msg === "object" ? JSON.stringify(msg) : msg; // Convert objects to JSON string
    Sentry.captureMessage(cleanMsg);
  }
};

var LOG = logger.createLogger({
  async: true,
  asyncFunc: InteractionManager.runAfterInteractions,
  severity: "info",
  transport: [consoleTransport, fileAsyncTransport, sentryTransport],
  transportOptions: {
    FS: FileSystem,
    fileName: `logs_{date-today}`,
    colors: {
      debug: "greenBright",
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
      exception: "magentaBright",
      fatal: "red",
    },
  },
});

Sentry.init({
  dsn: SENTRY_DSN,
  debug: LOG_LEVEL === "debug",
  beforeSend(event) {
    return LOG_LEVELS[LOG_LEVEL]?.includes(event.level) ? event : null;
  },
});

export { LOG };
