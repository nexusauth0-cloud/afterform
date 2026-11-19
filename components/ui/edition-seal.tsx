"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface EditionSealProps {
  className?: string;
  theme?: "dark" | "light";
}

export function EditionSeal({
  className,
  theme = "light",
}: EditionSealProps) {
  const rawId = useId();
  const pathId = `seal-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-label="AFTERFORM 001 limited edition seal, 300 numbered pairs"
      className={cn("size-[132px]", className)}
    >
      <defs>
        <path
          id={pathId}
          d="M80,80 m-61,0 a61,61 0 1,1 122,0 a61,61 0 1,1 -122,0"
          fill="none"
        />
      </defs>
      <circle
        cx="80"
        cy="80"
        r="78"
        fill="none"
        stroke={theme === "light" ? "rgba(241,240,233,0.28)" : "rgba(23,24,23,0.2)"}
        strokeWidth="1"
      />
      <circle
        cx="80"
        cy="80"
        r="55"
        fill="none"
        stroke={theme === "light" ? "rgba(241,240,233,0.18)" : "rgba(23,24,23,0.14)"}
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      <text
        fill={theme === "light" ? "#F1F0E9" : "#171817"}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "7.6px",
          letterSpacing: "2.2px",
          textTransform: "uppercase",
        }}
      >
        <textPath href={`#${pathId}`} startOffset="4%">
          LIMITED RELEASE — 300 NUMBERED PAIRS — AFTERFORM —
        </textPath>
      </text>
      <text
        x="80"
        y="76"
        textAnchor="middle"
        fill="#C5F45B"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "27px",
          letterSpacing: "0.5px",
        }}
      >
        001
      </text>
      <text
        x="80"
        y="94"
        textAnchor="middle"
        fill={theme === "light" ? "rgba(241,240,233,0.58)" : "rgba(23,24,23,0.52)"}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "6.2px",
          letterSpacing: "1.9px",
        }}
      >
        GRAPHITE / CHALK
      </text>
      <rect
        x="79"
        y="112"
        width="2"
        height="10"
        fill="#C5F45B"
        opacity="0.8"
      />
    </svg>
  );
}
