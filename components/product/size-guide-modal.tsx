"use client";

import { X } from "lucide-react";
import { product } from "@/data/product";
import { useSelection } from "@/components/providers/selection-provider";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function SizeGuideModal() {
  const {
    sizeGuideOpen,
    closeSizeGuide,
    selectedSize,
    selectSize,
  } = useSelection();

  return (
    <Dialog
      open={sizeGuideOpen}
      onClose={closeSizeGuide}
      title="AFTERFORM 001 size guide"
      variant="modal"
      className="max-w-2xl"
    >
      <div className="flex max-h-[calc(100dvh-1.5rem)] flex-col">
        <div className="flex shrink-0 items-start justify-between gap-6 border-b border-graphite/12 px-5 py-5 sm:px-7">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/40">
              AF—01 LAST / UNISEX
            </p>
            <h2 className="mt-2 font-sans text-[24px] font-medium tracking-[-0.04em]">
              Size guide
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSizeGuide}
            aria-label="Close size guide"
            className="grid size-10 shrink-0 place-items-center border border-graphite/15 transition hover:border-graphite hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          <p className="max-w-[50ch] text-[13px] leading-[1.65] text-graphite/60">
            The AF–01 last is close through the midfoot with a roomier toe box.
            The 001 is designed true to size. If you sit between sizes, take the
            larger one.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left sm:min-w-[430px]">
              <caption className="sr-only">
                AFTERFORM 001 size conversions, illustrative values
              </caption>
              <thead>
                <tr className="border-y border-graphite/12 font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/40">
                  <th scope="col" className="py-2.5 pr-3 font-normal">
                    US
                  </th>
                  <th scope="col" className="py-2.5 pr-3 font-normal">
                    UK
                  </th>
                  <th scope="col" className="py-2.5 pr-3 font-normal">
                    EU
                  </th>
                  <th scope="col" className="py-2.5 pr-3 font-normal">
                    CM
                  </th>
                  <th scope="col" className="hidden py-2.5 text-right font-normal sm:table-cell">
                    <span className="sr-only">Select size</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.sizes.map((variant) => (
                  <tr
                    key={variant.us}
                    className={cn(
                      "border-b border-graphite/8 transition",
                      selectedSize === variant.us && "bg-acid/15",
                    )}
                  >
                    <th
                      scope="row"
                      className="py-2.5 pr-3 font-sans text-[13px] font-medium"
                    >
                      {variant.us}
                    </th>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-graphite/55">
                      {variant.uk}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-graphite/55">
                      {variant.eu}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-graphite/55">
                      {variant.cm}
                    </td>
                    <td className="hidden py-2.5 text-right sm:table-cell">
                      <button
                        type="button"
                        onClick={() => {
                          selectSize(variant.us);
                          closeSizeGuide();
                        }}
                        className="min-h-8 px-3 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/50 underline decoration-graphite/20 underline-offset-4 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 border border-graphite/12 bg-paper p-4">
            <p className="font-mono text-[8px] uppercase leading-[1.7] tracking-[0.12em] text-graphite/40">
              Illustrative conversions and fit notes. This concept release has
              no verified production measurements. Measure a pair you own
              heel-to-toe for reference.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
