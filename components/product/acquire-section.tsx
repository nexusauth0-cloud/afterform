"use client";

import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import { assets } from "@/data/assets";
import { campaign } from "@/data/campaign";
import { DEMO_ALLOCATION } from "@/data/inventory";
import { product } from "@/data/product";
import { getStockForSize, getStockStatus } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { useDrop } from "@/components/providers/drop-provider";
import { useSelection } from "@/components/providers/selection-provider";
import { useToast } from "@/components/providers/toast-provider";
import { Countdown } from "@/components/hero/countdown";
import { SizeSelector } from "@/components/product/size-selector";
import { Button, ButtonLink } from "@/components/ui/button";
import { EditionSeal } from "@/components/ui/edition-seal";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const facts = [
  { label: "UPPER", value: product.upper },
  { label: "CORE", value: product.sole },
  { label: "MASS", value: product.weight },
  { label: "LAST", value: product.fit },
];

export function AcquireSection() {
  const { phase, statusLabel, unitsRemaining, previewSoldOut } = useDrop();
  const { selectedSize, selectedVariant } = useSelection();
  const { addItem, openCart } = useCart();
  const { push } = useToast();

  const selectedStock = selectedSize ? getStockForSize(selectedSize) : 0;
  const selectedStatus = getStockStatus(selectedStock);

  function focusSizeSelector() {
    const selector = document.getElementById("size-selector");
    selector?.scrollIntoView({ behavior: "smooth", block: "center" });
    const firstAvailable =
      selector?.querySelector<HTMLButtonElement>("button:not([disabled])");
    firstAvailable?.focus({ preventScroll: true });
  }

  function handleAddToBag() {
    if (!selectedSize) {
      push({
        title: "Select a size first",
        description:
          "Choose an available size so we can hold it in your bag.",
        tone: "error",
      });
      focusSizeSelector();
      return;
    }

    if (selectedStatus === "out") {
      push({
        title: "Size unavailable",
        description: `US ${selectedSize} is no longer available in this allocation.`,
        tone: "error",
      });
      focusSizeSelector();
      return;
    }

    const result = addItem(selectedSize);
    push({
      title: result.ok ? `US ${selectedSize} added to bag` : "Could not add",
      description: result.message,
      tone: result.ok ? "success" : "error",
      action: result.ok ? { label: "View bag", onClick: openCart } : undefined,
    });
  }

  return (
    <section
      id="acquire"
      aria-labelledby="acquire-title"
      className="relative overflow-hidden bg-ivory py-20 sm:py-24 lg:py-32"
    >
      <div className="container-editorial">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite/12 pb-4">
          <SectionLabel index="01">Acquire 001</SectionLabel>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {previewSoldOut ? (
              <span className="border border-graphite/25 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/60">
                Sold-out preview
              </span>
            ) : null}
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/50">
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  phase === "live" ? "bg-acid ring-1 ring-graphite/20" : "bg-graphite/35",
                )}
              />
              {previewSoldOut
                ? "SOLD OUT / ARCHIVE PREVIEW"
                : `${statusLabel} / ${unitsRemaining} DEMO PAIRS LOADED`}
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <figure className="group relative aspect-[4/5] overflow-hidden bg-graphite sm:aspect-[5/5] lg:aspect-[4/5]">
                <Image
                  src={assets.acquire.src}
                  alt={assets.acquire.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 56vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  style={{
                    filter: "grayscale(0.32) contrast(1.02) brightness(0.98)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-transparent to-ink/20" />

                <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/70">
                      OBJECT / 001
                    </p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">
                      GRAPHITE / CHALK
                    </p>
                  </div>
                  <span className="flex items-center gap-2 border border-white/20 bg-ink/30 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/70 backdrop-blur-sm">
                    <span aria-hidden="true" className="size-1 bg-acid" />
                    REFERENCE STUDY
                  </span>
                </div>

                <div className="absolute right-5 top-24 hidden sm:block">
                  <EditionSeal theme="light" className="size-[108px]" />
                </div>

                <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-white/20 pt-4">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">
                      CAMPAIGN REFERENCE / NOT PRODUCTION PHOTOGRAPHY
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ivory/80">
                      AF—001 / ONE OBJECT / NO RESTOCK
                    </p>
                  </div>
                  <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/40 sm:block">
                    FRAME 01
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Reveal delay={0.08}>
                <figure className="group relative aspect-[4/3] overflow-hidden bg-graphite">
                  <Image
                    src={assets.core.src}
                    alt={assets.core.alt}
                    fill
                    sizes="(max-width: 1023px) 50vw, 28vw"
                    className="image-warm object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
                  <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/70">
                    <span>CORE / ACID VOID</span>
                    <span className="text-ivory/35">02</span>
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={0.14}>
                <figure className="group relative aspect-[4/3] overflow-hidden bg-graphite">
                  <Image
                    src={assets.shell.src}
                    alt={assets.shell.alt}
                    fill
                    sizes="(max-width: 1023px) 50vw, 28vw"
                    className="image-warm object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
                  <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/70">
                    <span>SHELL / OPEN KNIT</span>
                    <span className="text-ivory/35">03</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/45">
                RELEASE 001 / {campaign.drop.displayDate}
              </p>
              <h2
                id="acquire-title"
                className="display mt-4 text-[clamp(3.1rem,6.5vw,6.8rem)] leading-[0.88] tracking-[-0.018em]"
              >
                ONE OBJECT.
                <br />
                <span className="text-outline-graphite">NO RESTOCK.</span>
              </h2>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-b border-graphite/12 pb-5">
                <div>
                  <p className="font-sans text-[20px] font-medium leading-none tracking-[-0.04em]">
                    {product.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite/45">
                    {product.colorway} / {product.colorwayCode}
                  </p>
                </div>
                <p className="font-sans text-[28px] font-medium leading-none tracking-[-0.05em]">
                  {formatPrice(product.priceCents, product.currency)}
                </p>
              </div>

              <p className="mt-5 max-w-[48ch] text-[13px] leading-[1.7] text-graphite/62">
                {product.description}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="border-t border-graphite/12 pt-2.5">
                    <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/38">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[12px] leading-[1.45] text-graphite/70">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {phase === "live" ? (
                <div className="mt-8 border border-graphite/15 bg-paper">
                  <div className="flex items-start justify-between gap-4 border-b border-graphite/12 p-5">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/45">
                        SELECT SIZE / ADD TO BAG
                      </p>
                      <p className="mt-1 text-[12px] text-graphite/55">
                        Edition 001 / {product.editionSize} numbered pairs
                      </p>
                    </div>
                    <span className="shrink-0 border border-acid bg-acid px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-ink">
                      DROP LIVE
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div id="size-selector">
                      <SizeSelector />
                    </div>

                    <p
                      aria-live="polite"
                      className="mt-4 min-h-5 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.12em] text-graphite/45"
                    >
                      {selectedVariant && selectedSize
                        ? selectedStatus === "low"
                          ? `US ${selectedVariant.us} / UK ${selectedVariant.uk} / EU ${selectedVariant.eu} — only ${selectedStock} pairs left in this demo allocation.`
                          : `US ${selectedVariant.us} / UK ${selectedVariant.uk} / EU ${selectedVariant.eu} — available in the demo allocation.`
                        : "Select a size to continue."}
                    </p>

                    <Button
                      type="button"
                      variant="acid"
                      size="large"
                      onClick={handleAddToBag}
                      className="mt-2 w-full justify-between border border-graphite/10"
                    >
                      <span>
                        {selectedSize
                          ? `ADD US ${selectedSize} TO BAG`
                          : "ADD TO BAG"}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-sans text-[13px] font-medium tracking-[-0.02em]">
                          {formatPrice(product.priceCents, product.currency)}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
                    </Button>

                    <div className="mt-5 grid gap-3 border-t border-graphite/12 pt-4 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/38">
                          DELIVERY / EU
                        </p>
                        <p className="mt-1 text-[11px] leading-[1.5] text-graphite/60">
                          Complimentary tracked delivery. 2–4 working days after
                          dispatch.
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/38">
                          ALLOCATION / DEMO
                        </p>
                        <p className="mt-1 text-[11px] leading-[1.5] text-graphite/60">
                          {DEMO_ALLOCATION} illustrative pairs across 12 sizes.
                          Not live warehouse stock.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 flex items-start gap-2 font-mono text-[8px] uppercase leading-[1.65] tracking-[0.1em] text-graphite/38">
                      <Info
                        aria-hidden="true"
                        className="mt-0.5 size-3 shrink-0"
                        strokeWidth={1.6}
                      />
                      Preview build. Payment is only taken if Stripe is
                      configured; inventory and product specifications are
                      illustrative.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-8 bg-ink p-6 text-ivory sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
                      {phase === "upcoming"
                        ? "DROP OPENS SOON"
                        : phase === "sold_out"
                          ? "ARCHIVE / 001"
                          : "DROP CLOSED"}
                    </p>
                    <span className="shrink-0 border border-white/20 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/55">
                      {statusLabel}
                    </span>
                  </div>

                  {phase === "upcoming" ? (
                    <>
                      <h3 className="display mt-6 text-[clamp(2.6rem,5vw,4rem)] leading-[0.9]">
                        THE DROP
                        <br />
                        <span className="text-outline-ivory">OPENS SOON.</span>
                      </h3>
                      <p className="mt-4 max-w-[36ch] text-[12px] leading-[1.65] text-ivory/55">
                        Release 001 opens {campaign.drop.displayDate} at{" "}
                        {campaign.drop.displayTime}. The countdown runs on your
                        device against the configured release time.
                      </p>
                      <Countdown className="mt-6" />
                      <ButtonLink
                        href="#waitlist"
                        variant="acid"
                        size="large"
                        className="mt-5 w-full justify-between"
                      >
                        Join the drop list
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </ButtonLink>
                    </>
                  ) : (
                    <>
                      <h3 className="display mt-6 text-[clamp(2.6rem,5vw,4rem)] leading-[0.9]">
                        {phase === "sold_out" ? (
                          <>
                            EDITION
                            <br />
                            <span className="text-outline-ivory">ARCHIVED.</span>
                          </>
                        ) : (
                          <>
                            EDITION
                            <br />
                            <span className="text-outline-ivory">CLOSED.</span>
                          </>
                        )}
                      </h3>
                      <p className="mt-4 max-w-[36ch] text-[12px] leading-[1.65] text-ivory/55">
                        {phase === "sold_out"
                          ? "The demo allocation for release 001 is exhausted. No restock is planned. Join the line for the next release and studio dispatches."
                          : "The release window for edition 001 has closed. No restock is planned. Join the line for the next release and studio dispatches."}
                      </p>
                      {previewSoldOut ? (
                        <p className="mt-4 border border-acid/40 px-3 py-2 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.12em] text-acid">
                          Sold-out preview is active. Remove{" "}
                          <span className="text-ivory">?preview=soldout</span>{" "}
                          from the URL to return to the live state.
                        </p>
                      ) : null}
                      <div className="mt-6 grid gap-2">
                        <ButtonLink
                          href="#waitlist"
                          variant="acid"
                          size="large"
                          className="w-full justify-between"
                        >
                          Join the next list
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </ButtonLink>
                        <ButtonLink
                          href="#inspect"
                          variant="outlineLight"
                          className="w-full justify-between"
                        >
                          Inspect the object
                          <ArrowUpRight aria-hidden="true" className="size-4" />
                        </ButtonLink>
                      </div>
                    </>
                  )}
                </div>
              )}

              <p className="mt-4 font-mono text-[8px] uppercase leading-[1.7] tracking-[0.1em] text-graphite/36">
                {product.inventoryNote} {product.specDisclaimer}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
