import { describe, expect, it } from "vitest";
import {
  canPurchase,
  getCountdownParts,
  getDropTargetTimestamp,
  getPhaseLabel,
  resolveDropPhase,
} from "@/lib/drop";

const launchAt = "2026-11-17T00:00:00+01:00";
const closeAt = "2026-11-24T23:59:59+01:00";
const launch = Date.parse(launchAt);
const close = Date.parse(closeAt);

describe("drop phase", () => {
  it("is upcoming before launch", () => {
    expect(
      resolveDropPhase({
        now: launch - 1,
        launchAt,
        closeAt,
        unitsRemaining: 10,
      }),
    ).toBe("upcoming");
  });

  it("is live during the release window", () => {
    expect(
      resolveDropPhase({
        now: launch,
        launchAt,
        closeAt,
        unitsRemaining: 10,
      }),
    ).toBe("live");
    expect(
      resolveDropPhase({
        now: close - 1,
        launchAt,
        closeAt,
        unitsRemaining: 10,
      }),
    ).toBe("live");
  });

  it("closes at the configured end", () => {
    expect(
      resolveDropPhase({
        now: close,
        launchAt,
        closeAt,
        unitsRemaining: 10,
      }),
    ).toBe("closed");
  });

  it("honours sold-out and forced states", () => {
    expect(
      resolveDropPhase({
        now: launch,
        launchAt,
        closeAt,
        unitsRemaining: 0,
      }),
    ).toBe("sold_out");
    expect(
      resolveDropPhase({
        now: launch,
        launchAt,
        closeAt,
        unitsRemaining: 10,
        forceSoldOut: true,
      }),
    ).toBe("sold_out");
  });

  it("only permits purchase while live", () => {
    expect(canPurchase("live")).toBe(true);
    expect(canPurchase("upcoming")).toBe(false);
    expect(canPurchase("sold_out")).toBe(false);
    expect(canPurchase("closed")).toBe(false);
    expect(getPhaseLabel("live")).toBe("DROP LIVE");
    expect(getPhaseLabel("sold_out")).toBe("SOLD OUT");
  });

  it("returns the correct countdown target", () => {
    expect(getDropTargetTimestamp("upcoming", launchAt, closeAt)).toBe(launch);
    expect(getDropTargetTimestamp("live", launchAt, closeAt)).toBe(close);
    expect(getDropTargetTimestamp("sold_out", launchAt, closeAt)).toBeNull();
    expect(getDropTargetTimestamp("closed", launchAt, closeAt)).toBeNull();
  });
});

describe("countdown", () => {
  it("splits remaining time into parts", () => {
    const now = 0;
    const target = ((1 * 86400) + (2 * 3600) + (3 * 60) + 4) * 1000;
    expect(getCountdownParts(target, now)).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      totalMs: target,
      isComplete: false,
    });
  });

  it("never returns negative time", () => {
    const parts = getCountdownParts(1000, 5000);
    expect(parts).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isComplete: true,
    });
  });
});
