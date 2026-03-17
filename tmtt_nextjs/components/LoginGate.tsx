"use client";

import { usePathname } from "next/navigation";
import { usePiAuth } from "./PiAuthProvider";

// Pages that bypass the login gate
const PUBLIC_PATHS = ["/sandbox"];

export function LoginGate({ children }: { children: React.ReactNode }) {
  const { user, connected, loading, error, connect, isPiBrowser, isSandboxMode, sandboxLogin } = usePiAuth();
  const pathname = usePathname();

  // Bypass gate for public pages
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return <>{children}</>;
  }

  // Already authenticated — show content
  if (connected && user) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        {/* Logo */}
        <img src="/logo.png" alt="Omenda Pi Pays" className="mx-auto mb-4 h-20 w-20 rounded-full object-cover shadow-lg" />

        <h1 className="mb-1 text-xl font-extrabold text-slate-900">Omenda Pi Pays Global</h1>
        <p className="mb-6 text-sm text-slate-500">Sign in with your Pi account to continue</p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {!isPiBrowser && !isSandboxMode ? (
          <>
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm">
              <p className="font-semibold text-amber-700">Pi Browser Required</p>
              <p className="mt-1 text-xs text-amber-600">
                Open this app in the Pi Browser to sign in and access all features.
              </p>
            </div>
            <a
              href={typeof window !== "undefined" ? `pi://${window.location.host}${window.location.pathname}` : "#"}
              className="block w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-600"
            >
              Open in Pi Browser
            </a>
          </>
        ) : (
          <button
            onClick={connect}
            disabled={loading}
            className="w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Connecting…
              </span>
            ) : (
              "Sign in with Pi"
            )}
          </button>
        )}

        {isSandboxMode && (
          <button
            onClick={sandboxLogin}
            disabled={loading}
            className="mt-3 w-full rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Sandbox Test Login
          </button>
        )}

        <p className="mt-6 text-[11px] text-slate-400">
          By signing in you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
