import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { campaign, siteUrl } from "@/data/campaign";
import { product } from "@/data/product";
import { SiteProviders } from "@/components/providers/site-providers";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { MobileBuyBar } from "@/components/cart/mobile-buy-bar";
import { SizeGuideModal } from "@/components/product/size-guide-modal";

const anton = localFont({
  src: "../public/fonts/anton-latin.woff2",
  variable: "--font-anton",
  weight: "400",
  style: "normal",
  display: "swap",
});

const archivo = localFont({
  src: "../public/fonts/archivo-latin.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

const plexMono = localFont({
  src: [
    {
      path: "../public/fonts/plex-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/plex-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = "AFTERFORM 001 — Form Follows Nothing.";
const description =
  "An independent footwear concept: a study in subtraction, bonded technical knit, hollow-core EVA, one acid signal. Proposed edition of 300; demo inventory.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — AFTERFORM",
  },
  description,
  applicationName: campaign.brand,
  authors: [{ name: campaign.brand }],
  creator: campaign.brand,
  publisher: campaign.brand,
  keywords: [
    "AFTERFORM",
    "AFTERFORM 001",
    "technical footwear",
    "concept sneaker",
    "proposed edition",
    "graphite",
    "acid",
    "design study",
    "concept storefront",
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: siteUrl,
    siteName: campaign.brand,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F1F0E9",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="min-h-svh bg-ivory font-sans text-graphite antialiased">
        <SiteProviders>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <div id="top">
            <AnnouncementBar />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
            <CartDrawer />
            <MobileBuyBar />
            <SizeGuideModal />
          </div>
        </SiteProviders>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: title,
              description,
              genre: "Footwear design study",
              url: siteUrl,
              creator: {
                "@type": "Organization",
                name: campaign.brand,
                description:
                  "Fictional independent footwear concept. Not a registered company.",
              },
              about: `${product.name} — ${product.shortDescription}`,
            }),
          }}
        />
      </body>
    </html>
  );
}
