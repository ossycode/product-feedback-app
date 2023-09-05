"use client";

import { createContext, useContext, useState } from "react";

// interface IToggleNav {
//    isNavOpen: boolean;
//   toggleDarkMode: () => void;
// }
type NavContextType = {
  isNavOpen: boolean;
  toggleDarkMode: () => void;
};
const ToggleNavContext = createContext<NavContextType | null>(null);

function ToggleNavProvider({ children }: any) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  function toggleDarkMode() {
    setIsNavOpen((isNavOpen) => !isNavOpen);
  }

  return (
    <ToggleNavContext.Provider value={{ isNavOpen, toggleDarkMode }}>
      {children}
    </ToggleNavContext.Provider>
  );
}

function useToggleNav() {
  const context = useContext(ToggleNavContext) as NavContextType;

  if (context === undefined)
    throw new Error("ToggleNavContext was used outisde of ToggleNavProvider");

  return context;
}

export { ToggleNavProvider, useToggleNav };
