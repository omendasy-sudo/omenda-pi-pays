"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const GCV_KEY = "omenda_gcv";
const STD_RATE = 0.17;
const GCV_RATE = 314159;

type GcvMode = "standard" | "gcv";

interface GcvCtx {
  mode: GcvMode;
  rate: number;
  setMode: (m: GcvMode) => void;
  toggleMode: () => void;
  formatUsd: (pi: number) => string;
}

const GcvContext = createContext<GcvCtx>({
  mode: "standard",
  rate: STD_RATE,
  setMode: () => {},
  toggleMode: () => {},
  formatUsd: () => "",
});

export function GcvProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<GcvMode>("standard");

  useEffect(() => {
    const stored = localStorage.getItem(GCV_KEY) as GcvMode | null;
    if (stored === "gcv") setModeState("gcv");
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === GCV_KEY && e.newValue) {
        setModeState(e.newValue === "gcv" ? "gcv" : "standard");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setMode = useCallback((m: GcvMode) => {
    localStorage.setItem(GCV_KEY, m);
    setModeState(m);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "standard" ? "gcv" : "standard");
  }, [mode, setMode]);

  const rate = mode === "gcv" ? GCV_RATE : STD_RATE;

  const formatUsd = useCallback(
    (pi: number) => {
      const usd = pi * rate;
      if (usd >= 1e9) return `$${(usd / 1e9).toFixed(2)}B`;
      if (usd >= 1e6) return `$${(usd / 1e6).toFixed(2)}M`;
      if (usd >= 1e3) return `$${(usd / 1e3).toFixed(2)}K`;
      return `$${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [rate]
  );

  return (
    <GcvContext.Provider value={{ mode, rate, setMode, toggleMode, formatUsd }}>
      {children}
    </GcvContext.Provider>
  );
}

export function useGcv() {
  return useContext(GcvContext);
}
