"use client";

import { useState, useCallback } from "react";
import { usePiSdk } from "@/hooks/usePiSdk";

interface PiAdButtonProps {
  adType?: "interstitial" | "rewarded";
  onAdComplete?: () => void;
  onAdError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Button that requests, checks readiness, and shows a Pi ad.
 * Follows the official SDK flow: requestAd → isAdReady → showAd.
 */
export function PiAdButton({
  adType = "interstitial",
  onAdComplete,
  onAdError,
  className = "",
  children,
}: PiAdButtonProps) {
  const { hasPi, requestAd, isAdReady, showAd } = usePiSdk();
  const [loading, setLoading] = useState(false);

  const handleAd = useCallback(async () => {
    if (!hasPi) {
      onAdError?.("Pi SDK not available");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Request ad
      await requestAd(adType);

      // Step 2: Check if ad is ready
      const ready = await isAdReady(adType);
      if (!ready) {
        onAdError?.("No ads available right now");
        return;
      }

      // Step 3: Show the ad
      const shown = await showAd(adType);
      if (shown) {
        onAdComplete?.();
      } else {
        onAdError?.("Ad could not be displayed");
      }
    } catch (err) {
      onAdError?.(err instanceof Error ? err.message : "Ad failed");
    } finally {
      setLoading(false);
    }
  }, [hasPi, adType, requestAd, isAdReady, showAd, onAdComplete, onAdError]);

  const baseClass =
    "rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-purple-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={handleAd}
      disabled={loading || !hasPi}
      className={`${baseClass} ${className}`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading Ad…
        </span>
      ) : (
        children || (adType === "rewarded" ? "Watch Ad for Reward" : "View Ad")
      )}
    </button>
  );
}
