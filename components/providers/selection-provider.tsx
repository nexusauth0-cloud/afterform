"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SizeVariant } from "@/types";
import { product } from "@/data/product";

interface SelectionContextValue {
  selectedSize: string | null;
  selectedVariant: SizeVariant | null;
  selectSize: (size: string) => void;
  clearSize: () => void;
  sizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function ProductSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const selectSize = useCallback((size: string) => {
    setSelectedSize(size);
  }, []);

  const clearSize = useCallback(() => setSelectedSize(null), []);
  const openSizeGuide = useCallback(() => setSizeGuideOpen(true), []);
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);

  const selectedVariant = useMemo(
    () => product.sizes.find((variant) => variant.us === selectedSize) ?? null,
    [selectedSize],
  );

  const value = useMemo<SelectionContextValue>(
    () => ({
      selectedSize,
      selectedVariant,
      selectSize,
      clearSize,
      sizeGuideOpen,
      openSizeGuide,
      closeSizeGuide,
    }),
    [
      selectedSize,
      selectedVariant,
      selectSize,
      clearSize,
      sizeGuideOpen,
      openSizeGuide,
      closeSizeGuide,
    ],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error(
      "useSelection must be used inside ProductSelectionProvider",
    );
  }
  return context;
}
