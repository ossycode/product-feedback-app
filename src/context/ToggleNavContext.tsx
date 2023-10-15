"use client";

import { createContext, useContext, useState } from "react";

type NavContextType = {
  isNavOpen: boolean;
  toggleNavbar: () => void;
};
const ToggleNavContext = createContext<NavContextType | null>(null);

function ToggleNavProvider({ children }: any) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  function toggleNavbar() {
    setIsNavOpen((isNavOpen) => !isNavOpen);
  }

  return (
    <ToggleNavContext.Provider value={{ isNavOpen, toggleNavbar }}>
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
