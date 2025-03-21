import React, { createContext, useState } from "react";
import { DEFAULT_APP_CONTEXT } from "../../utilities/constants";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppdata] = useState(DEFAULT_APP_CONTEXT);

  return <AppContext.Provider value={{ appData, setAppdata }}>{children}</AppContext.Provider>;
};
