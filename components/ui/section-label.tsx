import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  children: string;
  theme?: "dark" | "light";
  className?: string;
}

export function SectionLabel({
  index,
  children,
  theme = "dark",
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em]",
        theme === "dark" ? "text-graphite/55" : "text-ivory/55",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 bg-acid"
      />
      <span className={theme === "dark" ? "text-graphite" : "text-ivory"}>
        {index}
      </span>
      <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
