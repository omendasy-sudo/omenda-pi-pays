"use client";

import { useCallback } from "react";

export function usePiSdk() {
  const hasPi = typeof window !== "undefined" && !!window.Pi;

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
    (url: string) => {
      if (hasPi) {
        window.Pi.openUrlInSystemBrowser(url);
      } else {
        window.open(url, "_blank");
      }
    },
    [hasPi]
  );

  const getNativeFeatures = useCallback((): string[] => {
    if (!hasPi || !window.Pi.nativeFeaturesList) return [];
    return window.Pi.nativeFeaturesList();
  }, [hasPi]);

  const requestPermission = useCallback(
    (permission: string) => {
      if (!hasPi) return;
      window.Pi.requestPermission(permission);
    },
    [hasPi]
  );

  const requestAd = useCallback(async () => {
    if (!hasPi || !window.Pi.Ads) return;
    await window.Pi.Ads.requestAd("interstitial");
  }, [hasPi]);

  const showAd = useCallback(async () => {
    if (!hasPi || !window.Pi.Ads) return false;
    const ready = await window.Pi.Ads.isAdReady("interstitial");
    if (ready) {
      await window.Pi.Ads.showAd("interstitial");
      return true;
    }
    return false;
  }, [hasPi]);

  return {
    hasPi,
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
