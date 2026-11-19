"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { campaign } from "@/data/campaign";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string; mode?: string }
  | { status: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setState({
        status: "error",
        message: "Enter a valid email address.",
      });
      return;
    }

    if (!consent) {
      setState({
        status: "error",
        message: "Confirm consent before joining the list.",
      });
      return;
    }

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          consent,
          website,
          source: "afterform-001",
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; mode?: string; message?: string; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setState({
          status: "error",
          message:
            data?.error ??
            data?.message ??
            "The waitlist could not be reached. Try again.",
        });
        return;
      }

      setState({
        status: "success",
        mode: data.mode,
        message:
          data.message ??
          "Your email was sent to the studio waitlist for this demo.",
      });
      setEmail("");
      setConsent(false);
    } catch {
      setState({
        status: "error",
        message:
          "The waitlist request failed. Check your connection and try again.",
      });
    }
  }

  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative overflow-hidden bg-acid text-ink"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[36vw] leading-none text-ink/[0.05]"
      >
        002
      </span>

      <div className="container-editorial relative py-20 sm:py-24 lg:py-28">
        <Reveal>
          <SectionLabel index="06" theme="dark">
            Waitlist / Drop signal
          </SectionLabel>
        </Reveal>

        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h2
                id="waitlist-title"
                className="display text-[clamp(4.1rem,10vw,9.4rem)] leading-[0.9] tracking-[-0.022em]"
              >
                GET IN
                <br />
                <span className="text-outline-graphite">LINE.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[46ch] text-[13px] leading-[1.72] text-ink/68">
                {campaign.waitlist.description}
              </p>

              <ul className="mt-7 grid gap-0 border-t border-ink/20">
                {[
                  "First access to Drop 002",
                  "Studio notes and release signals",
                  "No resale lists, no daily noise",
                ].map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 border-b border-ink/20 py-3 font-mono text-[9px] uppercase tracking-[0.11em] text-ink/65"
                  >
                    <Check
                      aria-hidden="true"
                      className="size-3.5 shrink-0"
                      strokeWidth={2}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-6">
            <div className="border border-ink/20 bg-ivory p-5 shadow-[0_24px_80px_rgba(9,10,9,0.14)] sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-graphite/12 pb-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-graphite/40">
                    SIGNAL / DROP 002
                  </p>
                  <p className="mt-1.5 font-sans text-[20px] font-medium tracking-[-0.04em]">
                    Join the list.
                  </p>
                </div>
                <span className="border border-graphite/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/45">
                  PREVIEW
                </span>
              </div>

              {state.status === "success" ? (
                <div aria-live="polite" className="py-7">
                  <span className="grid size-10 place-items-center bg-acid text-ink">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2} />
                  </span>
                  <p className="mt-5 font-sans text-[22px] font-medium leading-tight tracking-[-0.04em]">
                    {state.mode === "demo"
                      ? "Demo signal, not stored."
                      : "Signal received."}
                  </p>
                  <p className="mt-3 max-w-[42ch] text-[12px] leading-[1.7] text-graphite/58">
                    {state.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setState({ status: "idle" })}
                    className="mt-5 inline-flex min-h-9 items-center gap-2 border-b border-graphite/25 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/55 transition hover:border-graphite hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Submit another address
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="pt-5">
                  <label
                    htmlFor="waitlist-email"
                    className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/45"
                  >
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (state.status === "error") {
                        setState({ status: "idle" });
                      }
                    }}
                    placeholder="you@example.com"
                    aria-describedby="waitlist-status waitlist-consent-copy"
                    aria-invalid={state.status === "error" ? true : undefined}
                    className="mt-2 min-h-12 w-full border-0 border-b border-graphite/25 bg-transparent px-0 font-sans text-[18px] tracking-[-0.02em] text-graphite outline-none transition placeholder:font-mono placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.1em] placeholder:text-graphite/25 focus-visible:border-graphite"
                  />

                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="waitlist-website">Website</label>
                    <input
                      id="waitlist-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>

                  <label className="mt-5 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => {
                        setConsent(event.target.checked);
                        if (state.status === "error") {
                          setState({ status: "idle" });
                        }
                      }}
                      className="mt-0.5 size-4 shrink-0 accent-graphite"
                    />
                    <span
                      id="waitlist-consent-copy"
                      className="font-mono text-[8px] uppercase leading-[1.7] tracking-[0.1em] text-graphite/50"
                    >
                      {campaign.waitlist.consent}
                    </span>
                  </label>

                  <Button
                    type="submit"
                    variant="ink"
                    size="large"
                    disabled={state.status === "submitting"}
                    className="mt-5 w-full justify-between"
                  >
                    <span>
                      {state.status === "submitting"
                        ? "Sending signal"
                        : "Join the waitlist"}
                    </span>
                    {state.status === "submitting" ? (
                      <Loader2
                        aria-hidden="true"
                        className="size-4 animate-spin"
                      />
                    ) : (
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    )}
                  </Button>

                  <p
                    id="waitlist-status"
                    aria-live="polite"
                    className={cn(
                      "mt-3 min-h-4 font-mono text-[8px] uppercase leading-[1.7] tracking-[0.1em]",
                      state.status === "error"
                        ? "text-red-700/75"
                        : "text-graphite/35",
                    )}
                  >
                    {state.status === "error"
                      ? state.message
                      : state.status === "submitting"
                        ? "Submitting to the waitlist boundary."
                        : "Demo build: delivery is only active when the waitlist is configured. No address is stored otherwise."}
                  </p>
                </form>
              )}

              <p className="mt-5 border-t border-graphite/12 pt-4 font-mono text-[7px] uppercase leading-[1.7] tracking-[0.1em] text-graphite/32">
                {campaign.waitlist.consent} See the{" "}
                <a
                  href="/credits"
                  className="underline decoration-graphite/25 underline-offset-2 transition hover:text-graphite"
                >
                  credits and data notes
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
