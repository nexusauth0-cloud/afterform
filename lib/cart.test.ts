import { describe, expect, it } from "vitest";
import {
  calculateDiscount,
  calculateItemCount,
  calculateSubtotal,
  calculateTotals,
  clampQuantity,
  EMPTY_CART,
  getRemainingUnits,
  getShippingCents,
  getStockForSize,
  getStockStatus,
  normalizeCartState,
  validatePromoCode,
} from "@/lib/cart";
import { product } from "@/data/product";

describe("inventory", () => {
  it("exposes the illustrative allocation", () => {
    expect(getStockForSize("9")).toBe(2);
    expect(getStockForSize("7")).toBe(0);
    expect(getStockForSize("not-a-size")).toBe(0);
    expect(getRemainingUnits()).toBe(42);
  });

  it("classifies stock states", () => {
    expect(getStockStatus(0)).toBe("out");
    expect(getStockStatus(1)).toBe("low");
    expect(getStockStatus(3)).toBe("low");
    expect(getStockStatus(4)).toBe("available");
  });
});

describe("cart maths", () => {
  it("calculates subtotal and item count", () => {
    const lines = [
      { size: "9", quantity: 2 },
      { size: "8", quantity: 1 },
    ];
    expect(calculateSubtotal(lines)).toBe(product.priceCents * 3);
    expect(calculateItemCount(lines)).toBe(3);
  });

  it("applies the preview promo", () => {
    expect(calculateDiscount(28500, "FORM10")).toBe(2850);
    expect(calculateDiscount(28500, null)).toBe(0);
    expect(calculateDiscount(28500, "NOPE")).toBe(0);
    expect(validatePromoCode(" form10 ").ok).toBe(true);
    expect(validatePromoCode("").ok).toBe(false);
  });

  it("calculates region shipping and totals", () => {
    const euTotals = calculateTotals({
      lines: [{ size: "9", quantity: 1 }],
      promoCode: "FORM10",
      region: "eu",
    });
    expect(euTotals).toEqual({
      subtotalCents: 28500,
      discountCents: 2850,
      shippingCents: 0,
      totalCents: 25650,
      itemCount: 1,
    });

    const ukTotals = calculateTotals({
      lines: [{ size: "9", quantity: 1 }],
      promoCode: null,
      region: "uk",
    });
    expect(ukTotals.shippingCents).toBe(1800);
    expect(ukTotals.totalCents).toBe(30300);

    expect(getShippingCents("us", 0)).toBe(0);
    expect(getShippingCents("us", 28500)).toBe(3000);
    expect(calculateTotals(EMPTY_CART).totalCents).toBe(0);
  });

  it("clamps quantities to stock", () => {
    expect(clampQuantity("9", 99)).toBe(2);
    expect(clampQuantity("9", -4)).toBe(0);
    expect(clampQuantity("9", 1.8)).toBe(1);
    expect(clampQuantity("7", 3)).toBe(0);
  });
});

describe("cart normalisation", () => {
  it("validates and merges stored lines", () => {
    const state = normalizeCartState({
      lines: [
        { size: "9", quantity: 1 },
        { size: "9", quantity: 4 },
        { size: "7", quantity: 1 },
        { size: "bad", quantity: 1 },
      ],
      promoCode: "form10",
      region: "uk",
    });

    expect(state).not.toBeNull();
    expect(state?.lines).toEqual([{ size: "9", quantity: 2 }]);
    expect(state?.promoCode).toBe("FORM10");
    expect(state?.region).toBe("uk");
  });

  it("drops invalid promos, regions and malformed values", () => {
    const state = normalizeCartState({
      lines: [{ size: "9", quantity: 1 }],
      promoCode: "NOTREAL",
      region: "mars",
    });

    expect(state?.promoCode).toBeNull();
    expect(state?.region).toBe("eu");
    expect(normalizeCartState(null)).toBeNull();
    expect(normalizeCartState({ lines: "nope" })?.lines).toEqual([]);
  });
});
