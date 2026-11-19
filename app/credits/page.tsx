import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import { imageCredits } from "@/data/assets";
import { SectionLabel } from "@/components/ui/section-label";

const creditsTitle = "Credits & sources — AFTERFORM";
const creditsDescription =
  "Image, font, data and commerce notes for the AFTERFORM 001 independent footwear concept.";

export const metadata: Metadata = {
  title: "Credits & sources",
  description: creditsDescription,
  alternates: { canonical: "/credits" },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "/credits",
    siteName: "AFTERFORM",
    title: creditsTitle,
    description: creditsDescription,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "AFTERFORM 001 — Form Follows Nothing concept campaign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: creditsTitle,
    description: creditsDescription,
    images: ["/opengraph-image.jpg"],
  },
};

interface CreditGroup {
  source: string;
  license: string;
  src: string;
  alt: string;
  keys: string[];
}

const groups = imageCredits.reduce<Record<string, CreditGroup>>(
  (accumulator, asset) => {
    const existing = accumulator[asset.source];
    if (existing) {
      existing.keys.push(asset.key);
      return accumulator;
    }
    accumulator[asset.source] = {
      source: asset.source,
      license: asset.license,
      src: asset.src,
      alt: asset.alt,
      keys: [asset.key],
    };
    return accumulator;
  },
  {},
);

const creditGroups = Object.values(groups);

const fontCredits = [
  {
    name: "Anton",
    use: "Display",
    license: "SIL Open Font License 1.1",
    href: "https://fonts.google.com/specimen/Anton",
  },
  {
    name: "Archivo",
    use: "Interface / body",
    license: "SIL Open Font License 1.1",
    href: "https://fonts.google.com/specimen/Archivo",
  },
  {
    name: "IBM Plex Mono",
    use: "Labels / technical",
    license: "SIL Open Font License 1.1",
    href: "https://fonts.google.com/specimen/IBM+Plex+Mono",
  },
];

