"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastTone = "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastInput {
  title: string;
  description?: string;
  tone?: ToastTone;
  action?: ToastAction;
}

interface Toast extends ToastInput {
  id: number;
}

interface ToastContextValue {
  push: (toast: ToastInput) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const reducedMotion = useReducedMotion();

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (toast: ToastInput) => {
      idRef.current += 1;
      const id = idRef.current;
      const next = { ...toast, id };

      setToasts((current) => [...current.slice(-2), next]);
      window.setTimeout(() => dismiss(id), 5200);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+88px)] z-[110] flex flex-col gap-2 md:inset-x-auto md:right-6 md:bottom-6 md:w-[368px]"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const ToneIcon =
              toast.tone === "error"
                ? Info
                : toast.tone === "info"
                  ? Info
                  : Check;

            return (
              <motion.div
                key={toast.id}
                layout={!reducedMotion}
                initial={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }
                }
                transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                role="status"
                className={cn(
                  "pointer-events-auto relative overflow-hidden border border-white/15 bg-ink/95 px-4 py-3.5 text-ivory shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl",
                  toast.tone === "error" && "border-red-300/30",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 w-[3px]",
                    toast.tone === "error" ? "bg-red-300" : "bg-acid",
                  )}
                />
                <div className="flex items-start gap-3 pl-1">
                  <ToneIcon
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      toast.tone === "error" ? "text-red-300" : "text-acid",
                    )}
                    strokeWidth={1.6}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ivory">
                      {toast.title}
                    </p>
                    {toast.description ? (
                      <p className="mt-1 text-[12px] leading-relaxed text-ivory/60">
                        {toast.description}
                      </p>
                    ) : null}
                    {toast.action ? (
                      <button
                        type="button"
                        onClick={() => {
                          dismiss(toast.id);
                          toast.action?.onClick();
                        }}
                        className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-acid underline decoration-acid/40 underline-offset-4 transition hover:decoration-acid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid"
                      >
                        {toast.action.label}
                      </button>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(toast.id)}
                    aria-label="Dismiss notification"
                    className="grid size-6 shrink-0 place-items-center text-ivory/40 transition hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
                  >
                    <X aria-hidden="true" className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
