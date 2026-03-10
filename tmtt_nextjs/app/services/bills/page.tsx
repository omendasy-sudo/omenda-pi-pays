"use client";

import { useState } from "react";
import Link from "next/link";
import { billProviders } from "@/lib/data";
import type { BillProvider } from "@/lib/types";
import { usePiSdk } from "@/hooks/usePiSdk";
import { useGcv } from "@/components/GcvProvider";

type BillCategory = "all" | "electricity" | "water" | "internet" | "tv" | "phone" | "insurance";

export default function BillsPage() {
  const [category, setCategory] = useState<BillCategory>("all");
  const [selectedProvider, setSelectedProvider] = useState<BillProvider | null>(null);
  const [step, setStep] = useState<"select" | "form" | "confirm" | "success">("select");

  const [billForm, setBillForm] = useState({
    accountNumber: "",
    customerName: "",
    amount: "",
    phone: "",
  });

  const { openShareDialog, copyText } = usePiSdk();
  const { formatUsd } = useGcv();

  const filtered =
    category === "all" ? billProviders : billProviders.filter((b) => b.category === category);

  const categories: { key: BillCategory; label: string; icon: string }[] = [
    { key: "all", label: "All", icon: "📋" },
    { key: "electricity", label: "Electricity", icon: "⚡" },
    { key: "water", label: "Water", icon: "💧" },
    { key: "internet", label: "Internet", icon: "🌐" },
    { key: "tv", label: "TV", icon: "📺" },
    { key: "phone", label: "Phone", icon: "📱" },
    { key: "insurance", label: "Insurance", icon: "🛡️" },
  ];

  function handleSelectProvider(provider: BillProvider) {
    setSelectedProvider(provider);
    setStep("form");
  }

  function handleSubmitBill(e: React.FormEvent) {
    e.preventDefault();
    if (!billForm.accountNumber || !billForm.amount) {
      alert("Please fill in account number and amount");
      return;
    }
    setStep("confirm");
  }

  function handleConfirmPayment() {
    setStep("success");
  }

  function handleReset() {
    setSelectedProvider(null);
    setStep("select");
    setBillForm({ accountNumber: "", customerName: "", amount: "", phone: "" });
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">
            ← Services
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="font-medium">Pay Bills</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            💳 Pay{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Bills
            </span>
          </h1>
          <p className="text-zinc-400">Pay electricity, water, internet, and more with Pi cryptocurrency</p>
        </div>

        {step === "select" && (
          <>
            {/* Category Filter */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    category === cat.key
                      ? "bg-emerald-500 text-black"
                      : "border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.16]"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Provider Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleSelectProvider(provider)}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-left transition-all hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-2xl">
                    {provider.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">{provider.name}</h3>
                    <p className="text-sm text-zinc-500 truncate">{provider.description}</p>
                    <span className="mt-1 inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-xs capitalize text-zinc-400">
                      {provider.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Bill Payment Form */}
        {step === "form" && selectedProvider && (
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.06] text-3xl">
                  {selectedProvider.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{selectedProvider.name}</h2>
                  <p className="text-sm text-zinc-500">{selectedProvider.description}</p>
                </div>
              </div>

              <form onSubmit={handleSubmitBill} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">
                    ACCOUNT / METER NUMBER *
                  </label>
                  <input
                    type="text"
                    value={billForm.accountNumber}
                    onChange={(e) => setBillForm({ ...billForm, accountNumber: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">CUSTOMER NAME</label>
                  <input
                    type="text"
                    value={billForm.customerName}
                    onChange={(e) => setBillForm({ ...billForm, customerName: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    placeholder="Account holder name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">AMOUNT (π) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">π</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={billForm.amount}
                      onChange={(e) => setBillForm({ ...billForm, amount: e.target.value })}
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">PHONE (for receipt)</label>
                  <input
                    type="tel"
                    value={billForm.phone}
                    onChange={(e) => setBillForm({ ...billForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-emerald-500"
                    placeholder="+255 700 000 000"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 rounded-lg border border-white/[0.08] py-3 text-sm font-medium hover:bg-white/[0.04]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-emerald-500 py-3 text-sm font-bold text-black hover:bg-emerald-400"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === "confirm" && selectedProvider && (
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h2 className="mb-6 text-center text-xl font-bold">Confirm Payment</h2>

              <div className="mb-6 space-y-3 rounded-xl bg-white/[0.03] p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Provider</span>
                  <span className="font-medium">{selectedProvider.icon} {selectedProvider.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Account</span>
                  <span className="font-mono">{billForm.accountNumber}</span>
                </div>
                {billForm.customerName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Name</span>
                    <span>{billForm.customerName}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Service Fee</span>
                  <span>1.00 π</span>
                </div>
                <div className="border-t border-white/[0.06] pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-emerald-400">{(parseFloat(billForm.amount) + 1).toFixed(2)} π <span className="text-xs text-zinc-400 font-normal">&asymp; {formatUsd(parseFloat(billForm.amount) + 1)}</span></span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 rounded-lg border border-white/[0.08] py-3 text-sm font-medium hover:bg-white/[0.04]"
                >
                  Edit
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 rounded-lg bg-emerald-500 py-3 text-sm font-bold text-black hover:bg-emerald-400"
                >
                  Pay {(parseFloat(billForm.amount) + 1).toFixed(2)} π
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {step === "success" && selectedProvider && (
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">
                ✅
              </div>
              <h2 className="mb-2 text-2xl font-bold">Payment Successful!</h2>
              <p className="mb-1 text-zinc-400">
                {selectedProvider.name} · {billForm.accountNumber}
              </p>
              <p className="mb-6 text-3xl font-bold text-emerald-400">
                {(parseFloat(billForm.amount) + 1).toFixed(2)} π
                <span className="block text-sm text-zinc-400 font-normal">&asymp; {formatUsd(parseFloat(billForm.amount) + 1)}</span>
              </p>
              <div className="mb-6 rounded-lg bg-white/[0.03] p-4 text-sm text-zinc-500">
                <p>Reference: BILL-{Date.now().toString(36).toUpperCase()}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                {billForm.phone && <p>Receipt sent to: {billForm.phone}</p>}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-lg border border-white/[0.08] py-3 text-sm font-medium hover:bg-white/[0.04]"
                >
                  Pay Another Bill
                </button>
                <button
                  onClick={() => copyText(`BILL-${Date.now().toString(36).toUpperCase()}`)}
                  className="rounded-lg border border-white/[0.08] px-4 py-3 text-sm font-medium hover:bg-white/[0.04]" title="Copy Ref"
                >
                  📋
                </button>
                <button
                  onClick={() => openShareDialog("Bill Paid!", `I just paid my ${selectedProvider?.name} bill of ${(parseFloat(billForm.amount) + 1).toFixed(2)} π on Omenda Pi Pays!`)}
                  className="rounded-lg bg-emerald-500 px-4 py-3 text-sm font-bold text-black hover:bg-emerald-400" title="Share"
                >
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
