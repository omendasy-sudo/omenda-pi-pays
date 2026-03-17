"use client";

import { useState } from "react";
import { ProductOverview } from "@/components/ProductOverview";

type Step = "trustline" | "mint" | "domain" | "balances";

interface ActionResult {
  ok: boolean;
  message: string;
}

export default function TokensPage() {
  const [step, setStep] = useState<Step>("trustline");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  // Form fields
  const [distributorSecret, setDistributorSecret] = useState("");
  const [issuerSecret, setIssuerSecret] = useState("");
  const [issuerPublicKey, setIssuerPublicKey] = useState("");
  const [distributorPublicKey, setDistributorPublicKey] = useState("");
  const [mintAmount, setMintAmount] = useState("100000");
  const [domain, setDomain] = useState("omendapipaysglobel.online");
  const [balanceAccount, setBalanceAccount] = useState("");

  async function post(endpoint: string, body: Record<string, string>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setResult({ ok: res.ok, message: data.message ?? JSON.stringify(data) });
    } catch (e: unknown) {
      setResult({ ok: false, message: e instanceof Error ? e.message : "Network error" });
    } finally {
      setLoading(false);
    }
  }

  async function getBalances() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `/api/tokens/balances?account=${encodeURIComponent(balanceAccount)}`
      );
      const data = await res.json();
      if (res.ok) {
        setResult({
          ok: true,
          message: `Test-Pi: ${data.testPi} | ${process.env.NEXT_PUBLIC_TOKEN_CODE ?? "Token"}: ${data.token ?? "no trustline"}`,
        });
      } else {
        setResult({ ok: false, message: data.error ?? "Error" });
      }
    } catch (e: unknown) {
      setResult({ ok: false, message: e instanceof Error ? e.message : "Network error" });
    } finally {
      setLoading(false);
    }
  }

  const tabs: { id: Step; label: string }[] = [
    { id: "trustline", label: "1 · Trustline" },
    { id: "mint", label: "2 · Mint" },
    { id: "domain", label: "3 · Home Domain" },
    { id: "balances", label: "Balances" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f1f5f9", padding: "24px 16px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
          Pi Testnet — Token Manager
        </h1>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>
          Token:{" "}
          <strong>{process.env.NEXT_PUBLIC_TOKEN_CODE ?? "OMENDA"}</strong> · Network: Pi Testnet
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setStep(t.id); setResult(null); }}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: step === t.id ? "#6d28d9" : "#e2e8f0",
                color: step === t.id ? "#fff" : "#475569",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          {/* ── Step 1: Trustline ── */}
          {step === "trustline" && (
            <>
              <h2 style={h2}>Create Trustline</h2>
              <p style={desc}>
                The Distributor wallet establishes a trustline for the token. This registers the
                token on-chain. Do this <em>before</em> minting.
              </p>
              <label style={label}>Distributor Secret Key</label>
              <input
                style={input}
                type="password"
                placeholder="S…"
                value={distributorSecret}
                onChange={(e) => setDistributorSecret(e.target.value)}
              />
              <label style={label}>Issuer Public Key</label>
              <input
                style={input}
                placeholder="G…"
                value={issuerPublicKey}
                onChange={(e) => setIssuerPublicKey(e.target.value)}
              />
              <button
                style={btn}
                disabled={loading || !distributorSecret || !issuerPublicKey}
                onClick={() =>
                  post("/api/tokens/trustline", { distributorSecret, issuerPublicKey })
                }
              >
                {loading ? "Submitting…" : "Create Trustline"}
              </button>
            </>
          )}

          {/* ── Step 2: Mint ── */}
          {step === "mint" && (
            <>
              <h2 style={h2}>Mint Tokens</h2>
              <p style={desc}>
                Issuer sends tokens to the Distributor (requires trustline to exist first).
              </p>
              <label style={label}>Issuer Secret Key</label>
              <input
                style={input}
                type="password"
                placeholder="S…"
                value={issuerSecret}
                onChange={(e) => setIssuerSecret(e.target.value)}
              />
              <label style={label}>Distributor Public Key</label>
              <input
                style={input}
                placeholder="G…"
                value={distributorPublicKey}
                onChange={(e) => setDistributorPublicKey(e.target.value)}
              />
              <label style={label}>Amount to Mint</label>
              <input
                style={input}
                type="number"
                min="1"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
              />
              <button
                style={btn}
                disabled={loading || !issuerSecret || !distributorPublicKey || !mintAmount}
                onClick={() =>
                  post("/api/tokens/mint", { issuerSecret, distributorPublicKey, amount: mintAmount })
                }
              >
                {loading ? "Submitting…" : "Mint Tokens"}
              </button>
            </>
          )}

          {/* ── Step 3: Home Domain ── */}
          {step === "domain" && (
            <>
              <h2 style={h2}>Set Home Domain</h2>
              <p style={desc}>
                Links the issuer account to your domain so Pi Server can read{" "}
                <code style={{ fontSize: 12, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>
                  /.well-known/pi.toml
                </code>{" "}
                and list your token in Pi Wallet.
              </p>
              <label style={label}>Issuer Secret Key</label>
              <input
                style={input}
                type="password"
                placeholder="S…"
                value={issuerSecret}
                onChange={(e) => setIssuerSecret(e.target.value)}
              />
              <label style={label}>Domain (no https://)</label>
              <input
                style={input}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button
                style={btn}
                disabled={loading || !issuerSecret || !domain}
                onClick={() => post("/api/tokens/set-home-domain", { issuerSecret, domain })}
              >
                {loading ? "Submitting…" : "Set Home Domain"}
              </button>
            </>
          )}

          {/* ── Balances ── */}
          {step === "balances" && (
            <>
              <h2 style={h2}>Check Balances</h2>
              <p style={desc}>Enter an account public key to see its Test-Pi and token balance.</p>
              <label style={label}>Account Public Key</label>
              <input
                style={input}
                placeholder="G…"
                value={balanceAccount}
                onChange={(e) => setBalanceAccount(e.target.value)}
              />
              <button
                style={btn}
                disabled={loading || !balanceAccount}
                onClick={getBalances}
              >
                {loading ? "Loading…" : "Check Balances"}
              </button>
            </>
          )}

          {/* Result */}
          {result && (
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                borderRadius: 10,
                background: result.ok ? "#dcfce7" : "#fee2e2",
                color: result.ok ? "#166534" : "#991b1b",
                fontSize: 13,
                wordBreak: "break-all",
              }}
            >
              {result.ok ? "✅ " : "❌ "}
              {result.message}
            </div>
          )}
        </div>

        <p style={{ marginTop: 16, fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
          Secret keys are sent only to your own server — never stored or logged.
        </p>
      </div>

      {/* ── Product Overview ── */}
      <ProductOverview />
    </main>
  );
}

// ── Inline styles ─────────────────────────────────────────────────────────────

const h2: React.CSSProperties = { fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 };
const desc: React.CSSProperties = { fontSize: 13, color: "#64748b", marginBottom: 16 };
const label: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4, marginTop: 12 };
const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};
const btn: React.CSSProperties = {
  marginTop: 20,
  width: "100%",
  padding: "12px",
  borderRadius: 10,
  border: "none",
  background: "#6d28d9",
  color: "#fff",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};