export default function CreditsPage() {
  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="container-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite/12 pb-4">
          <SectionLabel index="INFO">Credits & sources</SectionLabel>
          <Link
            href="/"
            className="inline-flex min-h-9 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/45 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-3" />
            Return to release
          </Link>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h1 className="display text-[clamp(3.2rem,7.5vw,8rem)] leading-[0.9] tracking-[-0.018em]">
              CREDITS
              <br />
              <span className="text-outline-graphite">SOURCES.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4">
            <p className="max-w-[40ch] text-[13px] leading-[1.7] text-graphite/60">
              AFTERFORM is a fictional independent footwear concept — not a
              registered company. These notes disclose the reference
              photography, typefaces and demo data used in this build.
            </p>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.13em] text-graphite/35">
              BUILD / NOVEMBER 2026 / RELEASE 001
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-graphite/15 pt-4">
              <div>
                <dt className="font-mono text-[7px] uppercase tracking-[0.12em] text-graphite/40">
                  Proposed campaign edition
                </dt>
                <dd className="mt-1 font-sans text-[15px] font-medium tracking-[-0.03em]">
                  300 pairs
                </dd>
                <dd className="mt-0.5 text-[10px] leading-[1.5] text-graphite/45">
                  Fictional premise
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[7px] uppercase tracking-[0.12em] text-graphite/40">
                  Frontend demo allocation
                </dt>
                <dd className="mt-1 font-sans text-[15px] font-medium tracking-[-0.03em]">
                  42 pairs
                </dd>
                <dd className="mt-0.5 text-[10px] leading-[1.5] text-graphite/45">
                  Illustrative UI state
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-graphite/12 pt-6">
          <h2 className="font-sans text-[22px] font-medium tracking-[-0.04em]">
            Reference photography
          </h2>
          <p className="mt-3 max-w-[78ch] text-[12px] leading-[1.7] text-graphite/55">
            All photographs were downloaded from Unsplash and are used under the{" "}
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noreferrer noopener"
              className="underline decoration-graphite/25 underline-offset-2 transition hover:text-graphite"
            >
              Unsplash License
            </a>
            . They show third-party footwear and locations. They are not
            photographs of a manufactured AFTERFORM product, and no affiliation
            with any depicted brand is claimed.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {creditGroups.map((group, index) => (
              <article
                key={group.source}
                className="border border-graphite/12 bg-paper p-3"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-graphite/10">
                  <Image
                    src={group.src}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 100vw, 30vw"
                    className="object-cover grayscale"
                  />
                  <span className="absolute left-2 top-2 bg-ink/70 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-ivory">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em] text-graphite/45">
                      {group.keys.join(" / ")}
                    </p>
                    <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-graphite/30">
                      {group.license}
                    </p>
                  </div>
                  <a
                    href={group.source}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View source for image ${index + 1} on Unsplash`}
                    className="grid size-7 shrink-0 place-items-center border border-graphite/15 text-graphite/45 transition hover:border-graphite hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                  </a>
                </div>
          </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-graphite/12 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-sans text-[22px] font-medium tracking-[-0.04em]">
              Typography
            </h2>
            <p className="mt-3 max-w-[52ch] text-[12px] leading-[1.7] text-graphite/55">
              Self-hosted WOFF2 files, loaded through Next.js font optimization.
            </p>
            <ul className="mt-4 border-t border-graphite/12">
              {fontCredits.map((font) => (
                <li
                  key={font.name}
                  className="flex items-start justify-between gap-4 border-b border-graphite/10 py-3"
                >
                  <div>
                    <p className="font-sans text-[13px] font-medium tracking-[-0.02em]">
                      {font.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-graphite/40">
                      {font.use} / {font.license}
                    </p>
                  </div>
                  <a
                    href={font.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-8 shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-graphite/45 underline decoration-graphite/20 underline-offset-4 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Source
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-sans text-[22px] font-medium tracking-[-0.04em]">
              Data & commerce boundary
            </h2>
            <div className="mt-3 grid gap-3">
              {[
                {
                  label: "PRODUCT",
                  body: "AFTERFORM 001 is a fictional design study. Specifications, mass, materials, fit and construction notes are illustrative targets, not a verified production datasheet.",
                },
                {
                  label: "EDITION VS INVENTORY",
                  body: "The proposed campaign edition is 300 numbered pairs — a fictional premise, not a production run or warehouse stock. Frontend availability is a separate 42-pair demo allocation used to exercise available, low-stock and sold-out states. There is no warehouse connection or live inventory.",
                },
                {
                  label: "PRICE & PROMO",
                  body: "The €285 price is illustrative. The FORM10 preview code takes 10% off the subtotal. Shipping rates and delivery estimates are illustrative. No sales, customer demand or order volume is represented.",
                },
                {
                  label: "CHECKOUT",
                  body: "When STRIPE_SECRET_KEY is configured, the server creates a Stripe Checkout session and redirects. The checkout return page reports a payment only when the Stripe API returns payment_status=paid. This concept build does not create, store or fulfil orders.",
                },
                {
                  label: "WAITLIST",
                  body: "The waitlist uses Resend or a webhook when configured. Without either, the API returns an explicit demo response and does not store the submitted address.",
                },
                {
                  label: "REFERENCE IMAGERY",
                  body: "Photography is licensed from Unsplash for art direction. Replacing the local files in /public/images with original product photography is required before any commercial use.",
                },
              ].map((note) => (
                <div
                  key={note.label}
                  className="border border-graphite/12 bg-paper p-4"
                >
                  <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-graphite/40">
                    {note.label}
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.65] text-graphite/58">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-start gap-3 border border-graphite/15 bg-acid/15 p-4">
          <Info
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-graphite/55"
            strokeWidth={1.6}
          />
          <p className="max-w-[92ch] font-mono text-[8px] uppercase leading-[1.8] tracking-[0.1em] text-graphite/50">
            No affiliation with any footwear brand, payment provider, font
            foundry or photographer is claimed. AFTERFORM is not a registered
            company. Its name, campaign copy, proposed edition and product
            concept are fictional and presented for design demonstration.
          </p>
        </div>
      </div>
    </section>
  );
}
