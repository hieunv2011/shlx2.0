import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activePopup, setActivePopup]=useState(false);
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        activePopup,
        setActivePopup,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
