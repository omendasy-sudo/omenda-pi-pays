"use client";

import { useState, useCallback } from "react";
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
  direction: "u2a" | "a2u";
};

export default function SandboxPage() {
  const { user, connected, connect, isPiBrowser } = usePiAuth();
  const { t } = useTranslation();
  const [tab, setTab] = useState<"u2a" | "a2u">("u2a");

  // U2A state
  const [amount, setAmount] = useState("0.01");
  const [memo, setMemo] = useState("Test payment – Omenda Pi Pays");

  // A2U state
  const [a2uSendMode, setA2uSendMode] = useState<"uid" | "wallet">("uid");
  const [a2uUid, setA2uUid] = useState("");
  const [a2uUidTouched, setA2uUidTouched] = useState(false);
  const [a2uWallet, setA2uWallet] = useState("");
  const [a2uAmount, setA2uAmount] = useState("0.01");
  const [a2uMemo, setA2uMemo] = useState("App-to-User payment – Omenda Pi Pays");
  const [a2uSending, setA2uSending] = useState(false);

  const [txHistory, setTxHistory] = useState<TxRecord[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function addTx(tx: Omit<TxRecord, "id" | "time">) {
    setTxHistory((prev) => [
      { ...tx, id: Date.now(), time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  }

  // Resolve the recipient UID: use manual input if user typed something, else connected user
  const recipientUid = a2uUidTouched ? a2uUid.trim() : (a2uUid.trim() || user?.uid || "");
  const recipientWallet = a2uWallet.trim();
  const recipientLabel = a2uSendMode === "wallet"
    ? (recipientWallet ? recipientWallet.slice(0, 8) + "…" + recipientWallet.slice(-4) : "")
    : (user && !a2uUidTouched && !a2uUid.trim() ? `@${user.username}` : (recipientUid ? recipientUid.slice(0, 12) + "…" : ""));

  const sendA2U = useCallback(async () => {
    if (a2uSendMode === "wallet") {
      if (!recipientWallet || recipientWallet.length < 20) {
        setMessage({ type: "error", text: "Enter a valid Pi wallet address" });
        return;
      }
    } else {
      if (!recipientUid) {
        setMessage({ type: "error", text: "Enter a recipient Pi UID" });
        return;
      }
    }
    const parsed = parseFloat(a2uAmount);
    if (isNaN(parsed) || parsed <= 0 || parsed > 1000) {
      setMessage({ type: "error", text: "Enter a valid amount (0.01 – 1000 Pi)" });
      return;
    }

    setA2uSending(true);
    setMessage(null);

    try {
      const res = await fetch("/api/pi_payment/a2u", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(a2uSendMode === "wallet" ? { walletAddress: recipientWallet } : { uid: recipientUid }),
          amount: parsed,
          memo: a2uMemo || "App-to-User payment",
          metadata: { source: "sandbox", ts: Date.now() },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errDetail = data.detail ? ` (${data.detail})` : "";
        throw new Error((data.error || "A2U payment failed") + errDetail);
      }

      // Server handles full flow: create → submit → complete
      const txid = data.txid || "";
      setMessage({ type: "success", text: `A2U payment completed! TxID: ${txid}` });
      addTx({ amount: parsed, memo: a2uMemo, txid, status: "success", direction: "a2u" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "A2U payment failed";
      setMessage({ type: "error", text: msg });
      addTx({ amount: parsed, memo: a2uMemo, status: "error", direction: "a2u" });
    } finally {
      setA2uSending(false);
    }
  }, [recipientUid, recipientWallet, a2uAmount, a2uMemo, a2uSendMode]);

  const parsedAmount = parseFloat(amount);
  const validAmount = !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= 100;

  const parsedA2uAmount = parseFloat(a2uAmount);
  const validA2uAmount = !isNaN(parsedA2uAmount) && parsedA2uAmount > 0 && parsedA2uAmount <= 1000;

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
            Test User-to-App and App-to-User payments.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-4 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setTab("u2a")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              tab === "u2a"
                ? "bg-violet-600 text-white shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            U2A (User → App)
          </button>
          <button
            onClick={() => setTab("a2u")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              tab === "a2u"
                ? "bg-amber-500 text-white shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            A2U (App → User)
          </button>
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
              {connected && user && (
                <p className="mt-1 text-[0.625rem] font-mono text-slate-400">
                  UID: {user.uid}
                </p>
              )}
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

        {/* ===== U2A SECTION ===== */}
        {tab === "u2a" && (
          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-1 text-sm font-bold text-slate-700">
              User → App Payment
            </h2>
            <p className="mb-4 text-xs text-slate-400">
              The user sends Pi to the app (U2A).
            </p>

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

            <PiPayButton
              amount={validAmount ? parsedAmount : 0.01}
              memo={memo || "Test payment"}
              metadata={{ source: "sandbox", ts: Date.now() }}
              onSuccess={(txid) => {
                setMessage({ type: "success", text: `U2A payment successful! TxID: ${txid}` });
                addTx({ amount: parsedAmount, memo, txid, status: "success", direction: "u2a" });
              }}
              onError={(error) => {
                setMessage({ type: "error", text: error });
                addTx({ amount: parsedAmount, memo, status: "error", direction: "u2a" });
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
        )}

        {/* ===== A2U SECTION ===== */}
        {tab === "a2u" && (
          <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-1 text-sm font-bold text-slate-700">
              App → User Payment
            </h2>
            <p className="mb-4 text-xs text-slate-400">
              The app sends Pi to a user (A2U). Choose UID or Wallet Address.
            </p>

                {/* Send Mode Toggle */}
                <div className="mb-3 flex rounded-xl border border-slate-200 bg-slate-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setA2uSendMode("uid")}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                      a2uSendMode === "uid"
                        ? "bg-amber-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Pi UID
                  </button>
                  <button
                    type="button"
                    onClick={() => setA2uSendMode("wallet")}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                      a2uSendMode === "wallet"
                        ? "bg-amber-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Wallet Address
                  </button>
                </div>

                {a2uSendMode === "uid" ? (
                  <>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Recipient Pi UID
                    </label>
                    <input
                      type="text"
                      value={a2uUid}
                      onChange={(e) => { setA2uUid(e.target.value); setA2uUidTouched(true); }}
                      onFocus={() => setA2uUidTouched(true)}
                      className="mb-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      placeholder={user?.uid ? `e.g. ${user.uid}` : "Paste Pi user UID here"}
                    />
                    {connected && user && (
                      <button
                        type="button"
                        onClick={() => { setA2uUid(user.uid); setA2uUidTouched(true); }}
                        className="mb-3 text-[0.625rem] font-semibold text-amber-600 underline hover:text-amber-700"
                      >
                        Use my UID (@{user.username})
                      </button>
                    )}
                    {!connected && (
                      <p className="mb-3 text-[0.625rem] text-slate-400">
                        Paste the Pi UID of the user you want to send Pi to
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">
                      Recipient Wallet Address
                    </label>
                    <input
                      type="text"
                      value={a2uWallet}
                      onChange={(e) => setA2uWallet(e.target.value)}
                      className="mb-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      placeholder="Paste Pi wallet address"
                    />
                    <p className="mb-3 text-[0.625rem] text-slate-400">
                      Paste the recipient's Pi wallet address
                    </p>
                  </>
                )}

                <label className="mb-1 block text-xs font-semibold text-slate-500">
                  Amount (Pi)
                </label>
                <input
                  type="number"
                  min="0.01"
                  max="1000"
                  step="0.01"
                  value={a2uAmount}
                  onChange={(e) => setA2uAmount(e.target.value)}
                  className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  placeholder="0.01"
                />

                <label className="mb-1 block text-xs font-semibold text-slate-500">
                  Memo
                </label>
                <input
                  type="text"
                  value={a2uMemo}
                  onChange={(e) => setA2uMemo(e.target.value)}
                  maxLength={100}
                  className="mb-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  placeholder="Payment memo"
                />

                <button
                  onClick={sendA2U}
                  disabled={a2uSending || !validA2uAmount || (a2uSendMode === "uid" ? !recipientUid : !recipientWallet)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-base font-extrabold text-white shadow-lg transition-all hover:from-amber-400 hover:to-orange-400 disabled:opacity-50"
                >
                  {a2uSending ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending to Blockchain…
                    </>
                  ) : (
                    <>
                      <span className="text-xl">π</span>
                      Send {validA2uAmount ? parsedA2uAmount : "–"} Pi to {recipientLabel}
                    </>
                  )}
                </button>

                {!validA2uAmount && (
                  <p className="mt-2 text-center text-xs text-red-500">
                    Enter a valid amount between 0.01 and 1000 Pi
                  </p>
                )}
                {a2uSendMode === "uid" && !recipientUid && (
                  <p className="mt-2 text-center text-xs text-red-500">
                    Enter a recipient Pi UID or connect your account
                  </p>
                )}
                {a2uSendMode === "wallet" && !recipientWallet && (
                  <p className="mt-2 text-center text-xs text-red-500">
                    Enter a recipient wallet address
                  </p>
                )}
          </div>
        )}

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
                      {tx.status === "success" ? "✅" : "❌"}{" "}
                      <span className={`mr-1 rounded px-1.5 py-0.5 text-[0.6rem] font-bold ${
                        tx.direction === "a2u"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-violet-100 text-violet-700"
                      }`}>
                        {tx.direction === "a2u" ? "A2U" : "U2A"}
                      </span>
                      {tx.amount} π
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
              <span>3.</span> <strong>U2A:</strong> Set amount &amp; tap &quot;Pay&quot; — user sends Pi to app
            </li>
            <li className="flex items-center gap-2">
              <span>4.</span> <strong>A2U:</strong> Switch to A2U tab &amp; tap &quot;Send&quot; — app sends Pi to user
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
