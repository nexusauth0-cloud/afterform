"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { campaign } from "@/data/campaign";
import { useCart } from "@/components/providers/cart-provider";
import { useDrop } from "@/components/providers/drop-provider";
import { Logo } from "@/components/ui/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

const sectionIds = ["acquire", "inspect", "story", "tech-file", "lookbook"];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totals, openCart } = useCart();
  const { phase, statusLabel } = useDrop();
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-38% 0px -56% 0px", threshold: 0 },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handleOpenCart = useCallback(() => {
    setMenuOpen(false);
    openCart();
  }, [openCart]);

  const statusDot =
    phase === "live"
      ? "bg-acid"
      : phase === "sold_out"
        ? "bg-graphite"
        : "bg-silver";

  return (
    <>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-500",
          scrolled
            ? "border-graphite/12 bg-ivory/95 shadow-[0_1px_0_rgba(23,24,23,0.03)] backdrop-blur-xl"
            : "border-graphite/10 bg-ivory/86 backdrop-blur-xl",
        )}
      >
        <div className="container-editorial flex h-[var(--header-height)] items-center justify-between gap-4">
          <Logo href="/#top" compact className="shrink-0" />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {campaign.navigation.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "group relative flex h-11 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4",
                    active ? "text-graphite" : "text-graphite/50 hover:text-graphite",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1 transition-colors",
                      active ? "bg-acid" : "bg-transparent",
                    )}
                  />
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-[1px] left-0 h-px bg-graphite transition-[width] duration-500",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-5">
            <div
              className="hidden items-center gap-2 sm:flex"
              aria-label={`Drop status: ${statusLabel}`}
            >
              <span
                aria-hidden="true"
                className={cn("size-1.5 rounded-full", statusDot)}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/65">
                {statusLabel}
              </span>
            </div>

            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-graphite/15 sm:block"
            />

            <button
              type="button"
              onClick={handleOpenCart}
              aria-label={`Open bag, ${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"}`}
              className="group flex h-11 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <ShoppingBag
                aria-hidden="true"
                className="size-[17px] text-graphite transition-colors group-hover:text-graphite/60"
                strokeWidth={1.5}
              />
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-graphite/65 transition group-hover:text-graphite md:inline">
                Bag
              </span>
              <span
                className={cn(
                  "grid min-w-6 place-items-center px-1 py-1 font-mono text-[9px] leading-none tabular transition-colors",
                  totals.itemCount > 0
                    ? "bg-graphite text-ivory"
                    : "border border-graphite/20 text-graphite/55",
                )}
              >
                {String(totals.itemCount).padStart(2, "0")}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-acid"
          transition={{ duration: reducedMotion ? 0 : 0.1 }}
        />
      </header>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={closeMenu} />
      </div>
    </>
  );
}
