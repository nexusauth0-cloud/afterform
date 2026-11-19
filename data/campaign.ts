import type { PromoCode, ShippingRegion } from "@/types";

const DEFAULT_LAUNCH_AT = "2026-11-17T00:00:00+01:00";
const DEFAULT_CLOSE_AT = "2026-11-24T23:59:59+01:00";

export const campaign = {
  brand: "AFTERFORM",
  release: "001",
  campaignLine: "FORM FOLLOWS NOTHING.",
  productName: "AFTERFORM 001",
  tagline: "A study in subtraction.",
  announcement: {
    primary: "AFTERFORM 001 — LIMITED RELEASE",
    secondary: "300 NUMBERED PAIRS / NO RESTOCK",
    action: "JOIN THE LIST",
  },
  drop: {
    launchAt: process.env.NEXT_PUBLIC_DROP_LAUNCH_AT ?? DEFAULT_LAUNCH_AT,
    closeAt: process.env.NEXT_PUBLIC_DROP_CLOSE_AT ?? DEFAULT_CLOSE_AT,
    displayDate: "17 NOV 2026",
    displayTime: "09:00 CET",
    editionSize: 300,
    timezone: "CET",
  },
  hero: {
    eyebrow: "RELEASE 001 / INDEPENDENT FOOTWEAR STUDY",
    description:
      "A bonded shell over a hollow core. Built for movement, resolved in absence. The first AFTERFORM release — 300 numbered pairs, one release, no restock.",
    primaryCta: "SECURE YOUR PAIR",
    secondaryCta: "INSPECT THE OBJECT",
    imageCaption: "CAMPAIGN STUDY / 01",
  },
  ticker: [
    "FORM FOLLOWS NOTHING",
    "001 — GRAPHITE / CHALK",
    "300 NUMBERED PAIRS",
    "NO RESTOCK",
    "AFTERFORM / TECHNICAL FOOTWEAR",
  ],
  navigation: [
    { label: "001", href: "/#acquire", id: "acquire" },
    { label: "OBJECT", href: "/#inspect", id: "inspect" },
    { label: "FORM", href: "/#story", id: "story" },
    { label: "TECH FILE", href: "/#tech-file", id: "tech-file" },
    { label: "LOOKBOOK", href: "/#lookbook", id: "lookbook" },
  ],
  manifesto: {
    heading: ["REMOVE", "UNTIL ONLY", "THE NECESSARY", "REMAINS."],
    intro:
      "AFTERFORM begins with a refusal. No ornamental panels. No borrowed codes. No logo doing the work of an idea. What is left is structure, proportion and a small acid signal where the foot tells the shoe what to do.",
    body:
      "The 001 is an independent design study in technical footwear — conceived as a single object, released as a single edition. Its language is architectural: loads are transferred, voids are deliberate, seams are reduced to the places where they matter. Nothing is added to signal luxury. The material has to carry that.",
    quote: "We did not decorate a shoe. We subtracted until it behaved.",
  },
  shipping: {
    currency: "EUR",
    regions: [
      {
        id: "eu",
        label: "European Union",
        shortLabel: "EU",
        rateCents: 0,
        eta: "Complimentary tracked delivery · 2–4 working days",
      },
      {
        id: "uk",
        label: "United Kingdom",
        shortLabel: "UK",
        rateCents: 1800,
        eta: "Tracked delivery · 2–4 working days",
      },
      {
        id: "us",
        label: "United States",
        shortLabel: "US",
        rateCents: 3000,
        eta: "Tracked delivery · 4–7 working days",
      },
      {
        id: "row",
        label: "Rest of world",
        shortLabel: "ROW",
        rateCents: 4000,
        eta: "Tracked delivery · 5–9 working days",
      },
    ] satisfies ShippingRegion[],
  },
  promoCodes: [
    {
      code: "FORM10",
      percentOff: 10,
      label: "Preview code — 10% off",
    },
  ] satisfies PromoCode[],
  waitlist: {
    eyebrow: "WAITLIST / DROP SIGNAL",
    heading: ["GET IN", "LINE."],
    description:
      "Drop 001 is an edition of 300. When it is gone, it is archived. Join the line for Drop 002, studio dispatches and first access — not a newsletter full of noise.",
    consent:
      "I agree to receive occasional AFTERFORM release emails. I can leave the list at any time.",
  },
  checkout: {
    note: "Preview build — no payment is taken unless Stripe is configured.",
    stripeDocs:
      "Set STRIPE_SECRET_KEY to enable Stripe Checkout. The checkout route builds the session server-side; no card data passes through this app.",
  },
  disclaimer:
    "AFTERFORM is an independent concept label. This site is a pre-launch demonstration, not a live commercial operation. Product specifications, inventory and campaign references are illustrative.",
} as const;

export const forceSoldOut = process.env.NEXT_PUBLIC_FORCE_SOLD_OUT === "true";

export function getPromoCode(code: string): PromoCode | undefined {
  return campaign.promoCodes.find(
    (promo) => promo.code.toUpperCase() === code.toUpperCase(),
  );
}

export function getShippingRegion(id: string): ShippingRegion {
  return (
    campaign.shipping.regions.find((region) => region.id === id) ??
    campaign.shipping.regions[0]
  );
}

export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  const vercelPreview = process.env.VERCEL_URL;
  if (vercelPreview) return `https://${vercelPreview}`;

  return "http://localhost:3000";
})();
