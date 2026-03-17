"use client";

import Link from "next/link";
import { PiConnectButton } from "./PiConnectButton";
import { usePiAuth } from "./PiAuthProvider";
import { usePiSdk } from "@/hooks/usePiSdk";
import { useTranslation, LangSelector } from "@/lib/i18n";
export function NavBar() {
  const { user, connected } = usePiAuth();
  usePiSdk();
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700 bg-[#1a1a2e] shadow-lg">
      {/* Cover heading with large logo */}
      <div className="flex flex-col items-center justify-center px-4 py-4">
        <img src="/logo.png" alt="Omenda Pi Pays" className="h-20 w-20 rounded-2xl object-cover shadow-xl ring-2 ring-purple-500/40" />
        <h1 className="mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-lg font-extrabold tracking-wide text-transparent">
          Omenda Pi Pays
        </h1>
        {connected && user && (
          <span className="mt-0.5 text-xs font-semibold text-amber-400">@{user.username}</span>
        )}
      </div>

      {/* Nav links */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-2xl items-center gap-1 overflow-x-auto px-4 py-1">
          <Link href="/" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-white/10">{t("nav.home")}</Link>
          <Link href="/" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">{t("nav.services")}</Link>
          <Link href="/map" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">{t("nav.map")}</Link>
          <Link href="/social" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">{t("nav.social")}</Link>
          <div className="ml-auto flex items-center gap-2">
            <LangSelector />
            <PiConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
