import { campaign } from "@/data/campaign";

export function Ticker() {
  const items = [...campaign.ticker, ...campaign.ticker, ...campaign.ticker];

  return (
    <div className="overflow-hidden border-y border-ink/15 bg-acid text-ink">
      <p className="sr-only">
        AFTERFORM 001 — Form follows nothing. Proposed edition of 300 numbered
        pairs. Concept release, no restock.
      </p>
      <div
        aria-hidden="true"
        className="marquee-track h-10 items-center sm:h-11"
      >
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-5 font-mono text-[9px] uppercase tracking-[0.17em] sm:px-7">
              {item}
            </span>
            <span className="size-1 rotate-45 bg-ink/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
