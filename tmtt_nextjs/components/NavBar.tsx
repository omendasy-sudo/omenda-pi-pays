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
  const { openShareDialog } = usePiSdk();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { mode, toggleMode } = useGcv();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090b]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          OMENDA <span className="text-amber-400">PI PAYS</span>
        </Link>
        <div className="hidden items-center gap-1 sm:flex">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.home")}
          </Link>
          <a href="../index.html" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.marketplace")}
          </a>
          <Link href="/map" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.map")}
          </Link>
          <Link href="/social" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.social")}
          </Link>
          <Link href="/services" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.services")}
          </Link>
          <Link href="/services/hotels" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.hotels")}
          </Link>
          <Link href="/services/homes" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.homes")}
          </Link>
          <Link href="/services/bills" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("nav.bills")}
          </Link>
          <Link href="/services/transport" className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white">
            {t("transport.title")}
          </Link>
          {connected && user?.role === "admin" && (
            <Link href="/sandbox" className="rounded-lg px-3 py-2 text-sm font-medium text-amber-300 transition-colors hover:bg-amber-500/10 hover:text-amber-200">
              Sandbox
            </Link>
          )}
          <Link href="/admin" className="rounded-lg px-3 py-2 text-sm font-medium text-violet-400 transition-colors hover:bg-violet-500/10 hover:text-violet-300">
            {t("nav.admin")}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMode}
            className={`rounded-lg border px-3 py-2 text-xs font-bold tracking-wide transition-colors ${
              mode === "gcv"
                ? "border-amber-500/40 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
                : "border-white/[0.06] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            }`}
            title={mode === "gcv" ? "GCV Mode: $314,159/π — Click for Standard" : "Standard: $0.17/π — Click for GCV"}
            aria-label="Toggle GCV price mode"
          >
            {mode === "gcv" ? "GCV" : "STD"}
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-lg border border-white/[0.06] px-2 py-2 text-lg transition-colors hover:bg-white/[0.06]"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle color mode"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>
          <LangSelector />
          <button
            onClick={() => openShareDialog("Omenda Pi Pays", "Check out Omenda Pi Pays — the marketplace & services platform powered by Pi Network!")}
            className="hidden rounded-lg border border-white/[0.06] px-2 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white sm:flex"
            title={t("nav.shareApp")}
          >
            📤
          </button>
          {connected && user && (
            <div className="hidden items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              @{user.username}
            </div>
          )}
          <PiConnectButton />
        </div>
      </div>
    </nav>
  );
}
