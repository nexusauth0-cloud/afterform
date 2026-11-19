"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[70svh] items-center bg-ink py-20 text-ivory">
      <div className="container-editorial">
        <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/45">
          <span className="size-1.5 bg-acid" aria-hidden="true" />
          Runtime / interrupted
        </p>
        <h1 className="display mt-6 text-[clamp(3.8rem,10vw,9rem)] leading-[0.9]">
          THE OBJECT
          <br />
          <span className="text-outline-ivory">STALLED.</span>
        </h1>
        <p className="mt-6 max-w-[48ch] text-[13px] leading-[1.7] text-ivory/55">
          Something failed while rendering this view. Your bag is stored in this
          browser and has not been sent anywhere. Try the render again or return
          to the release.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-ivory/30">
            DIGEST / {error.digest}
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center gap-3 bg-acid px-5 font-mono text-[9px] uppercase tracking-[0.13em] text-ink transition hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center gap-3 border border-white/20 px-5 font-mono text-[9px] uppercase tracking-[0.13em] text-ivory/65 transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return to release
          </Link>
        </div>
      </div>
    </section>
  );
}
