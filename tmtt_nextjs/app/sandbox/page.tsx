"use client";

import { useState } from "react";
import { usePiAuth } from "@/components/PiAuthProvider";
import { PiPayButton } from "@/components/PiPayButton";
import { useTranslation } from "@/lib/i18n";

type TxRecord = {
  id: number;
  amount: number;
  memo: string;
  txid?: string;
  status: "success" | "error" | "cancelled";
  time: string;
};

export default function SandboxPage() {
  const { user, connected, connect, isPiBrowser } = usePiAuth();
  const { t } = useTranslation();
  const [amount, setAmount] = useState("0.01");
  const [memo, setMemo] = useState("Test payment – Omenda Pi Pays");
  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function addTx(tx: Omit<TxRecord, "id" | "time">) {
    setTxHistory((prev) => [
      { ...tx, id: Date.now(), time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  }

  const parsedAmount = parseFloat(amount);
  const validAmount = !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= 100;

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            <span className="text-lg">π</span> Pi Transaction
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Process a Transaction
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Send a User-to-App payment to confirm your setup is complete.
          </p>
        </div>

        {/* Connection Status */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pi Network Status
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {connected && user ? (
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Connected as @{user.username}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    Not Connected
                  </span>
                )}
              </p>
            </div>
            {!connected && (
              <button
                onClick={connect}
                className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-violet-500"
              >
                Connect
              </button>
            )}
          </div>
          {!isPiBrowser && (
            <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700">
              Open this page in the <strong>Pi Browser</strong> to process real transactions.
            </p>
          )}
        </div>

        {/* Payment Form */}
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-slate-700">Payment Details</h2>

          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Amount (Pi)
          </label>
          <input
            type="number"
            min="0.01"
            max="100"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            placeholder="0.01"
          />

          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Memo
          </label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={100}
            className="mb-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            placeholder="Payment memo"
          />

          {/* Pay Button */}
          <PiPayButton
            amount={validAmount ? parsedAmount : 0.01}
            memo={memo || "Test payment"}
            metadata={{ source: "sandbox", ts: Date.now() }}
            onSuccess={(txid) => {
              setMessage({ type: "success", text: `Payment successful! TxID: ${txid}` });
              addTx({ amount: parsedAmount, memo, txid, status: "success" });
            }}
            onError={(error) => {
              setMessage({ type: "error", text: error });
              addTx({ amount: parsedAmount, memo, status: "error" });
            }}
            disabled={!validAmount}
            className="w-full"
          />

          {!validAmount && (
            <p className="mt-2 text-center text-xs text-red-500">
              Enter a valid amount between 0.01 and 100 Pi
            </p>
          )}
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-4 rounded-2xl border p-4 text-sm font-semibold ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{message.type === "success" ? "✅" : "❌"}</span>
              <div>
                <p>{message.text}</p>
                {message.type === "success" && (
                  <p className="mt-1 text-xs font-normal text-emerald-600">
                    Your Pi Network payment integration is working correctly!
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setMessage(null)}
              className="mt-2 text-xs underline opacity-70"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Transaction History */}
        {txHistory.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-slate-700">
              Transaction History
            </h2>
            <div className="space-y-2">
              {txHistory.map((tx) => (
                <div
                  key={tx.id}
                  className={`rounded-xl border p-3 ${
                    tx.status === "success"
                      ? "border-emerald-100 bg-emerald-50/50"
                      : "border-red-100 bg-red-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">
                      {tx.status === "success" ? "✅" : "❌"} {tx.amount} π
                    </span>
                    <span className="text-[0.625rem] text-slate-400">{tx.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{tx.memo}</p>
                  {tx.txid && (
                    <p className="mt-1 truncate text-[0.625rem] font-mono text-violet-600">
                      TxID: {tx.txid}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Setup Info */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="text-xs font-bold text-blue-800">Setup Checklist</h3>
          <ul className="mt-2 space-y-1 text-xs text-blue-700">
            <li className="flex items-center gap-2">
              <span>1.</span> Open in Pi Browser at your production URL
            </li>
            <li className="flex items-center gap-2">
              <span>2.</span> Connect your Pi account
            </li>
            <li className="flex items-center gap-2">
              <span>3.</span> Set amount &amp; tap &quot;Pay&quot;
            </li>
            <li className="flex items-center gap-2">
              <span>4.</span> Approve the payment in Pi Browser
            </li>
            <li className="flex items-center gap-2">
              <span>5.</span> Transaction completes &amp; shows success ✅
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
