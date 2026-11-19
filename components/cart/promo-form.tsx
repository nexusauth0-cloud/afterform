"use client";

import { useId, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";

interface PromoFormProps {
  className?: string;
}

export function PromoForm({ className }: PromoFormProps) {
  const { state, applyPromo, removePromo } = useCart();
  const inputId = useId();
  const messageId = useId();
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const appliedCode = state.promoCode;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = applyPromo(value);
    setFeedback({ ok: result.ok, message: result.message });
    if (result.ok) setValue("");
  }

  if (appliedCode) {
    return (
      <div className={cn("border border-graphite/15 bg-acid/20 p-3", className)}>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-graphite">
            <Check aria-hidden="true" className="size-3.5" strokeWidth={2} />
            {appliedCode} applied
          </span>
          <button
            type="button"
            onClick={() => {
              removePromo();
              setFeedback(null);
            }}
            aria-label={`Remove promo code ${appliedCode}`}
            className="grid size-7 place-items-center text-graphite/45 transition hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </div>
        <p className="mt-1 pl-5 font-mono text-[8px] uppercase tracking-[0.1em] text-graphite/45">
          Preview discount applied to the subtotal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("", className)}>
      <label
        htmlFor={inputId}
        className="font-mono text-[8px] uppercase tracking-[0.14em] text-graphite/45"
      >
        Promo code
      </label>
      <div className="mt-2 flex border border-graphite/18">
        <input
          id={inputId}
          name="promo"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value.toUpperCase());
            setFeedback(null);
          }}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={24}
          placeholder="FORM10"
          aria-describedby={feedback ? messageId : undefined}
          aria-invalid={feedback?.ok === false ? true : undefined}
          className="min-h-10 min-w-0 flex-1 bg-transparent px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-graphite outline-none placeholder:text-graphite/25 focus-visible:bg-ivory"
        />
        <button
          type="submit"
          className="min-h-10 shrink-0 border-l border-graphite/18 px-4 font-mono text-[8px] uppercase tracking-[0.12em] text-graphite/60 transition hover:bg-graphite hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Apply
        </button>
      </div>
      <p
        id={messageId}
        aria-live="polite"
        className={cn(
          "mt-2 min-h-4 font-mono text-[8px] uppercase leading-[1.6] tracking-[0.1em]",
          feedback?.ok === false ? "text-red-700/70" : "text-graphite/40",
        )}
      >
        {feedback?.message ?? "Preview code: FORM10 / 10% off."}
      </p>
    </form>
  );
}
