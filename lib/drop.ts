import type { DropPhase } from "@/types";

export interface DropPhaseInput {
  now: number;
  launchAt: string;
  closeAt: string;
  unitsRemaining: number;
  forceSoldOut?: boolean;
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isComplete: boolean;
}

export function resolveDropPhase({
  now,
  launchAt,
  closeAt,
  unitsRemaining,
  forceSoldOut = false,
}: DropPhaseInput): DropPhase {
  if (forceSoldOut || unitsRemaining <= 0) return "sold_out";

  const launch = Date.parse(launchAt);
  const close = Date.parse(closeAt);

  if (Number.isFinite(launch) && now < launch) return "upcoming";
  if (Number.isFinite(close) && now >= close) return "closed";
  return "live";
}

export function getDropTargetTimestamp(
  phase: DropPhase,
  launchAt: string,
  closeAt: string,
): number | null {
  if (phase === "upcoming") {
    const launch = Date.parse(launchAt);
    return Number.isFinite(launch) ? launch : null;
  }
  if (phase === "live") {
    const close = Date.parse(closeAt);
    return Number.isFinite(close) ? close : null;
  }
  return null;
}

export function getCountdownParts(target: number, now: number): CountdownParts {
  const difference = Math.max(0, target - now);
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMs: difference,
    isComplete: difference <= 0,
  };
}

export function getPhaseLabel(phase: DropPhase): string {
  switch (phase) {
    case "live":
      return "DROP LIVE";
    case "upcoming":
      return "DROP OPENS SOON";
    case "sold_out":
      return "SOLD OUT";
    case "closed":
      return "DROP CLOSED";
  }
}

export function canPurchase(phase: DropPhase): boolean {
  return phase === "live";
}
