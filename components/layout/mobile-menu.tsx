"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { Logo } from "@/components/ui/logo";
import { ArrowUpRight, X } from "lucide-react";
import { campaign } from "@/data/campaign";
import { useDrop } from "@/components/providers/drop-provider";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { statusLabel, phase } = useDrop();
  const { totals, openCart } = useCart();

  const closeAndCall = useCallback(
    (callback: () => void) => {
      onClose();
      window.setTimeout(callback, 180);
    },
    [onClose],
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Navigation"
      variant="full"
      className="bg-ink text-ivory"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/12 px-5 sm:px-8">
          <Logo theme="light" href="/#top" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center border border-white/20 text-ivory transition hover:border-acid hover:text-acid"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8">
          <div className="flex items-center gap-3 pb-7">
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 rounded-full",
                phase === "live"
                  ? "bg-acid"
                  : phase === "sold_out"
                    ? "bg-ivory/60"
                    : "bg-silver",
              )}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/55">
              {statusLabel} / 001
            </span>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="border-t border-white/12">
              {campaign.navigation.map((item, index) => (
                <li key={item.href} className="border-b border-white/12">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid"
                  >
                    <span className="display text-[clamp(2.6rem,12vw,4.5rem)] leading-[0.85] text-ivory transition-colors group-hover:text-acid">
                      {item.label}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[9px] tracking-[0.14em] text-ivory/30">
                        0{index + 1}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-ivory/30 transition group-hover:text-acid"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-9 grid gap-6">
            <button
              type="button"
              onClick={() => closeAndCall(openCart)}
              className="flex min-h-12 items-center justify-between border border-white/20 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ivory transition hover:border-acid hover:text-acid"
            >
              <span>Open bag</span>
              <span className="text-acid">
                {String(totals.itemCount).padStart(2, "0")}
              </span>
            </button>
            <Link
              href="/#waitlist"
              onClick={onClose}
              className="flex min-h-12 items-center justify-between bg-acid px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
            >
              <span>Join the waitlist</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/12 px-5 py-5 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/40 sm:px-8">
          <span>Independent footwear study</span>
          <span>© 2026</span>
        </div>
      </div>
    </Dialog>
  );
}
