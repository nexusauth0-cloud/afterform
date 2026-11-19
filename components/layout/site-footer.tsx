import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { campaign } from "@/data/campaign";
import { Logo } from "@/components/ui/logo";

const indexLinks = [
  { label: "Acquire 001", href: "/#acquire" },
  { label: "Inspect the object", href: "/#inspect" },
  { label: "Form / manifesto", href: "/#story" },
  { label: "Technical file", href: "/#tech-file" },
  { label: "Lookbook", href: "/#lookbook" },
  { label: "Waitlist", href: "/#waitlist" },
];

const infoLinks = [
  { label: "Checkout boundary", href: "/checkout" },
  { label: "Image credits", href: "/credits" },
  { label: "Size guide", href: "/#acquire" },
  { label: "Reference imagery", href: "/credits" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite/12 bg-ivory pb-[calc(88px+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="container-editorial py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-[34ch] text-[13px] leading-[1.7] text-graphite/58">
              An independent footwear study in subtraction. One object, one
              edition, released without restock.
            </p>
            <p className="mt-5 font-mono text-[8px] uppercase leading-[1.8] tracking-[0.14em] text-graphite/40">
              Concept label / Release 001
              <br />
              Not a commercial operation
            </p>
          </div>

          <nav
            aria-label="Footer index"
            className="lg:col-span-3 lg:col-start-7"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/40">
              Index
            </p>
            <ul className="mt-4 grid gap-1">
              {indexLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex min-h-9 items-center justify-between gap-3 border-b border-graphite/8 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite/60 transition hover:border-graphite/30 hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 text-graphite/25 transition group-hover:text-acid"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/40">
              Information
            </p>
            <ul className="mt-4 grid gap-1">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex min-h-9 items-center justify-between gap-3 border-b border-graphite/8 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite/60 transition hover:border-graphite/30 hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 text-graphite/25 transition group-hover:text-acid"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[28ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.12em] text-graphite/38">
              Photography is licensed reference imagery, not production
              photography of the concept product.
            </p>
          </div>
        </div>

        <div className="mt-14 border-y border-graphite/12 py-5 sm:mt-20 sm:py-7">
          <p className="display flex items-baseline justify-between gap-4 text-[clamp(3.8rem,14.4vw,14rem)] leading-[0.72] tracking-[-0.025em]">
            <span>AFTERFORM</span>
            <span aria-hidden="true" className="text-acid">
              .
            </span>
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/38">
            © 2026 AFTERFORM / CONCEPT 001
          </p>
          <p className="max-w-[58ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.12em] text-graphite/38">
            {campaign.disclaimer}
          </p>
          <a
            href="#top"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/45 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back to top
            <span className="grid size-7 place-items-center border border-graphite/15 transition group-hover:border-graphite group-hover:bg-graphite group-hover:text-ivory">
              <ArrowUp aria-hidden="true" className="size-3" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
