"use client";
import React, { useEffect } from 'react';
import { usePiConnection, usePiPurchase } from 'pi-sdk-react';
import type { PaymentData } from 'pi-sdk-js';

const defaultPaymentData: PaymentData = {
  amount: 0.01,
  memo: 'Example Pi Payment',
  metadata: { productId: 42, description: 'Demo purchase via Pi Network' }
};

export interface PiButtonProps {
  paymentData?: PaymentData;
  onConnected?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function PiButton({ paymentData = defaultPaymentData, onConnected, children, className }: PiButtonProps) {
  const { connected } = usePiConnection();
  const purchase = usePiPurchase(paymentData);

  useEffect(() => {
    if (connected) onConnected?.();
  }, [connected, onConnected]);

  return (
    <button
      type="button"
      disabled={!connected}
      onClick={purchase}
      className={className}
      aria-disabled={!connected}
    >
      {children || 'Buy with Pi'}
    </button>
  );
}
