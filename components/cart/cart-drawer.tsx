"use client";

import { ArrowRight, Lock, Truck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { campaign, getShippingRegion } from "@/data/campaign";
import { product } from "@/data/product";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { useDrop } from "@/components/providers/drop-provider";
import { useToast } from "@/components/providers/toast-provider";
import { CartLineItem } from "@/components/cart/cart-line";
import { PromoForm } from "@/components/cart/promo-form";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { RegionId } from "@/types";

export function CartDrawer() {
  const { state, lines, totals, hydrated, isOpen, closeCart, setRegion } =
    useCart();
  const { isPurchasable, phase } = useDrop();
  const { push } = useToast();
  const router = useRouter();

  const region = getShippingRegion(state.region);
  const itemLabel = `${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"}`;

  function handleCheckout() {
    if (!isPurchasable) {
      push({
        title: "Checkout is not open",
        description:
          phase === "sold_out"
            ? "Edition 001 is archived. No further orders can be placed."
            : "Checkout opens when the drop is live.",
        tone: "error",
      });
      return;
    }

    closeCart();
    router.push("/checkout");
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeCart}
      title="Your bag"
      variant="drawer"
      className="bg-ivory"
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-graphite/12 px-5 py-5 sm:px-6">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-graphite/40">
              AFTERFORM / BAG
            </p>
            <h2 className="mt-1.5 flex items-baseline gap-3 font-sans text-[24px] font-medium tracking-[-0.04em]">
              Your bag
              <span className="font-mono text-[9px] tracking-[0.12em] text-graphite/40">
                {String(totals.itemCount).padStart(2, "0")}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="grid size-10 shrink-0 place-items-center border border-graphite/15 transition hover:border-graphite hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        {!hydrated ? (
          <div className="flex-1 px-5 py-6 sm:px-6" aria-hidden="true">
            <div className="flex animate-pulse gap-4">
              <div className="h-[116px] w-[88px] bg-graphite/8" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-2/3 bg-graphite/8" />
                <div className="h-2 w-1/2 bg-graphite/6" />
                <div className="h-2 w-1/3 bg-graphite/6" />
              </div>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-5 py-10 sm:px-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/35">
              00 / NOTHING ADDED
            </p>
            <p className="display mt-4 text-[clamp(2.8rem,12vw,3.8rem)] leading-[0.9]">
              YOUR BAG
              <br />
              <span className="text-outline-graphite">IS EMPTY.</span>
            </p>
            <p className="mt-4 max-w-[30ch] text-[12px] leading-[1.65] text-graphite/55">
              Select a size in the release section to hold a pair. The demo
              allocation is limited and held only in this browser.
            </p>
            <a
              href="#acquire"
              onClick={closeCart}
              className="mt-6 inline-flex min-h-11 items-center gap-3 border border-graphite/20 px-4 font-mono text-[9px] uppercase tracking-[0.13em] text-graphite transition hover:border-graphite hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Select your size
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 sm:px-6">
              <ul className="divide-y divide-graphite/10">
                {lines.map((line) => (
                  <CartLineItem key={line.size} line={line} />
                ))}
              </ul>

              <div className="mt-2 border-t border-graphite/12 py-5">
                <PromoForm />
              </div>

              <div className="border-t border-graphite/12 py-5">
                <label
                  htmlFor="cart-region"
                  className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/45"
                >
                  Delivery region
                </label>
                <div className="relative mt-2">
                  <select
                    id="cart-region"
                    value={state.region}
                    onChange={(event) =>
                      setRegion(event.target.value as RegionId)
                    }
                    className="min-h-11 w-full appearance-none border border-graphite/18 bg-transparent px-3 pr-9 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite outline-none transition focus-visible:border-graphite"
                  >
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
                <p className="mt-2 flex items-start gap-2 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/40">
                  <Truck
                    aria-hidden="true"
                    className="mt-0.5 size-3 shrink-0"
                    strokeWidth={1.6}
                  />
                  {region.eta}
                </p>
              </div>
            </div>

            <div className="shrink-0 border-t border-graphite/12 bg-paper px-5 py-5 sm:px-6">
              <dl className="grid gap-2 font-mono text-[9px] uppercase tracking-[0.1em]">
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
                  <dt className="text-graphite/45">Shipping / {region.shortLabel}</dt>
                  <dd className="tabular text-graphite/75">
                    {totals.shippingCents === 0
                      ? "Complimentary"
                      : formatPrice(totals.shippingCents, product.currency)}
                  </dd>
                </div>
                <div className="mt-2 flex items-end justify-between gap-4 border-t border-graphite/12 pt-3">
                  <dt className="text-graphite">Total</dt>
                  <dd className="font-sans text-[22px] font-medium leading-none tracking-[-0.04em] tabular">
                    {formatPrice(totals.totalCents, product.currency)}
                  </dd>
                </div>
              </dl>

              <Button
                type="button"
                variant="acid"
                size="large"
                onClick={handleCheckout}
                disabled={!isPurchasable}
                className="mt-4 w-full justify-between border border-graphite/10"
              >
                <span>Continue to checkout</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>

              {!isPurchasable ? (
                <p className="mt-3 border border-graphite/15 px-3 py-2 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/50">
                  {phase === "sold_out"
                    ? "Edition 001 is archived. Checkout is closed."
                    : "Checkout is disabled until the drop opens."}
                </p>
              ) : null}

              <p className="mt-3 flex items-start gap-2 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/38">
                <Lock
                  aria-hidden="true"
                  className="mt-0.5 size-3 shrink-0"
                  strokeWidth={1.6}
                />
                Payment is handled by Stripe when configured. This preview does
                not store orders or card data. Inventory is illustrative.
              </p>
              <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[0.12em] text-graphite/25">
                {itemLabel} / {product.edition}
              </p>
            </div>
          </>
        )}

        {lines.length === 0 && phase === "sold_out" ? (
          <div
            className={cn(
              "shrink-0 border-t border-graphite/12 px-5 py-4 sm:px-6",
            )}
          >
            <p className="font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/45">
              Edition 001 is archived. Join the waitlist for the next release.
            </p>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
}
