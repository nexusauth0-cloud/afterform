import {
  campaign,
  getPromoCode,
  getShippingRegion,
} from "@/data/campaign";
import { DEMO_STOCK } from "@/data/inventory";
import { product } from "@/data/product";
import type {
  CartLine,
  CartState,
  CartTotals,
  PromoResult,
  RegionId,
  SizeVariant,
  StockStatus,
} from "@/types";

export const CART_STORAGE_KEY = "afterform.cart.v1";

export const EMPTY_CART: CartState = {
  lines: [],
  promoCode: null,
  region: "eu",
};

export function getSizeVariant(size: string): SizeVariant | undefined {
  return product.sizes.find((variant) => variant.us === size);
}

export function getStockForSize(size: string): number {
  return Math.max(0, DEMO_STOCK[size] ?? 0);
}

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out";
  if (stock <= 3) return "low";
  return "available";
}

export function getRemainingUnits(): number {
  return product.sizes.reduce(
    (total, variant) => total + getStockForSize(variant.us),
    0,
  );
}

export function isInventorySoldOut(): boolean {
  return getRemainingUnits() === 0;
}

export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => {
    const quantity = Math.max(0, Math.floor(line.quantity));
    return total + product.priceCents * quantity;
  }, 0);
}

export function calculateItemCount(lines: CartLine[]): number {
  return lines.reduce(
    (total, line) => total + Math.max(0, Math.floor(line.quantity)),
    0,
  );
}

export function validatePromoCode(input: string): PromoResult {
  const code = input.trim().toUpperCase();

  if (!code) {
    return { ok: false, message: "Enter a code to continue." };
  }

  const promo = getPromoCode(code);
  if (!promo) {
    return {
      ok: false,
      message: "That code is not valid for this release.",
    };
  }

  return {
    ok: true,
    code: promo.code,
    percentOff: promo.percentOff,
    message: `${promo.code} applied — ${promo.percentOff}% off.`,
  };
}

export function calculateDiscount(
  subtotalCents: number,
  promoCode: string | null,
): number {
  if (!promoCode) return 0;
  const promo = getPromoCode(promoCode);
  if (!promo) return 0;
  return Math.round((Math.max(0, subtotalCents) * promo.percentOff) / 100);
}

export function getShippingCents(
  regionId: RegionId,
  subtotalCents: number,
): number {
  if (subtotalCents <= 0) return 0;
  return getShippingRegion(regionId).rateCents;
}

export function calculateTotals(state: CartState): CartTotals {
  const subtotalCents = calculateSubtotal(state.lines);
  const discountCents = calculateDiscount(subtotalCents, state.promoCode);
  const discountedSubtotal = Math.max(0, subtotalCents - discountCents);
  const shippingCents = getShippingCents(state.region, discountedSubtotal);

  return {
    subtotalCents,
    discountCents,
    shippingCents,
    totalCents: discountedSubtotal + shippingCents,
    itemCount: calculateItemCount(state.lines),
  };
}

export function getLineTotal(line: CartLine): number {
  return product.priceCents * line.quantity;
}

export function getRegionLabel(regionId: RegionId): string {
  return getShippingRegion(regionId).label;
}

export function clampQuantity(size: string, quantity: number): number {
  const stock = getStockForSize(size);
  const normalized = Math.max(0, Math.floor(Number(quantity) || 0));
  return Math.min(normalized, stock);
}

export function normalizeCartState(raw: unknown): CartState | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Partial<CartState>;

  const validRegion =
    campaign.shipping.regions.find((region) => region.id === candidate.region)
      ?.id ?? "eu";

  const lines: CartLine[] = [];
  if (Array.isArray(candidate.lines)) {
    for (const entry of candidate.lines) {
      if (!entry || typeof entry !== "object") continue;
      const line = entry as Partial<CartLine>;
      if (typeof line.size !== "string") continue;
      if (!getSizeVariant(line.size)) continue;
      const stock = getStockForSize(line.size);
      if (stock <= 0) continue;
      const quantity = clampQuantity(line.size, Number(line.quantity ?? 0));
      if (quantity <= 0) continue;

      const existing = lines.find((item) => item.size === line.size);
      if (existing) {
        existing.quantity = clampQuantity(
          line.size,
          existing.quantity + quantity,
        );
      } else {
        lines.push({ size: line.size, quantity });
      }
    }
  }

  const promoCode =
    typeof candidate.promoCode === "string" &&
    validatePromoCode(candidate.promoCode).ok
      ? candidate.promoCode.toUpperCase()
      : null;

  return { lines, promoCode, region: validRegion };
}
