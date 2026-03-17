"use client";

import Link from "next/link";
import { PiConnectButton } from "./PiConnectButton";
import { usePiAuth } from "./PiAuthProvider";
import { usePiSdk } from "@/hooks/usePiSdk";
import { useTranslation, LangSelector } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";
import { useGcv } from "./GcvProvider";

export function NavBar() {
  const { user, connected } = usePiAuth();
  usePiSdk();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { mode, toggleMode } = useGcv();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-[#1a1a2e] shadow-sm">
      {/* Header cover with logo */}
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        {/* Left: back arrow */}
        <button type="button" className="text-slate-300 hover:text-white" aria-label="Go back">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>

        {/* Center: logo + branding */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Omenda Pi Pays" className="h-9 w-9 rounded-full object-cover shadow" />
          <span className="text-base font-bold text-white">Omenda Pi Pays</span>
        </div>

        {/* Right: dropdown + user */}
        <div className="flex items-center gap-2">
          {connected && user && (
            <span className="hidden text-xs font-semibold text-amber-400 sm:inline">@{user.username}</span>
          )}
          <button type="button" className="text-slate-400 hover:text-white" aria-label="Menu">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
        </div>
      </div>

      {/* Desktop nav links */}
      <div className="hidden border-t border-white/10 sm:block">
        <div className="mx-auto flex max-w-2xl items-center gap-1 overflow-x-auto px-4 py-1">
          <Link href="/" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-white/10">{t("nav.home")}</Link>
          <Link href="/" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">{t("nav.services")}</Link>
          <Link href="/map" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">{t("nav.map")}</Link>
          <Link href="/social" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">{t("nav.social")}</Link>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleMode}
              className={`rounded-md px-2 py-1 text-[10px] font-bold ${mode === "gcv" ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-slate-400"}`}
              title={mode === "gcv" ? "GCV Mode: $314,159/π" : "Standard: $0.17/π"}
            >{mode === "gcv" ? "GCV" : "STD"}</button>
            <button onClick={toggleTheme} className="text-sm" aria-label="Toggle theme">
              {theme === "light" ? "☀️" : "🌙"}
            </button>
            <LangSelector />
            <PiConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
