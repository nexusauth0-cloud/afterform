"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { product } from "@/data/product";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export function ProductInspector() {
  const frames = product.inspectionFrames;
  const [frameIndex, setFrameIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeHotspotId, setActiveHotspotId] = useState(
    frames[0].hotspots[0]?.id ?? "",
  );
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const frame = frames[frameIndex];
  const activeHotspot =
    frame.hotspots.find((hotspot) => hotspot.id === activeHotspotId) ??
    frame.hotspots[0];

  const goToFrame = useCallback(
    (nextIndex: number, nextDirection: number) => {
      const normalized =
        ((nextIndex % frames.length) + frames.length) % frames.length;
      setDirection(nextDirection);
      setFrameIndex(normalized);
      setActiveHotspotId(frames[normalized].hotspots[0]?.id ?? "");
    },
    [frames],
  );

  const goNext = useCallback(
    () => goToFrame(frameIndex + 1, 1),
    [frameIndex, goToFrame],
  );
  const goPrevious = useCallback(
    () => goToFrame(frameIndex - 1, -1),
    [frameIndex, goToFrame],
  );

  function handleDragEnd(_event: unknown, info: PanInfo) {
    if (info.offset.x < -56) goNext();
    else if (info.offset.x > 56) goPrevious();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  }

  return (
    <section
      id="inspect"
      aria-labelledby="inspect-title"
      className="relative overflow-hidden bg-ivory py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-graphite/10"
      />
      <div className="container-editorial">
        <Reveal>
          <SectionLabel index="02">Object study</SectionLabel>
        </Reveal>

        <div className="mt-7 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <h2
              id="inspect-title"
              className="display text-[clamp(3rem,6.7vw,7.2rem)] leading-[0.9] tracking-[-0.018em]"
            >
              NOT A<br />
              SILHOUETTE.
              <br />
              <span className="text-outline-graphite">A SECTION.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-[40ch] text-[14px] leading-[1.7] text-graphite/65">
              Four studies, one object. Drag between frames, open the
              annotations, and read the construction logic of the 001. Every
              line is a consequence; every absence is deliberate.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink
                href="#acquire"
                variant="outlineDark"
                size="compact"
                className="justify-between gap-8"
              >
                Select your size
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </ButtonLink>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/40">
                {formatPrice(product.priceCents, product.currency)} / EDITION{" "}
                {product.editionSize}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-8">
            <Reveal>
              <div
                ref={stageRef}
                role="group"
                aria-roledescription="carousel"
                aria-label="AFTERFORM 001 campaign studies"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="group/stage relative flex aspect-[4/5] w-full select-none items-center justify-center overflow-hidden bg-[#d8d6cc] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite sm:aspect-[5/4] lg:aspect-auto lg:h-[clamp(34rem,51vw,45rem)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(23,24,23,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,24,23,0.08) 1px, transparent 1px)",
                    backgroundSize: "25% 100%, 100% 25%",
                  }}
                />

                <div className="absolute inset-x-4 top-4 z-20 flex items-start justify-between gap-4 sm:inset-x-5 sm:top-5">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 bg-graphite" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/70">
                      {frame.label} / 0{frameIndex + 1}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/45">
                    REFERENCE STUDY
                  </span>
                </div>

                <div className="relative h-full w-auto max-w-full shrink-0 aspect-[4/5]">
                  <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.figure
                      key={frame.id}
                      custom={direction}
                      initial={
                        reducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, x: direction * 34 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        reducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: direction * -34 }
                      }
                      transition={{
                        duration: reducedMotion ? 0.01 : 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      drag={reducedMotion ? false : "x"}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.08}
                      dragMomentum={false}
                      onDragEnd={handleDragEnd}
                      className="absolute inset-0 m-0 cursor-grab active:cursor-grabbing"
                    >
                      <Image
                        src={frame.image}
                        alt={frame.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 1023px) 80vw, 40vw"
                        className="pointer-events-none object-cover"
                        style={{ filter: "grayscale(0.72) contrast(1.03) brightness(0.99)" }}
                      />

                      {frame.hotspots.map((hotspot, index) => (
                        <button
                          key={hotspot.id}
                          type="button"
                          onClick={() => setActiveHotspotId(hotspot.id)}
                          onPointerDownCapture={(event) => event.stopPropagation()}
                          aria-label={`Annotation ${index + 1}: ${hotspot.label}`}
                          aria-pressed={activeHotspot?.id === hotspot.id}
                          style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                          }}
                          className={cn(
                            "absolute z-20 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-mono text-[9px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
                            activeHotspot?.id === hotspot.id
                              ? "scale-110 border-acid bg-acid text-ink"
                              : "border-ivory/70 bg-ink/75 text-ivory backdrop-blur-sm hover:border-acid hover:text-acid",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                          <span className="sr-only">{hotspot.title}</span>
                        </button>
                      ))}
                    </motion.figure>
                  </AnimatePresence>
                </div>

                <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                  <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/50">
                    <ArrowLeft aria-hidden="true" className="size-3" />
                    <span className="hidden sm:inline">Drag / arrow keys</span>
                    <span className="sm:hidden">Drag</span>
                    <ArrowRight aria-hidden="true" className="size-3" />
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrevious}
                      aria-label="Previous study"
                      className="grid size-9 place-items-center border border-graphite/25 text-graphite transition hover:border-graphite hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <ArrowLeft aria-hidden="true" className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Next study"
                      className="grid size-9 place-items-center border border-graphite/25 text-graphite transition hover:border-graphite hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="crosshair absolute left-3 top-1/2 hidden size-4 -translate-y-1/2 text-graphite/40 sm:block"
                />
                <span
                  aria-hidden="true"
                  className="crosshair absolute right-3 top-1/2 hidden size-4 -translate-y-1/2 text-graphite/40 sm:block"
                />
              </div>
            </Reveal>

            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="max-w-[58ch] font-mono text-[8px] uppercase leading-[1.7] tracking-[0.1em] text-graphite/40">
                Reference campaign imagery — not production photography.
                Annotations are illustrative design notes.
              </p>
              <p aria-live="polite" className="sr-only">
                Study {frameIndex + 1} of {frames.length}: {frame.label}.{" "}
                {frame.caption}
              </p>
              <span className="shrink-0 font-mono text-[9px] tracking-[0.12em] text-graphite/40">
                {String(frameIndex + 1).padStart(2, "0")} /{" "}
                {String(frames.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2">
              {frames.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToFrame(index, index > frameIndex ? 1 : -1)}
                  aria-label={`View study ${index + 1}: ${item.label}`}
                  aria-pressed={frameIndex === index}
                  className={cn(
                    "group relative aspect-[4/3] overflow-hidden border transition focus-visible:outline-2 focus-visible:outline-offset-2",
                    frameIndex === index
                      ? "border-graphite"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="20vw"
                    className="object-cover grayscale transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-[2px]",
                      frameIndex === index ? "bg-acid" : "bg-transparent",
                    )}
                  />
                  <span className="absolute left-1.5 top-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ivory drop-shadow">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <div className="border-t border-graphite/15 pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-graphite/45">
                  FRAME {String(frameIndex + 1).padStart(2, "0")} / {frame.label}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-graphite/35">
                  AF—001
                </span>
              </div>
              <h3 className="mt-5 font-sans text-[clamp(1.65rem,2.6vw,2.25rem)] font-medium leading-[1.03] tracking-[-0.04em] text-graphite">
                {frame.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-[13px] leading-[1.7] text-graphite/60">
                {frame.caption}
              </p>

              <div className="mt-7 border-t border-graphite/12 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/45">
                    Annotations
                  </span>
                  <span className="font-mono text-[9px] text-graphite/30">
                    {String(frame.hotspots.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 divide-y divide-graphite/10">
                  {frame.hotspots.map((hotspot, index) => {
                    const active = activeHotspot?.id === hotspot.id;
                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(hotspot.id)}
                        aria-pressed={active}
                        className="group flex w-full items-start gap-3 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-5 shrink-0 place-items-center border font-mono text-[8px] transition",
                            active
                              ? "border-acid bg-acid text-ink"
                              : "border-graphite/20 text-graphite/45 group-hover:border-graphite",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block font-mono text-[9px] uppercase tracking-[0.14em] transition",
                              active
                                ? "text-graphite"
                                : "text-graphite/50 group-hover:text-graphite",
                            )}
                          >
                            {hotspot.label}
                          </span>
                          <span className="mt-1 block text-[12px] leading-[1.55] text-graphite/50">
                            {hotspot.title}
                          </span>
                        </span>
                        <Plus
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 size-3.5 shrink-0 transition",
                            active
                              ? "rotate-45 text-graphite"
                              : "text-graphite/30",
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeHotspot?.id ?? "empty"}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 border border-graphite/12 bg-paper p-5"
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-graphite/40">
                    {activeHotspot?.label}
                  </span>
                  <h4 className="mt-2 font-sans text-[17px] font-medium leading-[1.15] tracking-[-0.02em]">
                    {activeHotspot?.title}
                  </h4>
                  <p className="mt-2.5 text-[12px] leading-[1.65] text-graphite/55">
                    {activeHotspot?.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex items-end justify-between gap-4 border-t border-graphite/12 pt-5">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-graphite/40">
                    EDITION 001 / {product.editionSize}
                  </p>
                  <p className="mt-1 font-sans text-[20px] font-medium tracking-[-0.04em]">
                    {formatPrice(product.priceCents, product.currency)}
                  </p>
                </div>
                <ButtonLink
                  href="#acquire"
                  variant="ink"
                  size="compact"
                  className="gap-6"
                >
                  Acquire
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </ButtonLink>
              </div>
            </div>

            <div className="mt-8 border-t border-graphite/12 pt-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-graphite/40">
                Material register
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {product.materials.slice(0, 4).map((material, index) => (
                  <li
                    key={material}
                    className="flex items-baseline gap-2 border-b border-graphite/8 py-2 text-[11px] leading-snug text-graphite/55"
                  >
                    <span className="font-mono text-[8px] text-graphite/30">
                      M{index + 1}
                    </span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
