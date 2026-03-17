"use client";

import { useCallback } from "react";

/**
 * React hook wrapping all window.Pi SDK methods per the official Pi Network SDK reference.
 * Types come from the global declarations in pi-sdk.d.ts.
 */
export function usePiSdk() {
  const hasPi = typeof window !== "undefined" && !!window.Pi;

  const init = useCallback(
    (sandbox = false) => {
      if (!hasPi) throw new Error("Pi SDK not available. Open in Pi Browser.");
      window.Pi.init({ version: "2.0", sandbox });
    },
    [hasPi]
  );

  /* ─── Authentication ─── */

  const authenticate = useCallback(
    async (
      scopes: PiScope[],
      onIncompletePaymentFound?: (payment: PiPaymentDto) => void
    ): Promise<PiAuthResult> => {
      if (!hasPi) throw new Error("Pi SDK not available. Open in Pi Browser.");
      return window.Pi.authenticate(scopes, onIncompletePaymentFound);
    },
    [hasPi]
  );

  /* ─── Payments ─── */

  const createPayment = useCallback(
    (paymentData: PiPaymentData, callbacks: PiPaymentCallbacks) => {
      if (!hasPi) throw new Error("Pi SDK not available. Open in Pi Browser.");
      window.Pi.createPayment(paymentData, callbacks);
    },
    [hasPi]
  );

  /* ─── Share & Social ─── */

  const openShareDialog = useCallback(
    (title: string, message: string) => {
      if (!hasPi) return;
      window.Pi.openShareDialog(title, message);
    },
    [hasPi]
  );

  const openConversation = useCallback(
    (conversationId: string) => {
      if (!hasPi) return;
      window.Pi.openConversation(conversationId);
    },
    [hasPi]
  );

  /* ─── Clipboard ─── */

  const copyText = useCallback(
    (text: string) => {
      if (hasPi) {
        window.Pi.copyText(text);
      } else {
        navigator.clipboard?.writeText(text);
      }
    },
    [hasPi]
  );

  /* ─── URL & Browser ─── */

  const openUrlInSystemBrowser = useCallback(
    async (url: string): Promise<void> => {
      if (!/^https?:\/\//i.test(url)) throw new Error("Failed to open URL");
      if (hasPi && window.Pi.openUrlInSystemBrowser) {
        await window.Pi.openUrlInSystemBrowser(url);
        return;
      }
      const ref = window.open(url, "_blank", "noopener,noreferrer");
      if (!ref) throw new Error("Failed to open URL");
    },
    [hasPi]
  );

  /* ─── Native Features & Permissions ─── */

  const getNativeFeatures = useCallback(async (): Promise<PiNativeFeature[]> => {
    if (!hasPi || !window.Pi.nativeFeaturesList) return [];
    return window.Pi.nativeFeaturesList();
  }, [hasPi]);

  const requestPermission = useCallback(
    async (permission: string) => {
      if (!hasPi) return;
      await window.Pi.requestPermission(permission);
    },
    [hasPi]
  );

  /* ─── QR Code Scanner ─── */

  const scanQrCode = useCallback(async (): Promise<string | null> => {
    if (!hasPi || !window.Pi.scanQrCode) return null;
    return window.Pi.scanQrCode();
  }, [hasPi]);

  /* ─── Ads (interstitial / rewarded) ─── */

  const requestAd = useCallback(
    async (adType: "interstitial" | "rewarded" = "interstitial") => {
      if (!hasPi || !window.Pi.Ads) return;
      return window.Pi.Ads.requestAd(adType);
    },
    [hasPi]
  );

  const isAdReady = useCallback(
    async (adType: "interstitial" | "rewarded" = "interstitial"): Promise<boolean> => {
      if (!hasPi || !window.Pi.Ads) return false;
      const result = await window.Pi.Ads.isAdReady(adType);
      return result?.ready ?? false;
    },
    [hasPi]
  );

  const showAd = useCallback(
    async (adType: "interstitial" | "rewarded" = "interstitial"): Promise<boolean> => {
      if (!hasPi || !window.Pi.Ads) return false;
      const ready = await window.Pi.Ads.isAdReady(adType);
      if (ready?.ready) {
        await window.Pi.Ads.showAd(adType);
        return true;
      }
      return false;
    },
    [hasPi]
  );

  return {
    hasPi,
    init,
    authenticate,
    createPayment,
    openShareDialog,
    openConversation,
    copyText,
    openUrlInSystemBrowser,
    getNativeFeatures,
    requestPermission,
    scanQrCode,
    requestAd,
    isAdReady,
    showAd,
  };
}
