import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";
import { product } from "@/data/product";
import { formatPrice } from "@/lib/format";
import { ClearCartOnPaid } from "@/components/checkout/clear-cart-on-paid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout return",
  description: "Checkout return and Stripe verification for AFTERFORM 001.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string | string[] }>;
};

interface StripeSession {
  id?: string;
  status?: string;
  payment_status?: string;
  amount_total?: number | null;
  currency?: string | null;
}

type Verification =
  | { kind: "paid"; session: StripeSession }
  | { kind: "unpaid"; session: StripeSession }
  | { kind: "not_configured" }
  | { kind: "missing" }
  | { kind: "invalid" }
  | { kind: "error"; status?: number };

const SESSION_ID_PATTERN = /^cs_[A-Za-z0-9_]+$/;

async function verifySession(sessionId: string): Promise<Verification> {
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) return { kind: "not_configured" };
  if (!SESSION_ID_PATTERN.test(sessionId)) return { kind: "invalid" };

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { kind: "error", status: response.status };
    }

    const session = (await response.json()) as StripeSession;
    if (session.payment_status === "paid") {
      return { kind: "paid", session };
    }
    return { kind: "unpaid", session };
  } catch {
    return { kind: "error" };
  }
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const rawSessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;
  const sessionId = rawSessionId?.trim();

  const verification: Verification = sessionId
    ? await verifySession(sessionId)
    : { kind: "missing" };

  const paid = verification.kind === "paid";
  const state = {
    paid: {
      label: "PAYMENT CONFIRMED",
      icon: CheckCircle2,
      accent: "text-acid",
      title: "Stripe confirms payment.",
    },
    unpaid: {
      label: "PAYMENT NOT COMPLETED",
      icon: AlertTriangle,
      accent: "text-ivory/60",
      title: "No completed payment was confirmed.",
    },
    not_configured: {
      label: "DEMO RETURN",
      icon: Info,
      accent: "text-ivory/60",
      title: "No payment provider is connected.",
    },
    missing: {
      label: "NO SESSION SUPPLIED",
      icon: Info,
      accent: "text-ivory/60",
      title: "No checkout session was provided.",
    },
    invalid: {
      label: "INVALID SESSION",
      icon: XCircle,
      accent: "text-ivory/60",
      title: "That session reference is not valid.",
    },
    error: {
      label: "VERIFICATION UNAVAILABLE",
      icon: XCircle,
      accent: "text-ivory/60",
      title: "Stripe could not verify this session.",
    },
  }[verification.kind];

  const StatusIcon = state.icon;
  const amount =
    verification.kind === "paid" || verification.kind === "unpaid"
      ? verification.session.amount_total
      : null;
  const currency =
    verification.kind === "paid" || verification.kind === "unpaid"
      ? (verification.session.currency?.toUpperCase() ?? product.currency)
      : product.currency;

  return (
    <section className="bg-ink py-16 text-ivory sm:py-24 lg:py-28">
      {paid ? <ClearCartOnPaid /> : null}
      <div className="container-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/14 pb-4">
          <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
            <span className="size-1.5 bg-acid" aria-hidden="true" />
            Checkout return / Stripe verification
          </p>
          <Link
            href="/"
            className="inline-flex min-h-9 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/45 transition hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-3" />
            Return to release
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p
              className={`flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] ${state.accent}`}
            >
              <StatusIcon
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.7}
              />
              {state.label}
            </p>
            <h1 className="display mt-5 text-[clamp(3.1rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.018em]">
              {paid ? (
                <>
                  PAYMENT
                  <br />
                  <span className="text-outline-acid">CONFIRMED.</span>
                </>
              ) : (
                <>
                  NOTHING
                  <br />
                  <span className="text-outline-ivory">CONFIRMED.</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-[52ch] text-[13px] leading-[1.7] text-ivory/55">
              {state.title}{" "}
              {verification.kind === "paid"
                ? "This page reads the session directly from the Stripe API; the status is not simulated."
                : "This page does not claim that a payment was completed."}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="glass-panel p-5 sm:p-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/40">
                SESSION SUMMARY
              </p>
              <div className="mt-4 border-t border-white/12 pt-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/35">
                  RESULT
                </p>
                <p className="mt-1.5 font-sans text-[17px] font-medium tracking-[-0.02em] text-ivory">
                  {state.label}
                </p>
              </div>

              {typeof amount === "number" ? (
                <div className="mt-4 border-t border-white/12 pt-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/35">
                    STRIPE TOTAL
                  </p>
                  <p className="mt-1.5 font-mono text-[18px] tabular text-ivory">
                    {formatPrice(amount, currency)}
                  </p>
                </div>
              ) : null}

              {verification.kind === "unpaid" ? (
                <div className="mt-4 border-t border-white/12 pt-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/35">
                    STRIPE STATE
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/60">
                    {verification.session.status ?? "unknown"} /{" "}
                    {verification.session.payment_status ?? "unknown"}
                  </p>
                </div>
              ) : null}

              <div className="mt-5 border-t border-white/12 pt-4">
                <p className="font-mono text-[7px] uppercase leading-[1.8] tracking-[0.1em] text-ivory/30">
                  {verification.kind === "paid"
                    ? "Stripe confirms payment. This concept build does not create, store or fulfil orders. Retain your Stripe receipt."
                    : verification.kind === "not_configured"
                      ? "STRIPE_SECRET_KEY is absent from this deployment. No card data was collected and no payment could have been processed by this app."
                      : verification.kind === "error"
                        ? "A network or API error prevented verification. No payment status is claimed here."
                        : verification.kind === "missing"
                          ? "Open this page from a Stripe Checkout success redirect that includes a session_id."
                          : "No payment status is claimed for this session."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/14 pt-6">
          <Link
            href="/#acquire"
            className="inline-flex min-h-12 items-center gap-3 bg-acid px-5 font-mono text-[9px] uppercase tracking-[0.13em] text-ink transition hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {paid ? "Return to the release" : "Back to the release"}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href="/credits"
            className="inline-flex min-h-12 items-center gap-3 border border-white/20 px-5 font-mono text-[9px] uppercase tracking-[0.13em] text-ivory/65 transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Credits and data notes
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
