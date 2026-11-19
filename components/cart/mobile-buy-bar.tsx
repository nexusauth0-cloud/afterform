"use client";

import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { product } from "@/data/product";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/providers/cart-provider";
import { useDrop } from "@/components/providers/drop-provider";
import { useSelection } from "@/components/providers/selection-provider";
import { useToast } from "@/components/providers/toast-provider";

export function MobileBuyBar() {
  const pathname = usePathname();
  const { selectedSize } = useSelection();
  const { addItem, totals, openCart } = useCart();
  const { phase, statusLabel, previewSoldOut } = useDrop();
  const { push } = useToast();

  if (pathname !== "/") return null;

  function handleAdd() {
    if (!selectedSize) return;
    const result = addItem(selectedSize);
    push({
      title: result.ok ? `US ${selectedSize} added` : "Could not add",
      description: result.message,
      tone: result.ok ? "success" : "error",
      action: result.ok ? { label: "View bag", onClick: openCart } : undefined,
    });
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-graphite/15 bg-ivory/95 backdrop-blur-xl lg:hidden">
      <div className="safe-bottom flex items-stretch gap-2 px-3 pt-2 pb-2">
        <div className="flex min-w-0 flex-col justify-center px-1">
          <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-graphite/45">
            <span
              aria-hidden="true"
              className={
                phase === "live"
                  ? "size-1 rounded-full bg-acid ring-1 ring-graphite/15"
                  : "size-1 rounded-full bg-graphite/30"
              }
            />
            {previewSoldOut ? "SOLD-OUT PREVIEW" : statusLabel}
          </span>
          <span className="mt-0.5 font-sans text-[16px] font-medium leading-none tracking-[-0.04em]">
            {formatPrice(product.priceCents, product.currency)}
          </span>
        </div>

        {phase === "live" ? (
          selectedSize ? (
            <button
              type="button"
              onClick={handleAdd}
              className="flex min-h-12 flex-1 items-center justify-between gap-3 bg-acid px-4 font-mono text-[9px] uppercase tracking-[0.12em] text-ink transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span>
                Add / US {selectedSize}
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          ) : (
            <a
              href="#acquire"
              className="flex min-h-12 flex-1 items-center justify-between gap-3 bg-acid px-4 font-mono text-[9px] uppercase tracking-[0.12em] text-ink transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Select your size
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )
        ) : (
          <a
            href="#waitlist"
            className="flex min-h-12 flex-1 items-center justify-between gap-3 bg-acid px-4 font-mono text-[9px] uppercase tracking-[0.12em] text-ink transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {phase === "upcoming" ? "Join the drop list" : "Join the next list"}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        )}

        <button
          type="button"
          onClick={openCart}
          aria-label={`Open bag, ${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"}`}
          className="relative grid size-12 shrink-0 place-items-center border border-graphite/20 text-graphite transition active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ShoppingBag
            aria-hidden="true"
            className="size-[17px]"
            strokeWidth={1.5}
          />
          <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center bg-graphite px-1 py-0.5 font-mono text-[7px] leading-none text-ivory">
            {String(totals.itemCount).padStart(2, "0")}
          </span>
        </button>
      </div>
    </div>
  );
}
