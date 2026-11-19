import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { campaign } from "@/data/campaign";

export function AnnouncementBar() {
  return (
    <div className="bg-acid text-ink">
      <div className="container-editorial flex h-[34px] items-center justify-between gap-4">
        <p className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] sm:flex">
          <span aria-hidden="true" className="size-1 bg-ink" />
          AFTERFORM / RELEASE 001
        </p>
        <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] sm:hidden">
          001 — 300 PAIRS — NO RESTOCK
        </p>
        <p className="hidden truncate font-mono text-[9px] uppercase tracking-[0.14em] sm:block">
          {campaign.announcement.primary} — {campaign.announcement.secondary}
        </p>
        <Link
          href="/#waitlist"
          className="hidden shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] underline decoration-ink/30 underline-offset-4 transition hover:decoration-ink md:inline-flex"
        >
          {campaign.announcement.action}
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </div>
  );
}
