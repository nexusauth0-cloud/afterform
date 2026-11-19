"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DialogVariant = "drawer" | "modal" | "full";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: DialogVariant;
  className?: string;
  wrapperClassName?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Dialog({
  open,
  onClose,
  title,
  children,
  variant = "modal",
  className,
  wrapperClassName,
}: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel).focus({ preventScroll: true });
    }, 30);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter(
        (element) =>
          element.offsetParent !== null &&
          element.getAttribute("aria-hidden") !== "true",
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      const previous = previousFocusRef.current;
      if (previous instanceof HTMLElement) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  const motionVariants = {
    drawer: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
    modal: {
      initial: { opacity: 0, scale: 0.98, y: 12 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.985, y: 8 },
    },
    full: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
  }[variant];

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[120]"
          role="presentation"
          aria-hidden={false}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.28 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/72 backdrop-blur-[3px]"
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex",
              variant === "drawer" && "justify-end",
              variant === "modal" && "items-center justify-center p-3 sm:p-6",
              variant === "full" && "items-stretch justify-center",
              wrapperClassName,
            )}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={motionVariants.initial}
              animate={motionVariants.animate}
              exit={motionVariants.exit}
              transition={{
                duration: reducedMotion ? 0.01 : 0.48,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseDown={(event) => event.stopPropagation()}
              className={cn(
                "pointer-events-auto relative flex max-h-[100dvh] flex-col overflow-hidden bg-ivory text-graphite shadow-[0_30px_120px_rgba(0,0,0,0.4)] outline-none",
                variant === "drawer" &&
                  "h-[100dvh] w-full sm:max-w-[480px]",
                variant === "modal" &&
                  "max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl sm:max-h-[calc(100dvh-3rem)]",
                variant === "full" && "h-[100dvh] w-full",
                className,
              )}
            >
              <h2 id={titleId} className="sr-only">
                {title}
              </h2>
              {children}
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
