import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-ink py-20 text-ivory">
      <div className="container-editorial">
        <SectionLabel index="404" theme="light">
          Nothing here
        </SectionLabel>
        <h1 className="display mt-6 text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.02em]">
          404
          <br />
          <span className="text-outline-ivory">ABSENCE.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-[13px] leading-[1.7] text-ivory/55">
          The page you requested is not part of this release. Return to the
          object or inspect the archive.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center gap-3 bg-acid px-5 font-mono text-[9px] uppercase tracking-[0.13em] text-ink transition hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return to release
          </Link>
          <Link
            href="/credits"
            className="inline-flex min-h-12 items-center gap-3 border border-white/20 px-5 font-mono text-[9px] uppercase tracking-[0.13em] text-ivory/65 transition hover:border-acid hover:text-acid focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Credits
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
