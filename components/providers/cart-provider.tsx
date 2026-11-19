"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  EMPTY_CART,
  calculateTotals,
  clampQuantity,
  getStockForSize,
  normalizeCartState,
  validatePromoCode,
} from "@/lib/cart";
import type {
  AddToCartResult,
  CartLine,
  CartState,
  CartTotals,
  PromoResult,
  RegionId,
} from "@/types";
import { useDrop } from "@/components/providers/drop-provider";

interface CartContextValue {
  state: CartState;
  lines: CartLine[];
  totals: CartTotals;
  hydrated: boolean;
  isOpen: boolean;
  stockForSize: (size: string) => number;
  addItem: (size: string, quantity?: number) => AddToCartResult;
  updateQuantity: (size: string, quantity: number) => void;
  removeItem: (size: string) => void;
  applyPromo: (code: string) => PromoResult;
  removePromo: () => void;
  setRegion: (region: RegionId) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return null;
    return normalizeCartState(JSON.parse(stored));
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isPurchasable } = useDrop();
  const [state, setState] = useState<CartState>(EMPTY_CART);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Hydration from localStorage is intentionally deferred one tick so the
    // server and first client render agree on the empty cart.
    const timer = window.setTimeout(() => {
      const stored = readStoredCart();
      if (stored) setState(stored);
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable in private browsing; the cart still works
      // for the current session.
    }
  }, [state, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (size: string, quantity = 1): AddToCartResult => {
      if (!isPurchasable) {
        return {
          ok: false,
          message: "The drop is not open for purchases right now.",
        };
      }

      const stock = getStockForSize(size);
      if (stock <= 0) {
        return { ok: false, message: `US ${size} is currently unavailable.` };
      }

      const requested = Math.max(1, Math.floor(Number(quantity) || 1));
      const existing = state.lines.find((line) => line.size === size);
      const nextQuantity = (existing?.quantity ?? 0) + requested;

      if (nextQuantity > stock) {
        return {
          ok: false,
          message:
            existing && existing.quantity >= stock
              ? `Your bag already holds the last ${stock} pair${stock === 1 ? "" : "s"} in US ${size}.`
              : `Only ${stock} pair${stock === 1 ? "" : "s"} available in US ${size}.`,
        };
      }

      setState((previous) => {
        const line = previous.lines.find((item) => item.size === size);
        if (line) {
          return {
            ...previous,
            lines: previous.lines.map((item) =>
              item.size === size
                ? {
                    ...item,
                    quantity: clampQuantity(size, item.quantity + requested),
                  }
                : item,
            ),
          };
        }
        return {
          ...previous,
          lines: [...previous.lines, { size, quantity: requested }],
        };
      });

      return {
        ok: true,
        message: `US ${size} added to your bag.`,
        quantity: requested,
      };
    },
    [isPurchasable, state.lines],
  );

  const updateQuantity = useCallback((size: string, quantity: number) => {
    setState((previous) => {
      const nextQuantity = clampQuantity(size, quantity);
      return {
        ...previous,
        lines:
          nextQuantity <= 0
            ? previous.lines.filter((line) => line.size !== size)
            : previous.lines.map((line) =>
                line.size === size ? { ...line, quantity: nextQuantity } : line,
              ),
      };
    });
  }, []);

  const removeItem = useCallback((size: string) => {
    setState((previous) => ({
      ...previous,
      lines: previous.lines.filter((line) => line.size !== size),
    }));
  }, []);

  const applyPromo = useCallback((code: string): PromoResult => {
    const result = validatePromoCode(code);
    if (result.ok && result.code) {
      setState((previous) => ({ ...previous, promoCode: result.code ?? null }));
    }
    return result;
  }, []);

  const removePromo = useCallback(() => {
    setState((previous) => ({ ...previous, promoCode: null }));
  }, []);

  const setRegion = useCallback((region: RegionId) => {
    setState((previous) => ({ ...previous, region }));
  }, []);

  const clearCart = useCallback(() => {
    setState((previous) => ({
      ...EMPTY_CART,
      region: previous.region,
    }));
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const totals = useMemo(() => calculateTotals(state), [state]);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      lines: state.lines,
      totals,
      hydrated,
      isOpen,
      stockForSize: getStockForSize,
      addItem,
      updateQuantity,
      removeItem,
      applyPromo,
      removePromo,
      setRegion,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      state,
      totals,
      hydrated,
      isOpen,
      addItem,
      updateQuantity,
      removeItem,
      applyPromo,
      removePromo,
      setRegion,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
