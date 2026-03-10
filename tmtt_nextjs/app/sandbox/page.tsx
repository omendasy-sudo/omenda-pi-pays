"use client";

import { useMemo, useState } from "react";
import { PiPayButton } from "@/components/PiPayButton";
import { usePiAuth } from "@/components/PiAuthProvider";

type LogItem = {
  id: number;
  text: string;
};

type DomainVerifyResult = {
  ok: boolean;
  checks?: {
    httpOk: boolean;
    status: number | null;
    isHtml: boolean;
    matches: boolean;
  };
  meta?: {
    targetUrl?: string;
    contentType?: string;
    responseLength?: number;
  };
  error?: string;
};

export default function SandboxPage() {
  const { connected, connect, sandboxLogin, isPiBrowser, isSandboxMode, user } = usePiAuth();
  const isAdmin = user?.role === "admin";

  const [amountInput, setAmountInput] = useState("0.01");
  const [memo, setMemo] = useState("Sandbox Pi payment test");
  const [metadataInput, setMetadataInput] = useState('{"source":"sandbox","purpose":"test"}');
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [txid, setTxid] = useState<string | null>(null);
  const [verifyingDomain, setVerifyingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState<DomainVerifyResult | null>(null);

  const amount = Number(amountInput);
  const amountIsValid = Number.isFinite(amount) && amount > 0;

  const parsedMetadata = useMemo(() => {
    try {
      const parsed = JSON.parse(metadataInput);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
      return {};
    } catch {
      return {};
    }
  }, [metadataInput]);

  function pushLog(text: string) {
    setLogs((prev) => [{ id: Date.now(), text }, ...prev].slice(0, 8));
  }

  async function verifyDomain() {
    setVerifyingDomain(true);
    setDomainResult(null);
    try {
      const res = await fetch("/api/health/domain-verification", { cache: "no-store" });
      const data = (await res.json()) as DomainVerifyResult;
      setDomainResult(data);
      pushLog(data.ok ? "Domain verification passed" : "Domain verification failed");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Domain verification request failed";
      setDomainResult({ ok: false, error: message });
      pushLog(`Domain verification error: ${message}`);
    } finally {
      setVerifyingDomain(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            Pi Payment Sandbox
          </div>
          <h1 className="text-2xl font-bold">Test Pi Transactions</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Use this page to test the Pi payment flow safely before launching for all users.
          </p>

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3 text-zinc-300">
              Browser: {isPiBrowser ? "Pi Browser" : "Not Pi Browser"}
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3 text-zinc-300">
              Mode: {isSandboxMode ? "Sandbox" : "Mainnet/Unset"}
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3 text-zinc-300 sm:col-span-2">
              User: {connected && user ? `@${user.username}` : "Not connected"}
            </div>
          </div>
        </section>

        {connected && !isAdmin && (
          <section className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-6">
            <h2 className="text-lg font-semibold text-rose-300">Admin access required</h2>
            <p className="mt-2 text-sm text-rose-100/90">
              This sandbox is limited to admin accounts. Please sign in with an admin user.
            </p>
          </section>
        )}

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Domain Verification</h2>
            <button
              onClick={verifyDomain}
              disabled={verifyingDomain}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {verifyingDomain ? "Verifying..." : "Verify Domain Button"}
            </button>
          </div>

          {domainResult && (
            <div className="mb-4 rounded-xl border border-white/[0.08] bg-black/20 p-3 text-xs text-zinc-300">
              <p className={domainResult.ok ? "text-emerald-300" : "text-rose-300"}>
                {domainResult.ok ? "Domain validation key is reachable and correct." : "Domain validation key check failed."}
              </p>
              <p className="mt-1 text-zinc-400">URL: {domainResult.meta?.targetUrl || "N/A"}</p>
              <p className="text-zinc-400">Status: {String(domainResult.checks?.status ?? "N/A")}</p>
              <p className="text-zinc-400">Content-Type: {domainResult.meta?.contentType || "N/A"}</p>
              <p className="text-zinc-400">Looks like HTML: {String(domainResult.checks?.isHtml ?? false)}</p>
              <p className="text-zinc-400">Key matches env: {String(domainResult.checks?.matches ?? false)}</p>
              {domainResult.error && <p className="mt-1 text-rose-300">Error: {domainResult.error}</p>}
            </div>
          )}

          <div className="grid gap-4">
            <label className="grid gap-2 text-sm">
              Amount (Pi)
              <input
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="rounded-lg border border-white/[0.1] bg-black/20 px-3 py-2 text-white outline-none ring-violet-500/60 focus:ring"
                placeholder="0.01"
                inputMode="decimal"
              />
            </label>

            <label className="grid gap-2 text-sm">
              Memo
              <input
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="rounded-lg border border-white/[0.1] bg-black/20 px-3 py-2 text-white outline-none ring-violet-500/60 focus:ring"
                placeholder="Sandbox payment memo"
              />
            </label>

            <label className="grid gap-2 text-sm">
              Metadata (JSON)
              <textarea
                value={metadataInput}
                onChange={(e) => setMetadataInput(e.target.value)}
                className="min-h-28 rounded-lg border border-white/[0.1] bg-black/20 px-3 py-2 text-white outline-none ring-violet-500/60 focus:ring"
                placeholder='{"source":"sandbox","purpose":"test"}'
              />
            </label>

            {!connected ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={connect}
                  className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-700"
                >
                  Login with Pi
                </button>
                <button
                  onClick={sandboxLogin}
                  disabled={!isSandboxMode || isPiBrowser}
                  className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm font-bold text-cyan-200 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Test Login (Sandbox)
                </button>
              </div>
            ) : !isAdmin ? (
              <button
                disabled
                className="cursor-not-allowed rounded-xl bg-zinc-700 px-5 py-3 text-sm font-bold text-zinc-300"
              >
                Admin Account Needed
              </button>
            ) : (
              <PiPayButton
                amount={amountIsValid ? amount : 0.01}
                memo={memo || "Sandbox test payment"}
                metadata={parsedMetadata}
                disabled={!amountIsValid || !memo.trim()}
                onSuccess={(newTxid) => {
                  setTxid(newTxid);
                  pushLog(`Success: txid ${newTxid}`);
                }}
                onError={(errorMessage) => {
                  pushLog(`Error: ${errorMessage}`);
                }}
                className="w-full justify-center"
              >
                Start Sandbox Payment
              </PiPayButton>
            )}
          </div>

          {!amountIsValid && (
            <p className="mt-3 text-xs text-rose-400">Enter a valid amount greater than 0.</p>
          )}
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold">Transaction Result</h2>
          <p className="mt-2 text-sm text-zinc-400">
            {txid ? `Latest txid: ${txid}` : "No successful payment yet."}
          </p>

          <div className="mt-4 space-y-2">
            {logs.length === 0 ? (
              <p className="text-xs text-zinc-500">No events yet.</p>
            ) : (
              logs.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 text-xs text-zinc-300"
                >
                  {item.text}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
