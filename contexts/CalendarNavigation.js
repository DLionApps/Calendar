import React, { createContext, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ initialNavigationState, children }) => {
  const [NavigationData, setNavigationData] = useState(initialNavigationState);

  return (
    <NavigationContext.Provider
      value={{
        NavigationState: [NavigationData, setNavigationData],
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
