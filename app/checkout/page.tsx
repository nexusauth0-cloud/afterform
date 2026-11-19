import type { Metadata } from "next";
import { CheckoutExperience } from "@/components/checkout/checkout-experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Review AFTERFORM 001 and continue to the Stripe checkout boundary when configured.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <CheckoutExperience
      stripeConfigured={Boolean(process.env.STRIPE_SECRET_KEY)}
    />
  );
}
