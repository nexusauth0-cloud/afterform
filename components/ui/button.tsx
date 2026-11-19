import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "acid" | "ink" | "outlineLight" | "outlineDark" | "ghost";
type ButtonSize = "default" | "compact" | "large";

const variants: Record<ButtonVariant, string> = {
  acid: "bg-acid text-ink border border-acid hover:bg-ivory hover:border-ivory",
  ink: "bg-ink text-ivory border border-ink hover:bg-acid hover:text-ink hover:border-acid",
  outlineLight:
    "bg-transparent text-ivory border border-ivory/30 hover:border-acid hover:text-acid",
  outlineDark:
    "bg-transparent text-graphite border border-graphite/25 hover:border-graphite hover:bg-graphite hover:text-ivory",
  ghost:
    "bg-transparent text-current border border-transparent hover:text-acid px-0",
};

const sizes: Record<ButtonSize, string> = {
  default: "min-h-12 px-6 py-3.5",
  compact: "min-h-10 px-4 py-2.5",
  large: "min-h-14 px-8 py-4",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    "group/button inline-flex items-center justify-center gap-3 text-center font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 active:translate-y-px disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "ink",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function ButtonLink({
  variant = "ink",
  size = "default",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
