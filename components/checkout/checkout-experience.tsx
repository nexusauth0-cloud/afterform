"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { campaign, getShippingRegion } from "@/data/campaign";
import { product } from "@/data/product";
import { formatPrice } from "@/lib/format";
import type { RegionId } from "@/types";
import { useCart } from "@/components/providers/cart-provider";
import { useDrop } from "@/components/providers/drop-provider";
import { CartLineItem } from "@/components/cart/cart-line";
import { PromoForm } from "@/components/cart/promo-form";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";

interface CheckoutExperienceProps {
  stripeConfigured: boolean;
}

export function CheckoutExperience({
  stripeConfigured,
}: CheckoutExperienceProps) {
  const {
    state,
    lines,
    totals,
    hydrated,
    setRegion,
  } = useCart();
  const { isPurchasable, phase } = useDrop();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const region = getShippingRegion(state.region);
  const canCheckout =
    hydrated && lines.length > 0 && isPurchasable && stripeConfigured;

  async function handleCheckout() {
    if (!canCheckout) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: state.lines,
          promoCode: state.promoCode,
          region: state.region,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; url?: string; message?: string; error?: string }
        | null;

      if (!response.ok || !data?.ok || !data.url) {
        setError(
          data?.error ??
            data?.message ??
            "Checkout could not be started. No payment was taken.",
        );
        setSubmitting(false);
        return;
      }

      window.location.assign(data.url);
    } catch {
      setError(
        "The checkout request failed. Check your connection and try again. No payment was taken.",
      );
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-ivory py-14 sm:py-20 lg:py-24">
      <div className="container-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite/12 pb-4">
          <SectionLabel index="02">Checkout / Boundary</SectionLabel>
          <Link
            href="/#acquire"
            className="inline-flex min-h-9 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/45 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-3" />
            Back to release
          </Link>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="display text-[clamp(3rem,6.5vw,6.3rem)] leading-[0.9] tracking-[-0.018em]">
              REVIEW
              <br />
              <span className="text-outline-graphite">THE OBJECT.</span>
            </h1>
            <p className="mt-5 max-w-[54ch] text-[13px] leading-[1.7] text-graphite/60">
              A secure summary before the payment boundary. This preview does not
              create or store orders. If Stripe is configured, you will be
              redirected there to enter payment and delivery details.
            </p>

            {!hydrated ? (
              <div className="mt-8 border border-graphite/12 bg-paper p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-3 w-1/3 bg-graphite/8" />
                  <div className="h-20 w-full bg-graphite/5" />
                  <div className="h-3 w-1/2 bg-graphite/8" />
                </div>
              </div>
            ) : lines.length === 0 ? (
              <div className="mt-8 border border-graphite/15 bg-paper p-6 sm:p-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/40">
                  00 / NOTHING IN BAG
                </p>
                <h2 className="display mt-4 text-[clamp(2.4rem,5vw,3.6rem)] leading-[0.9]">
                  YOUR BAG
                  <br />
                  <span className="text-outline-graphite">IS EMPTY.</span>
                </h2>
                <p className="mt-4 max-w-[42ch] text-[12px] leading-[1.65] text-graphite/55">
                  Select a size in the release section before continuing to the
                  checkout boundary.
                </p>
                <Link
                  href="/#acquire"
                  className="mt-5 inline-flex min-h-11 items-center gap-3 border border-graphite/20 px-4 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite transition hover:border-graphite hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Select your size
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            ) : (
              <div className="mt-8 space-y-3">
                <div className="border border-graphite/12 bg-paper">
                  <div className="flex items-center justify-between gap-4 border-b border-graphite/12 px-5 py-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/50">
                      01 / Bag
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-graphite/35">
                      {totals.itemCount} item
                      {totals.itemCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <ul className="divide-y divide-graphite/10 px-5">
                    {lines.map((line) => (
                      <CartLineItem key={line.size} line={line} />
                    ))}
                  </ul>
                </div>

                <div className="border border-graphite/12 bg-paper p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/50">
                      02 / Delivery region
                    </p>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/30">
                      {region.shortLabel}
                    </span>
                  </div>
                  <div className="relative mt-3">
                    <select
                      id="checkout-region"
                      value={state.region}
                      onChange={(event) =>
                        setRegion(event.target.value as RegionId)
                      }
                      className="min-h-11 w-full appearance-none border border-graphite/18 bg-transparent px-3 pr-9 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite outline-none transition focus-visible:border-graphite"
                    >
                      <option value="" disabled>
                        Select region
                      </option>
                      {campaign.shipping.regions.map((shippingRegion) => (
                        <option key={shippingRegion.id} value={shippingRegion.id}>
                          {shippingRegion.label}
                        </option>
                      ))}
                    </select>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-graphite/35"
                    >
                      ↓
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/40">
                    {region.eta}. Address details are collected by Stripe when
                    configured.
                  </p>
                </div>

                <div className="border border-graphite/12 bg-paper p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/50">
                      03 / Payment boundary
                    </p>
                    {stripeConfigured ? (
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/45">
                        <ShieldCheck
                          aria-hidden="true"
                          className="size-3"
                          strokeWidth={1.6}
                        />
                        Stripe configured
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/45">
                        <AlertTriangle
                          aria-hidden="true"
                          className="size-3"
                          strokeWidth={1.6}
                        />
                        Not connected
                      </span>
                    )}
                  </div>

                  {stripeConfigured ? (
                    <p className="mt-3 max-w-[58ch] text-[12px] leading-[1.65] text-graphite/55">
                      The next step is a Stripe-hosted Checkout session. Card
                      data is entered on Stripe, never in this app. This concept
                      build still does not create, store or fulfil orders.
                    </p>
                  ) : (
                    <div className="mt-3 border border-graphite/15 bg-acid/15 p-4">
                      <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-graphite/60">
                        Preview checkout — no payment provider connected
                      </p>
                      <p className="mt-2 text-[12px] leading-[1.65] text-graphite/60">
                        This deployment has no{" "}
                        <code className="font-mono text-[11px]">
                          STRIPE_SECRET_KEY
                        </code>
                        . No card fields are collected, no payment can be
                        processed, and no order will be created.
                      </p>
                      <p className="mt-2 font-mono text-[7px] uppercase leading-[1.7] tracking-[0.1em] text-graphite/35">
                        See README / Stripe setup. The route boundary lives at
                        app/api/checkout/route.ts.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-graphite/15 bg-paper lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <div className="flex items-center justify-between gap-4 border-b border-graphite/12 px-5 py-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/50">
                  Summary / EUR
                </p>
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/30">
                  {product.edition}
                </span>
              </div>

              <div className="p-5">
                <dl className="grid gap-2.5 font-mono text-[9px] uppercase tracking-[0.1em]">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-graphite/45">Subtotal</dt>
                    <dd className="tabular text-graphite/75">
                      {formatPrice(totals.subtotalCents, product.currency)}
                    </dd>
                  </div>
                  {totals.discountCents > 0 ? (
                    <div className="flex items-center justify-between gap-4 text-graphite/60">
                      <dt>Promo / {state.promoCode}</dt>
                      <dd className="tabular">
                        −{formatPrice(totals.discountCents, product.currency)}
                      </dd>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-graphite/45">
                      Shipping / {region.shortLabel}
                    </dt>
                    <dd className="tabular text-graphite/75">
                      {totals.shippingCents === 0
                        ? "Complimentary"
                        : formatPrice(totals.shippingCents, product.currency)}
                    </dd>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-4 border-t border-graphite/12 pt-3">
                    <dt className="text-graphite">Total</dt>
                    <dd className="font-sans text-[26px] font-medium leading-none tracking-[-0.05em] tabular">
                      {formatPrice(totals.totalCents, product.currency)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-graphite/12 pt-4">
                  <PromoForm />
                </div>

                {!isPurchasable ? (
                  <div className="mt-5 border border-graphite/15 px-3 py-2.5">
                    <p className="font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/50">
                      {phase === "sold_out"
                        ? "Edition 001 is archived. Checkout is closed."
                        : phase === "upcoming"
                          ? "Checkout opens when the drop goes live."
                          : "The release window has closed. Checkout is disabled."}
                    </p>
                  </div>
                ) : null}

                <Button
                  type="button"
                  variant="acid"
                  size="large"
                  onClick={handleCheckout}
                  disabled={!canCheckout || submitting}
                  className="mt-5 w-full justify-between border border-graphite/10"
                >
                  <span>
                    {submitting
                      ? "Opening Stripe"
                      : stripeConfigured
                        ? "Continue to Stripe"
                        : "Stripe not configured"}
                  </span>
                  {submitting ? (
                    <span
                      aria-hidden="true"
                      className="size-4 animate-spin rounded-full border border-ink/30 border-t-ink"
                    />
                  ) : (
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  )}
                </Button>

                {error ? (
                  <p
                    role="alert"
                    className="mt-3 border border-red-700/20 bg-red-50 px-3 py-2 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-red-800"
                  >
                    {error}
                  </p>
                ) : null}

                <p className="mt-3 flex items-start gap-2 font-mono text-[8px] uppercase leading-[1.65] tracking-[0.1em] text-graphite/38">
                  <Lock
                    aria-hidden="true"
                    className="mt-0.5 size-3 shrink-0"
                    strokeWidth={1.6}
                  />
                  {campaign.checkout.note} {campaign.checkout.stripeDocs}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
