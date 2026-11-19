"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  campaign,
  forceSoldOut as campaignForceSoldOut,
} from "@/data/campaign";
import { getRemainingUnits } from "@/lib/cart";
import {
  canPurchase,
  getDropTargetTimestamp,
  getPhaseLabel,
  resolveDropPhase,
} from "@/lib/drop";
import type { DropPhase } from "@/types";

interface DropContextValue {
  now: number;
  mounted: boolean;
  phase: DropPhase;
  statusLabel: string;
  unitsRemaining: number;
  editionSize: number;
  isPurchasable: boolean;
  previewSoldOut: boolean;
  targetTimestamp: number | null;
}

const DropContext = createContext<DropContextValue | null>(null);

function readPreviewSoldOut(): boolean {
  if (typeof window === "undefined") return false;
  const preview = new URLSearchParams(window.location.search).get("preview");
  return preview === "soldout";
}

export function DropProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => Date.now());
  const [mounted, setMounted] = useState(false);
  const [previewSoldOut, setPreviewSoldOut] = useState(false);

  useEffect(() => {
    // Defer the client clock/preview read one tick so hydration matches the
    // server render, then advance every second.
    const timer = window.setTimeout(() => {
      setMounted(true);
      setPreviewSoldOut(readPreviewSoldOut());
      setNow(Date.now());
    }, 0);

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  const unitsRemaining = getRemainingUnits();
  const phase = resolveDropPhase({
    now,
    launchAt: campaign.drop.launchAt,
    closeAt: campaign.drop.closeAt,
    unitsRemaining,
    forceSoldOut: campaignForceSoldOut || previewSoldOut,
  });

  const value = useMemo<DropContextValue>(
    () => ({
      now,
      mounted,
      phase,
      statusLabel: getPhaseLabel(phase),
      unitsRemaining,
      editionSize: campaign.drop.editionSize,
      isPurchasable: canPurchase(phase),
      previewSoldOut,
      targetTimestamp: getDropTargetTimestamp(
        phase,
        campaign.drop.launchAt,
        campaign.drop.closeAt,
      ),
    }),
    [mounted, now, phase, previewSoldOut, unitsRemaining],
  );

  return <DropContext.Provider value={value}>{children}</DropContext.Provider>;
}

export function useDrop(): DropContextValue {
  const context = useContext(DropContext);
  if (!context) {
    throw new Error("useDrop must be used inside DropProvider");
  }
  return context;
}
