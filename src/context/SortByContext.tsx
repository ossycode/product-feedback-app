"use client";

import { createContext, useContext, useState } from "react";

export interface SortByContextType {
  sortBy: string;
  setSortBy: (title: string) => void;
}

export const SORT_DEFAULT_VALUES = {
  sortBy: "Most Upvotes",
  setSortBy: () => {},
};

export const SortByContext =
  createContext<SortByContextType>(SORT_DEFAULT_VALUES);

function SortByProvider({ children }: any) {
  const [sortBy, setSortBy] = useState<string>("");

  return (
    <SortByContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortByContext.Provider>
  );
}

function useSortBy() {
  const context = useContext(SortByContext);

  if (context === undefined)
    throw new Error("CategoryContext was used outside of CategoryProvider");

  return context;
}

export { SortByProvider, useSortBy };
