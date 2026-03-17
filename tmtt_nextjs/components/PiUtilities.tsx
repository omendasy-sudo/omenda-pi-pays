"use client";

import { useState, useCallback } from "react";
import { usePiSdk } from "@/hooks/usePiSdk";

/* ─── Share Button ─── */

interface PiShareButtonProps {
  title: string;
  message: string;
  className?: string;
  children?: React.ReactNode;
}

export function PiShareButton({ title, message, className = "", children }: PiShareButtonProps) {
  const { hasPi, openShareDialog } = usePiSdk();

  return (
    <button
      onClick={() => openShareDialog(title, message)}
      disabled={!hasPi}
      className={`rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50 ${className}`}
    >
      {children || "Share"}
    </button>
  );
}

/* ─── QR Code Scanner ─── */

interface PiQrScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function PiQrScanner({ onScan, onError, className = "", children }: PiQrScannerProps) {
  const { hasPi, scanQrCode } = usePiSdk();
  const [scanning, setScanning] = useState(false);

  const handleScan = useCallback(async () => {
    if (!hasPi) {
      onError?.("Pi SDK not available");
      return;
    }
    setScanning(true);
    try {
      const result = await scanQrCode();
      if (result) {
        onScan(result);
      }
    } catch (err) {
      onError?.(err instanceof Error ? err.message : "QR scan failed");
    } finally {
      setScanning(false);
    }
  }, [hasPi, scanQrCode, onScan, onError]);

  return (
    <button
      onClick={handleScan}
      disabled={!hasPi || scanning}
      className={`rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-600 disabled:opacity-50 ${className}`}
    >
      {scanning ? "Scanning…" : children || "Scan QR Code"}
    </button>
  );
}

/* ─── Copy to Clipboard ─── */

interface PiCopyButtonProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export function PiCopyButton({ text, className = "", children }: PiCopyButtonProps) {
  const { copyText } = usePiSdk();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [copyText, text]);

  return (
    <button
      onClick={handleCopy}
      className={`rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-300 ${className}`}
    >
      {copied ? "Copied!" : children || "Copy"}
    </button>
  );
}

/* ─── Open URL in System Browser ─── */

interface PiOpenUrlButtonProps {
  url: string;
  className?: string;
  children?: React.ReactNode;
}

export function PiOpenUrlButton({ url, className = "", children }: PiOpenUrlButtonProps) {
  const { openUrlInSystemBrowser } = usePiSdk();

  return (
    <button
      onClick={() => openUrlInSystemBrowser(url)}
      className={`rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600 ${className}`}
    >
      {children || "Open in Browser"}
    </button>
  );
}

/* ─── Native Features List ─── */

export function useNativeFeatures() {
  const { hasPi, getNativeFeatures, requestPermission } = usePiSdk();
  const [features, setFeatures] = useState<PiNativeFeature[]>([]);

  const loadFeatures = useCallback(async () => {
    if (!hasPi) return;
    const list = await getNativeFeatures();
    setFeatures(list);
    return list;
  }, [hasPi, getNativeFeatures]);

  return { features, loadFeatures, requestPermission, hasPi };
}
