"use client";

import { usePiAuth } from "./PiAuthProvider";
import { PiSdkBase } from "pi-sdk-js";

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

    // PiSdkBase.createPayment posts approve/complete/cancel/error
    // to /api/pi_payment/* automatically (auto-detected in Next.js).
    const sdk = new PiSdkBase();
    sdk.onConnection = () => {
      sdk.createPayment({ amount, memo, metadata });
    };

    // Patch completion callback so the UI can react
    const origComplete = PiSdkBase.onReadyForServerCompletion.bind(PiSdkBase);
    PiSdkBase.onReadyForServerCompletion = async (paymentId: string, txid: string) => {
      await origComplete(paymentId, txid);
      onSuccess?.(txid);
      PiSdkBase.onReadyForServerCompletion = origComplete;
    };

    if (!PiSdkBase.connected) {
      await sdk.connect();
    } else {
      sdk.createPayment({ amount, memo, metadata });
    }
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
