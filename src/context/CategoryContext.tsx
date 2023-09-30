"use client";

import { createContext, useCallback, useContext, useState } from "react";
// import { useNavbarCategory } from "@/hooks/useCategory";

export interface CatContextType {
  category: string;
  setCategory: (title: string) => void;
}

export const CAT_DEFAULT_VALUES = {
  category: "All",
  setCategory: () => {},
};

export const NavbarCategoryContext =
  createContext<CatContextType>(CAT_DEFAULT_VALUES);

function NavbarCategoryProvider({ children }: any) {
  const [category, setCategory] = useState<string>("");

  // const setCurentCategory = useCallback((currentCategory: string): void => {
  //   setCategory(currentCategory);
  // }, []);

  // const { category, setCurentCategory } = useNavbarCategory();

  return (
    <NavbarCategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </NavbarCategoryContext.Provider>
  );
}

function useCurrentNavbarCategory() {
  const context = useContext(NavbarCategoryContext);

  if (context === undefined)
    throw new Error("CategoryContext was used outside of CategoryProvider");

  return context;
}

export { NavbarCategoryProvider, useCurrentNavbarCategory };
