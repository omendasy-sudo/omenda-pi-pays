"use client";

import { useState } from "react";
import { usePiAuth } from "./PiAuthProvider";

const APP_URL = "https://omendapipaysglobel.online";

function openInPiBrowser() {
  // Pi Browser deep link — on mobile with Pi Browser installed this opens the app directly.
  // Falls back gracefully if Pi Browser is not installed.
  window.location.href = `pi://${APP_URL.replace(/^https?:\/\//, "")}`;
}

export function PiConnectButton() {
  const { user, loading, connected, error, connect, disconnect, isPiBrowser } = usePiAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (loading) {
    return (
      <button disabled className="flex items-center gap-2 rounded-lg bg-violet-600/50 px-4 py-2 text-sm font-semibold">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        Signing in...
      </button>
    );
  }

  if (connected && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300 transition-colors hover:bg-violet-500/20"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-amber-400 text-[10px] font-bold text-white">
            {user.username.charAt(0).toUpperCase()}
          </span>
          @{user.username}
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113] shadow-2xl">
              <div className="border-b border-white/[0.06] p-4">
                <div className="text-sm font-semibold">@{user.username}</div>
                <div className="mt-0.5 truncate text-[11px] text-zinc-500">UID: {user.uid}</div>
              </div>
              <div className="p-2">
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Pi account signed in
                </div>
              </div>
              <div className="border-t border-white/[0.06] p-2">
                <button
                  onClick={() => { disconnect(); setShowMenu(false); }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-400 hover:bg-rose-500/10"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (!isPiBrowser) {
    return (
      <div>
        <button
          onClick={openInPiBrowser}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
        >
          Open in Pi Browser
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={connect}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-violet-700"
      >
        Login with Pi
      </button>
      {error && (
        <div className="absolute right-6 top-full mt-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs text-rose-400">
          {error}
        </div>
      )}
    </div>
  );
}
