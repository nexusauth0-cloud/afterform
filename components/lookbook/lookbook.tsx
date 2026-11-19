"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";
import { lookbook } from "@/data/lookbook";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const gridClasses: Record<string, string> = {
  "on-foot": "sm:col-span-7 h-[320px] sm:h-[460px]",
  "field-portrait": "sm:col-span-5 h-[320px] sm:h-[460px]",
  material: "sm:col-span-4 h-[280px] sm:h-[350px]",
  packaging: "sm:col-span-4 h-[280px] sm:h-[350px]",
  studio: "sm:col-span-4 h-[280px] sm:h-[350px]",
  court: "sm:col-span-7 h-[300px] sm:h-[420px]",
  architecture: "sm:col-span-5 h-[300px] sm:h-[420px]",
};

export function Lookbook() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const activeItem = activeIndex !== null ? lookbook[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current - 1 + lookbook.length) % lookbook.length;
    });
  }, []);
  const next = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + 1) % lookbook.length;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, next, previous]);

  return (
    <section
      id="lookbook"
      aria-labelledby="lookbook-title"
      className="relative overflow-hidden bg-ivory py-20 sm:py-24 lg:py-32"
    >
      <div className="container-editorial">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite/12 pb-4">
          <SectionLabel index="05">Lookbook / References</SectionLabel>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/40">
            LICENSED REFERENCE IMAGERY / NOT PRODUCTION PHOTOGRAPHY
          </span>
        </Reveal>

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <h2
              id="lookbook-title"
              className="display text-[clamp(3.3rem,7.6vw,8.4rem)] leading-[0.9] tracking-[-0.018em]"
            >
              FIELD
              <br />
              <span className="text-outline-graphite">NOTES.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-4">
            <p className="max-w-[38ch] text-[13px] leading-[1.7] text-graphite/60">
              A reference archive assembled around the object: street, studio,
              material, structure. Grayscale holds the campaign together; colour
              returns on inspection.
            </p>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.13em] text-graphite/35">
              07 FRAMES / CLICK TO OPEN / ARROW KEYS SUPPORTED
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-12 sm:gap-4">
          {lookbook.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 0.035}
              className={cn(
                "group relative overflow-hidden bg-graphite",
                gridClasses[item.id],
              )}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open lookbook frame ${index + 1}: ${item.title}. ${item.caption}`}
                className="absolute inset-0 h-full w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-acid"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 40vw"
                  className="image-warm object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/25"
                />
                <span className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/65">
                    REF / {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-7 place-items-center border border-white/25 bg-ink/20 text-ivory/60 backdrop-blur-sm transition group-hover:border-acid group-hover:text-acid">
                    <Plus aria-hidden="true" className="size-3.5" />
                  </span>
                </span>
                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 border-t border-white/18 pt-3">
                  <span>
                    <span className="block font-sans text-[15px] font-medium leading-tight tracking-[-0.02em] text-ivory">
                      {item.title}
                    </span>
                    <span className="mt-1 block max-w-[30ch] font-mono text-[7px] uppercase leading-[1.6] tracking-[0.1em] text-ivory/45">
                      {item.caption}
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[7px] uppercase tracking-[0.12em] text-ivory/30 sm:block">
                    VIEW
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[70ch] font-mono text-[8px] uppercase leading-[1.7] tracking-[0.1em] text-graphite/38">
            These are licensed photographs of third-party footwear and locations,
            used as campaign and art-direction references. They are not
            photographs of a manufactured AFTERFORM product.
          </p>
          <a
            href="/credits"
            className="inline-flex min-h-9 items-center gap-2 border-b border-graphite/25 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/55 transition hover:border-graphite hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            View image credits
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </a>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={close}
        title={activeItem ? `Lookbook: ${activeItem.title}` : "Lookbook"}
        variant="full"
        className="bg-ink text-ivory"
      >
        {activeItem ? (
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-white/14 px-4 sm:h-[76px] sm:px-7">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="size-1.5 bg-acid" />
                <p
                  aria-live="polite"
                  className="font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/55"
                >
                  LOOKBOOK / {String((activeIndex ?? 0) + 1).padStart(2, "0")} OF{" "}
                  {String(lookbook.length).padStart(2, "0")}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close lookbook"
                className="grid size-10 place-items-center border border-white/20 text-ivory transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-ink">
              <Image
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />

              <button
                type="button"
                onClick={previous}
                aria-label="Previous lookbook frame"
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/25 bg-ink/55 text-ivory backdrop-blur-sm transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2 sm:left-6"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next lookbook frame"
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/25 bg-ink/55 text-ivory backdrop-blur-sm transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2 sm:right-6"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div className="shrink-0 border-t border-white/14 px-4 py-4 sm:px-7 sm:py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-sans text-[20px] font-medium leading-tight tracking-[-0.03em]">
                    {activeItem.title}
                  </h2>
                  <p className="mt-1 max-w-[62ch] text-[11px] leading-[1.6] text-ivory/50">
                    {activeItem.caption}
                  </p>
                </div>
                <a
                  href={activeItem.source}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-9 shrink-0 items-center gap-2 border-b border-white/25 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/50 transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Source / Unsplash
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </div>
              <p className="mt-3 font-mono text-[7px] uppercase tracking-[0.1em] text-ivory/25">
                Licensed reference imagery / not production photography
              </p>
            </div>
          </div>
        ) : null}
      </Dialog>
    </section>
  );
}
