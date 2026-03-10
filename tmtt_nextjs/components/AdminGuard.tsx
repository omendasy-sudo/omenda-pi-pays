"use client";

import Link from "next/link";
import { usePiAuth } from "@/components/PiAuthProvider";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, connected, loading, connect } = usePiAuth();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center">
          <div className="text-sm text-zinc-300">Checking admin access...</div>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h1 className="text-xl font-bold">Admin Login Required</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in with your Pi account to continue.
          </p>
          <button
            onClick={connect}
            className="mt-4 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold hover:bg-violet-700"
          >
            Login with Pi
          </button>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6">
          <h1 className="text-xl font-bold text-rose-200">Access Denied</h1>
          <p className="mt-2 text-sm text-rose-100/90">
            This area is available only to admin users.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            Back To Home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
