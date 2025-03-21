import React, { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import { DARK_THEME, LIGHT_THEME } from "../../utilities/colors";
import { LOG } from "../../utilities/logger";

const themes = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};

const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() || "light"; // Detect system theme
  const defaultTheme = systemTheme === "dark" ? themes.dark : themes.light;
  LOG.info(`System theme is: ${systemTheme}, computed default theme is: ${defaultTheme} and default theme used for the app is dark`);
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the Theme
export const useTheme = () => useContext(ThemeContext);
