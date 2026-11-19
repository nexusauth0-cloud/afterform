import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-3.5", className)}
    >
      <rect width="24" height="24" fill="currentColor" />
      <path d="M5 19L12 4L19 19H15.2L12 11.2L8.8 19H5Z" fill="#C5F45B" />
    </svg>
  );
}

interface LogoProps {
  href?: string;
  className?: string;
  theme?: "dark" | "light";
  compact?: boolean;
}

export function Logo({
  href = "/#top",
  className,
  theme = "dark",
  compact = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="AFTERFORM — home"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      <BrandMark
        className={cn(
          "transition-transform duration-500 group-hover:rotate-90",
          theme === "light" ? "text-ivory" : "text-graphite",
        )}
      />
      <span
        className={cn(
          "font-sans font-extrabold uppercase leading-none tracking-[-0.055em]",
          compact ? "text-[18px]" : "text-[21px]",
          theme === "light" ? "text-ivory" : "text-graphite",
        )}
      >
        AFTERFORM
      </span>
      <span
        className={cn(
          "mb-2 font-mono text-[8px] tracking-[0.08em]",
          theme === "light" ? "text-ivory/45" : "text-graphite/40",
        )}
      >
        001
      </span>
    </Link>
  );
}
