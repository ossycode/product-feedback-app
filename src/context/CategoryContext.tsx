"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useCategory } from "@/hooks/useCategory";
// import useCategory from "@/hooks/useCategory";

export interface CatContextType {
  category: string;
  setCurentCategory: (title: string) => void;
}

export const CAT_DEFAULT_VALUES = {
  category: "",
  setCurentCategory: () => {},
};

export const CategoryContext =
  createContext<CatContextType>(CAT_DEFAULT_VALUES);

function CategoryProvider({ children }: any) {
  const { category, setCurentCategory } = useCategory();

  return (
    <CategoryContext.Provider value={{ category, setCurentCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

function useCurrentCategory() {
  const context = useContext(CategoryContext);

  if (context === undefined)
    throw new Error("CategoryContext was used outside of CategoryProvider");

  return context;
}

export { CategoryProvider, useCurrentCategory };
