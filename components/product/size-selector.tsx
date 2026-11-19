"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { product } from "@/data/product";
import { getStockForSize, getStockStatus } from "@/lib/cart";
import { useSelection } from "@/components/providers/selection-provider";
import { cn } from "@/lib/utils";

export function SizeSelector() {
  const { selectedSize, selectSize, openSizeGuide } = useSelection();
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/45">
            Select size / US
          </p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/35">
            UK + EU conversions shown below
          </p>
        </div>
        <button
          type="button"
          onClick={openSizeGuide}
          className="min-h-10 shrink-0 border-b border-graphite/30 pb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/70 transition hover:border-graphite hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Size guide
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/40">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-graphite" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-acid ring-1 ring-graphite/20" />
          Low stock
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full border border-graphite/25" />
          Unavailable
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {product.sizes.map((variant) => {
          const stock = getStockForSize(variant.us);
          const status = getStockStatus(stock);
          const selected = selectedSize === variant.us;
          const disabled = status === "out";

          return (
            <motion.button
              key={variant.us}
              type="button"
              disabled={disabled}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              onClick={() => selectSize(variant.us)}
              aria-pressed={selected}
              aria-label={`US ${variant.us}, UK ${variant.uk}, EU ${variant.eu}${
                disabled
                  ? ", unavailable"
                  : status === "low"
                    ? `, low stock, ${stock} pairs remaining`
                    : ", available"
              }`}
              className={cn(
                "group relative flex min-h-[72px] flex-col justify-between overflow-hidden border p-2.5 text-left transition-[background-color,border-color,color,opacity] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
                selected
                  ? "border-graphite bg-graphite text-ivory"
                  : "border-graphite/18 bg-transparent text-graphite hover:border-graphite/60",
                disabled &&
                  "cursor-not-allowed border-graphite/10 bg-graphite/[0.025] text-graphite/30 hover:border-graphite/10",
              )}
            >
              <span className="flex w-full items-start justify-between gap-2">
                <span className="font-sans text-[18px] font-medium leading-none tracking-[-0.04em]">
                  {variant.us}
                </span>
                {selected ? (
                  <Check
                    aria-hidden="true"
                    className="size-3 text-acid"
                    strokeWidth={2}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 size-1.5 rounded-full",
                      status === "available" && "bg-graphite/70",
                      status === "low" && "bg-acid ring-1 ring-graphite/20",
                      status === "out" && "border border-graphite/20",
                    )}
                  />
                )}
              </span>
              <span
                className={cn(
                  "mt-2 block font-mono text-[8px] uppercase leading-[1.5] tracking-[0.08em]",
                  selected ? "text-ivory/50" : "text-graphite/40",
                  disabled && "line-through decoration-graphite/25",
                )}
              >
                UK {variant.uk} / EU {variant.eu}
              </span>
              {status === "low" && !selected ? (
                <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-graphite/45">
                  Low / {stock}
                </span>
              ) : null}
              {disabled ? (
                <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-graphite/30">
                  Unavailable
                </span>
              ) : null}
              {selected ? (
                <motion.span
                  layoutId={reducedMotion ? undefined : "size-selection-bar"}
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-acid"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
