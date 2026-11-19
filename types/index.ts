export type RegionId = "eu" | "uk" | "us" | "row";

export type DropPhase = "upcoming" | "live" | "sold_out" | "closed";

export type StockStatus = "available" | "low" | "out";

export interface SizeVariant {
  /** US size, used as the canonical identifier. */
  us: string;
  uk: string;
  eu: string;
  cm: string;
}

export interface ProductSpec {
  index: string;
  label: string;
  title: string;
  value: string;
  description: string;
}

export interface InspectionHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  title: string;
  body: string;
}

export interface InspectionFrame {
  id: string;
  label: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
  hotspots: InspectionHotspot[];
}

export interface LookbookItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  caption: string;
  /** Maps to a layout treatment in the bento grid. */
  format: "landscape" | "portrait" | "square" | "wide" | "tall";
  source: string;
}

export interface PromoCode {
  code: string;
  percentOff: number;
  label: string;
}

export interface ShippingRegion {
  id: RegionId;
  label: string;
  shortLabel: string;
  rateCents: number;
  eta: string;
}

export interface CartLine {
  size: string;
  quantity: number;
}

export interface CartState {
  lines: CartLine[];
  promoCode: string | null;
  region: RegionId;
}

export interface CartTotals {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
  itemCount: number;
}

export interface PromoResult {
  ok: boolean;
  code?: string;
  percentOff?: number;
  message: string;
}

export interface AddToCartResult {
  ok: boolean;
  message: string;
  quantity?: number;
}

export interface LookbookAsset {
  src: string;
  alt: string;
  source: string;
  license: string;
}
