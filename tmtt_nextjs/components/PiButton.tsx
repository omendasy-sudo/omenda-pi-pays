"use client";
import React from 'react';

/**
 * Legacy PiButton stub — not used in production.
 * Use PiPayButton instead for payments.
 */
export interface PiButtonProps {
  onConnected?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function PiButton({ children, className }: PiButtonProps) {
  return (
    <button type="button" className={className}>
      {children || 'Buy with Pi'}
    </button>
  );
}
