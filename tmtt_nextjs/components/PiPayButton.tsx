"use client";

import { useState } from "react";
import { usePiAuth } from "./PiAuthProvider";

interface PiPayButtonProps {
  amount: number;
  memo: string;
  metadata?: Record<string, unknown>;
  onSuccess?: (txid: string) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function PiPayButton({
  amount,
  memo,
  metadata = {},
  onSuccess,
  onError,
  className = "",
  children,
  disabled = false,
}: PiPayButtonProps) {
  const { connected, paymentAuthorized, connect, authorizePayments, isPiBrowser } = usePiAuth();
  const [paying, setPaying] = useState(false);

  async function handlePayment() {
    if (typeof window === "undefined" || !window.Pi) {
      onError?.("Please open in Pi Browser");
      return;
    }

    if (!connected) {
      await connect();
    }

    if (!paymentAuthorized) {
      try {
        await authorizePayments();
      } catch {
        return;
      }
    }

    setPaying(true);

    // Use window.Pi.createPayment() directly per official SDK docs
    window.Pi.createPayment(
      { amount, memo, metadata },
      {
        // Step 1: SDK sends paymentId — our server must approve it via Pi Platform API
        onReadyForServerApproval: async (paymentId: string) => {
          try {
            const res = await fetch("/api/pi_payment/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            });
            if (!res.ok) {
              onError?.("Payment approval failed on server");
              setPaying(false);
            }
          } catch {
            onError?.("Network error during payment approval");
            setPaying(false);
          }
        },

        // Step 2: Blockchain transaction complete — our server must complete it
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          try {
            const res = await fetch("/api/pi_payment/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            });
            if (!res.ok) {
              onError?.("Payment completion failed on server");
            } else {
              onSuccess?.(txid);
            }
          } catch {
            onError?.("Network error during payment completion");
          } finally {
            setPaying(false);
          }
        },

        // User cancelled the payment
        onCancel: async (paymentId: string) => {
          try {
            await fetch("/api/pi_payment/cancel", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            });
          } catch {
            // silent
          }
          setPaying(false);
        },

        // Payment error
        onError: (error: Error) => {
          onError?.(error.message || "Payment failed");
          setPaying(false);
        },
      }
    );
  }

  const baseClass =
    "rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-black transition-all hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || paying}
      className={`${baseClass} ${className}`}
    >
      {children || (
        <span className="flex items-center gap-2">
          {paying ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              Processing…
            </>
          ) : (
            <>π {isPiBrowser ? `Pay ${amount} Pi` : "Open in Pi Browser"}</>
          )}
        </span>
      )}
    </button>
  );
}
