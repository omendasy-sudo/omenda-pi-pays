"use client";

import { useCallback } from "react";

type PiScope = "username" | "payments" | "wallet_address";
type NativeFeature = "inline_media" | "request_permission" | "ad_network";
type AdType = "interstitial" | "rewarded";

type PaymentData = {
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
};

type PaymentDto = {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
  status?: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
};

type PaymentCallbacks = {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: PaymentDto) => void;
};

export function usePiSdk() {
  const hasPi = typeof window !== "undefined" && !!window.Pi;

  const init = useCallback(
    (sandbox = false) => {
      if (!hasPi) {
        throw new Error("Pi SDK not available. Open in Pi Browser.");
      }
      window.Pi.init({ version: "2.0", sandbox });
    },
    [hasPi]
  );

  const authenticate = useCallback(
    async (
      scopes: PiScope[],
      onIncompletePaymentFound?: (payment: PaymentDto) => void
    ): Promise<{ accessToken: string; user: { uid: string; username: string } }> => {
      if (!hasPi) {
        throw new Error("Pi SDK not available. Open in Pi Browser.");
      }
      return window.Pi.authenticate(scopes, onIncompletePaymentFound);
    },
    [hasPi]
  );

  const createPayment = useCallback(
    (paymentData: PaymentData, callbacks: PaymentCallbacks) => {
      if (!hasPi) {
        throw new Error("Pi SDK not available. Open in Pi Browser.");
      }
      window.Pi.createPayment(paymentData, callbacks);
    },
    [hasPi]
  );

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

  const openUrlInSystemBrowser = useCallback(
    async (url: string): Promise<void> => {
      if (!/^https?:\/\//i.test(url)) {
        throw new Error("Failed to open URL");
      }

      if (hasPi && window.Pi.openUrlInSystemBrowser) {
        await window.Pi.openUrlInSystemBrowser(url);
        return;
      }

      // Browser fallback for non-Pi environments.
      const ref = window.open(url, "_blank", "noopener,noreferrer");
      if (!ref) {
        throw new Error("Failed to open URL");
      }
    },
    [hasPi]
  );

  const getNativeFeatures = useCallback(async (): Promise<NativeFeature[]> => {
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

  const requestAd = useCallback(async (adType: AdType = "interstitial") => {
    if (!hasPi || !window.Pi.Ads) return;
    return window.Pi.Ads.requestAd(adType);
  }, [hasPi]);

  const showAd = useCallback(async (adType: AdType = "interstitial") => {
    if (!hasPi || !window.Pi.Ads) return false;
    const ready = await window.Pi.Ads.isAdReady(adType);
    if (ready && ready.ready) {
      await window.Pi.Ads.showAd(adType);
      return true;
    }
    return false;
  }, [hasPi]);

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
    requestAd,
    showAd,
  };
}
