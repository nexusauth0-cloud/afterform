import { campaign, forceSoldOut, getPromoCode, getShippingRegion } from "@/data/campaign";
import { product } from "@/data/product";
import {
  calculateItemCount,
  calculateTotals,
  getRemainingUnits,
  normalizeCartState,
} from "@/lib/cart";
import { resolveDropPhase } from "@/lib/drop";

export const runtime = "nodejs";

interface CheckoutRequestBody {
  lines?: unknown;
  promoCode?: unknown;
  region?: unknown;
}

interface StripeSession {
  id?: string;
  url?: string;
  error?: { message?: string };
}

function jsonError(
  status: number,
  code: string,
  message: string,
): Response {
  return Response.json({ ok: false, code, error: message }, { status });
}

export async function POST(request: Request) {
  let body: CheckoutRequestBody;

  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return jsonError(400, "invalid_json", "The checkout request was not valid JSON.");
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return jsonError(400, "empty_cart", "Your bag is empty.");
  }

  const region = campaign.shipping.regions.find(
    (candidate) => candidate.id === body.region,
  );
  if (!region) {
    return jsonError(400, "invalid_region", "Select a valid delivery region.");
  }

  const promoInput =
    typeof body.promoCode === "string" && body.promoCode.trim()
      ? body.promoCode.trim().toUpperCase()
      : null;

  const normalized = normalizeCartState({
    lines: body.lines,
    promoCode: promoInput,
    region: region.id,
  });

  if (!normalized || normalized.lines.length === 0) {
    return jsonError(
      400,
      "invalid_cart",
      "The bag could not be validated against the demo allocation.",
    );
  }

  if (promoInput && normalized.promoCode !== promoInput) {
    return jsonError(
      400,
      "invalid_promo",
      "That promo code is not valid for this release.",
    );
  }

  const phase = resolveDropPhase({
    now: Date.now(),
    launchAt: campaign.drop.launchAt,
    closeAt: campaign.drop.closeAt,
    unitsRemaining: getRemainingUnits(),
    forceSoldOut,
  });

  if (phase !== "live") {
    return jsonError(
      409,
      "drop_not_live",
      phase === "sold_out"
        ? "Edition 001 is archived. No further orders can be placed."
        : phase === "upcoming"
          ? "The release has not opened yet."
          : "The release window has closed.",
    );
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return jsonError(
      503,
      "stripe_not_configured",
      "Stripe is not configured for this deployment. No payment was taken.",
    );
  }

  const totals = calculateTotals(normalized);
  if (totals.totalCents <= 0) {
    return jsonError(400, "invalid_total", "The order total is not valid.");
  }

  const promo = normalized.promoCode
    ? getPromoCode(normalized.promoCode)
    : undefined;
  const percentOff = promo?.percentOff ?? 0;
  const unitAmount = Math.round(
    (product.priceCents * (100 - percentOff)) / 100,
  );

  if (unitAmount <= 0) {
    return jsonError(400, "invalid_total", "The discounted total is not valid.");
  }

  const origin = new URL(request.url).origin;
  const shippingRegion = getShippingRegion(normalized.region);
  const params = new URLSearchParams();

  params.set("mode", "payment");
  params.set(
    "success_url",
    `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  );
  params.set("cancel_url", `${origin}/checkout`);
  params.set("customer_creation", "if_required");
  params.set("billing_address_collection", "auto");
  params.set("expires_at", String(Math.floor(Date.now() / 1000) + 31 * 60));
  params.set("metadata[release]", "001");
  params.set("metadata[region]", normalized.region);
  params.set("metadata[inventory_mode]", "demo");
  params.set("metadata[promo_code]", normalized.promoCode ?? "none");
  params.set(
    "metadata[line_summary]",
    normalized.lines
      .map((line) => `US ${line.size} x${line.quantity}`)
      .join(", ")
      .slice(0, 480),
  );

  const allowedCountries = [
    "IE",
    "GB",
    "US",
    "DE",
    "FR",
    "NL",
    "BE",
    "ES",
    "IT",
    "PT",
    "AT",
    "DK",
    "SE",
    "FI",
    "PL",
    "CZ",
    "LU",
    "CA",
    "AU",
    "JP",
  ];
  allowedCountries.forEach((country, index) => {
    params.set(
      `shipping_address_collection[allowed_countries][${index}]`,
      country,
    );
  });

  normalized.lines.forEach((line, index) => {
    const variant = product.sizes.find((size) => size.us === line.size);
    if (!variant) return;
    const key = `line_items[${index}]`;
    params.set(`${key}[quantity]`, String(line.quantity));
    params.set(`${key}[price_data][currency]`, product.currency.toLowerCase());
    params.set(`${key}[price_data][unit_amount]`, String(unitAmount));
    params.set(
      `${key}[price_data][product_data][name]`,
      `${product.name} — US ${variant.us} / UK ${variant.uk} / EU ${variant.eu}`,
    );
    params.set(
      `${key}[price_data][product_data][description]`,
      `${product.colorway} · Proposed edition ${product.editionSize} · Concept release`,
    );
    params.set(
      `${key}[price_data][product_data][images][0]`,
      `${origin}/images/acquire.jpg`,
    );
  });

  if (totals.shippingCents > 0) {
    const shippingIndex = normalized.lines.length;
    const key = `line_items[${shippingIndex}]`;
    params.set(`${key}[quantity]`, "1");
    params.set(`${key}[price_data][currency]`, product.currency.toLowerCase());
    params.set(
      `${key}[price_data][unit_amount]`,
      String(totals.shippingCents),
    );
    params.set(
      `${key}[price_data][product_data][name]`,
      `Tracked delivery — ${shippingRegion.label}`,
    );
    params.set(
      `${key}[price_data][product_data][description]`,
      shippingRegion.eta,
    );
  }

  let stripeResponse: Response;
  try {
    stripeResponse = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        cache: "no-store",
      },
    );
  } catch {
    return jsonError(
      502,
      "stripe_unreachable",
      "Stripe could not be reached. No payment was taken.",
    );
  }

  const session = (await stripeResponse.json().catch(() => null)) as
    | StripeSession
    | null;

  if (!stripeResponse.ok || !session?.url) {
    console.error(
      "Stripe checkout session creation failed:",
      session?.error?.message ?? stripeResponse.status,
    );
    return jsonError(
      502,
      "stripe_error",
      "Stripe could not create a checkout session. No payment was taken.",
    );
  }

  return Response.json({
    ok: true,
    url: session.url,
    id: session.id,
    itemCount: calculateItemCount(normalized.lines),
  });
}
