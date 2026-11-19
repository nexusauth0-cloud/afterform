"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/components/providers/cart-provider";
import { DropProvider } from "@/components/providers/drop-provider";
import { ProductSelectionProvider } from "@/components/providers/selection-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <DropProvider>
      <CartProvider>
        <ToastProvider>
          <ProductSelectionProvider>{children}</ProductSelectionProvider>
        </ToastProvider>
      </CartProvider>
    </DropProvider>
  );
}
