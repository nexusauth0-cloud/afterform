const currencyFormatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: string) {
  const cached = currencyFormatters.get(currency);
  if (cached) return cached;

  const formatter = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  currencyFormatters.set(currency, formatter);
  return formatter;
}

export function formatPrice(
  cents: number,
  currency = "EUR",
): string {
  const safeCents = Number.isFinite(cents) ? Math.max(0, Math.round(cents)) : 0;
  return getCurrencyFormatter(currency).format(safeCents / 100);
}

export function formatPriceParts(
  cents: number,
  currency = "EUR",
): { symbol: string; amount: string } {
  const formatted = formatPrice(cents, currency);
  const match = formatted.match(/^([^\d]*)([\d.,]+)$/);
  return {
    symbol: match?.[1] ?? "€",
    amount: match?.[2] ?? String(cents / 100),
  };
}

export function pad(value: number): string {
  return String(Math.max(0, Math.floor(value))).padStart(2, "0");
}

export function possessive(name: string): string {
  return name.endsWith("s") ? `${name}'` : `${name}'s`;
}
