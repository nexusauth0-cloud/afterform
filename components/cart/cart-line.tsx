"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { assets } from "@/data/assets";
import { product } from "@/data/product";
import {
  getLineTotal,
  getSizeVariant,
  getStockForSize,
} from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/providers/cart-provider";
import type { CartLine } from "@/types";

interface CartLineItemProps {
  line: CartLine;
}

export function CartLineItem({ line }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const variant = getSizeVariant(line.size);
  const stock = getStockForSize(line.size);

  return (
    <li className="flex gap-4 py-5">
      <div className="relative h-[116px] w-[88px] shrink-0 overflow-hidden bg-graphite/8">
        <Image
          src={assets.acquire.src}
          alt={`AFTERFORM 001, ${product.colorway} — reference product study`}
          fill
          sizes="88px"
          className="object-cover"
          style={{ filter: "grayscale(0.4) contrast(1.02)" }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] bg-acid"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans text-[13px] font-medium leading-tight tracking-[-0.02em]">
              {product.name}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.12em] text-graphite/45">
              {product.colorway}
              {variant
                ? ` / US ${variant.us} / UK ${variant.uk} / EU ${variant.eu}`
                : null}
            </p>
            <p className="mt-1 font-mono text-[7px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/35">
              {stock} demo pairs available
            </p>
          </div>
          <p className="shrink-0 font-mono text-[11px] tabular text-graphite/70">
            {formatPrice(getLineTotal(line), product.currency)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex items-center border border-graphite/18">
            <button
              type="button"
              onClick={() => updateQuantity(line.size, line.quantity - 1)}
              disabled={line.quantity <= 1}
              aria-label={`Decrease quantity for US ${line.size}`}
              className="grid size-8 place-items-center text-graphite/55 transition hover:bg-graphite hover:text-ivory disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Minus aria-hidden="true" className="size-3" />
            </button>
            <span
              aria-live="polite"
              className="grid min-w-8 place-items-center border-x border-graphite/18 py-1.5 font-mono text-[9px] tabular"
            >
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(line.size, line.quantity + 1)}
              disabled={line.quantity >= stock}
              aria-label={`Increase quantity for US ${line.size}`}
              className="grid size-8 place-items-center text-graphite/55 transition hover:bg-graphite hover:text-ivory disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Plus aria-hidden="true" className="size-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(line.size)}
            className="inline-flex min-h-8 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-graphite/40 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Trash2 aria-hidden="true" className="size-3" strokeWidth={1.6} />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
