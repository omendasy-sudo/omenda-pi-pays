"use client";

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

  async function handlePayment() {
    if (!window.Pi) {
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

    window.Pi.createPayment(
      { amount, memo, metadata },
      {
        onReadyForServerApproval(paymentId: string) {
          fetch("/api/pi_payment/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          }).catch(() => onError?.("Approval failed"));
        },
        onReadyForServerCompletion(paymentId: string, txid: string) {
          fetch("/api/pi_payment/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid }),
          })
            .then(() => onSuccess?.(txid))
            .catch(() => onError?.("Completion failed"));
        },
        onCancel() {
          onError?.("Payment cancelled");
        },
        onError(error: Error) {
          onError?.(error.message || "Payment failed");
        },
      }
    );
  }

  const baseClass =
    "rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-bold text-black transition-all hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      className={`${baseClass} ${className}`}
    >
      {children || (
        <span className="flex items-center gap-2">
          π {isPiBrowser ? `Pay ${amount} Pi` : "Open in Pi Browser"}
        </span>
      )}
    </button>
  );
}
