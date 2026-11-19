"use client";

import { getCountdownParts } from "@/lib/drop";
import { pad } from "@/lib/format";
import { useDrop } from "@/components/providers/drop-provider";
import { cn } from "@/lib/utils";

interface CountdownProps {
  className?: string;
  compact?: boolean;
}

export function Countdown({ className, compact = false }: CountdownProps) {
  const { phase, now, mounted, targetTimestamp, statusLabel } = useDrop();

  const label =
    phase === "upcoming"
      ? "DROP OPENS IN"
      : phase === "live"
        ? "DROP CLOSES IN"
        : phase === "sold_out"
          ? "EDITION CLOSED"
          : "DROP CLOSED";

  const parts =
    mounted && targetTimestamp
      ? getCountdownParts(targetTimestamp, now)
      : {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: 0,
          isComplete: false,
        };

  const units = [
    { value: parts.days, label: "Days" },
    { value: parts.hours, label: "Hours" },
    { value: parts.minutes, label: "Minutes" },
    { value: parts.seconds, label: "Seconds" },
  ];

  const hasTarget = Boolean(targetTimestamp) && mounted;
  const spoken = hasTarget
    ? `${label}: ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds.`
    : `${label}. ${statusLabel}.`;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/55">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              phase === "live" ? "bg-acid" : "bg-ivory/35",
            )}
          />
          {label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/35">
          {statusLabel}
        </span>
      </div>

      <div
        role="timer"
        aria-label={spoken}
        className={cn(
          "grid grid-cols-4 border-y border-white/14",
          compact ? "text-ivory" : "text-ivory",
        )}
      >
        {units.map((unit, index) => (
          <div
            key={unit.label}
            className={cn(
              "flex flex-col gap-1 py-3.5",
              compact ? "px-2" : "px-3 sm:px-4",
              index !== 0 && "border-l border-white/14",
            )}
          >
            <span className="tabular font-mono text-[clamp(1.35rem,3.2vw,2.15rem)] leading-none tracking-[-0.06em] text-ivory">
              {mounted ? pad(unit.value) : "--"}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ivory/35">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <span className="sr-only">{spoken}</span>
    </div>
  );
}
