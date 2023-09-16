import { useCallback, useEffect, useState } from "react";
import { CatContextType } from "@/context/CategoryContext";

export function useCategory(): CatContextType {
  const [category, setCategory] = useState<string>("");

  const setCurentCategory = useCallback((currentCategory: string): void => {
    setCategory(currentCategory);
  }, []);

  return { category, setCurentCategory };
}
