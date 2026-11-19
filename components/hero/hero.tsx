"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { assets } from "@/data/assets";
import { campaign } from "@/data/campaign";
import { product } from "@/data/product";
import { useDrop } from "@/components/providers/drop-provider";
import { Countdown } from "@/components/hero/countdown";
import { ButtonLink } from "@/components/ui/button";
import { EditionSeal } from "@/components/ui/edition-seal";
import { cn } from "@/lib/utils";

export function Hero() {
  const { phase, statusLabel, previewSoldOut } = useDrop();
  const reducedMotion = useReducedMotion();

  const primaryHref = phase === "live" ? "#acquire" : "#waitlist";
  const primaryLabel =
    phase === "live"
      ? campaign.hero.primaryCta
      : phase === "upcoming"
        ? "JOIN THE DROP LIST"
        : "JOIN THE NEXT DROP";

  const fade = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink text-ivory"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-[18%] z-0 select-none font-display text-[38vw] leading-none text-white/[0.018]"
      >
        001
      </span>

      <div className="absolute inset-0 z-0 lg:left-auto lg:w-[47%]">
        <motion.div
          initial={reducedMotion ? false : { scale: 1.045 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={assets.hero.src}
            alt={assets.hero.alt}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 47vw"
            className="object-cover object-[58%_28%] lg:object-[56%_38%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10 lg:bg-gradient-to-r lg:from-ink lg:via-ink/20 lg:to-transparent" />
        <div className="absolute inset-0 bg-ink/28 lg:bg-ink/5" />

        <div className="absolute left-6 top-8 z-10 hidden items-center gap-2.5 lg:flex">
          <span aria-hidden="true" className="h-px w-8 bg-acid" />
          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-ivory/65">
            {campaign.hero.imageCaption}
          </span>
        </div>

        <div className="absolute inset-x-6 bottom-6 z-10 hidden items-end justify-between gap-6 border-t border-white/20 pt-4 lg:flex">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
              CAMPAIGN STUDY — REFERENCE IMAGERY
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ivory/80">
              AF—001 / GRAPHITE — CHALK
            </p>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/35">
            FRAME 01 — 04
          </span>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-6 top-8 z-10 hidden lg:block"
        >
          <EditionSeal theme="light" className="size-[122px]" />
        </motion.div>
      </div>

      <div className="container-editorial relative z-10 flex min-h-[calc(100svh-var(--header-height)-var(--announcement-height)-var(--mobile-buy-bar-height))] flex-col pb-5 pt-6 sm:pb-6 sm:pt-7 lg:min-h-[calc(100svh-var(--header-height)-var(--announcement-height))] lg:pb-6 lg:pt-6">
        <motion.div
          {...fade}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between gap-6 border-b border-white/14 pb-4"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/50">
              {campaign.hero.eyebrow}
            </span>
            {previewSoldOut ? (
              <span className="border border-acid/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-acid">
                Sold-out preview
              </span>
            ) : null}
          </div>
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/35 sm:block">
            {campaign.drop.displayDate} / PROPOSED {campaign.drop.editionSize} PAIRS
          </span>
        </motion.div>

        <div className="flex flex-1 flex-col justify-end pb-3 pt-[4vh] sm:pt-[5vh] lg:w-[60%] lg:pb-3 lg:pt-[1vh]">
          <motion.div
            {...fade}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6"
          >
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/65">
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  phase === "live" ? "bg-acid" : "bg-ivory/45",
                )}
              />
              {statusLabel} / RELEASE 001
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-white/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/40">
              {product.colorway}
            </span>
          </motion.div>

          <h1
            id="hero-title"
            className="display text-[clamp(4.2rem,7.5vw,9.4rem)] leading-[0.8] tracking-[-0.022em]"
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={reducedMotion ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                FORM
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={reducedMotion ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                FOLLOWS
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="text-outline-acid block"
                initial={reducedMotion ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                NOTHING.
              </motion.span>
            </span>
          </h1>

          <motion.div
            {...fade}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[34rem] sm:mt-6"
          >
            <p className="text-[13px] leading-[1.65] text-ivory/62 sm:text-[14px]">
              {campaign.hero.description}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <ButtonLink
                href={primaryHref}
                variant="acid"
                size="large"
                className="w-full justify-between sm:w-auto sm:min-w-[220px]"
              >
                {primaryLabel}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <a
                href="#inspect"
                className="group hidden min-h-11 items-center gap-3 self-start font-mono text-[10px] uppercase tracking-[0.14em] text-ivory/65 transition hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid sm:inline-flex"
              >
                {campaign.hero.secondaryCta}
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-full border border-ivory/20 transition group-hover:border-acid group-hover:text-acid"
                >
                  <ArrowDown className="size-3.5" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fade}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/14 pt-4 lg:w-[47%]"
        >
          <Countdown className="max-w-[360px]" />
        </motion.div>
      </div>

      <a
        href="#inspect"
        aria-label="Scroll to inspect AFTERFORM 001"
        className="absolute bottom-8 right-5 z-10 hidden -rotate-90 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-ivory/30 transition hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid xl:flex"
      >
        SCROLL / INSPECT
        <span aria-hidden="true" className="h-px w-10 bg-current" />
      </a>
    </section>
  );
}
