"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    siteName: "Omenda Pi Pays",
    tagline: "Decentralized Services Marketplace",
    contactEmail: "admin@omendapipays.com",
    supportPhone: "+255 700 000 000",
    currency: "π (Pi)",
    timezone: "Africa/Dar_es_Salaam",
    language: "en",
    maintenanceMode: false,
  });

  const [fees, setFees] = useState({
    hotelServiceFee: 5,
    billServiceFee: 1,
    propertyServiceFee: 2,
    minTransaction: 1,
    maxTransaction: 1000000,
  });

  const [notifications, setNotifications] = useState({
    emailNewOrder: true,
    emailCancellation: true,
    emailNewUser: false,
    emailDailyReport: true,
    pushNewOrder: true,
    pushPaymentReceived: true,
  });

  const [pi, setPi] = useState({
    apiKey: "pi_live_**********",
    sandboxMode: false,
    autoApprove: false,
    webhookUrl: "https://omendapipays.com/api/pi_payment",
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "fees", label: "Fees & Pricing", icon: "💰" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "pi", label: "Pi Network", icon: "🔗" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-zinc-500">Configure your platform</p>
        </div>
        <button
          onClick={handleSave}
          className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
            saved ? "bg-emerald-600 text-white" : "bg-violet-600 text-white hover:bg-violet-700"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-violet-600 text-white"
                : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-bold">Platform Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Site Name</label>
                  <input value={general.siteName} onChange={(e) => setGeneral({ ...general, siteName: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Tagline</label>
                  <input value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Contact Email</label>
                    <input value={general.contactEmail} onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Support Phone</label>
                    <input value={general.supportPhone} onChange={(e) => setGeneral({ ...general, supportPhone: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Timezone</label>
                    <select value={general.timezone} onChange={(e) => setGeneral({ ...general, timezone: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
                      <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam</option>
                      <option value="Africa/Nairobi">Africa/Nairobi</option>
                      <option value="Africa/Kampala">Africa/Kampala</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-400">Language</label>
                    <select value={general.language} onChange={(e) => setGeneral({ ...general, language: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-bold">System</h3>
              <label className="flex cursor-pointer items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Maintenance Mode</div>
                  <div className="text-xs text-zinc-500">Temporarily disable the platform for maintenance</div>
                </div>
                <div className={`relative h-6 w-11 rounded-full transition-colors ${general.maintenanceMode ? "bg-rose-600" : "bg-zinc-700"}`} onClick={() => setGeneral({ ...general, maintenanceMode: !general.maintenanceMode })}>
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${general.maintenanceMode ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Fees Settings */}
        {activeTab === "fees" && (
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
            <h3 className="mb-4 text-sm font-bold">Service Fees</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Hotel Booking Fee (%)</label>
                <input type="number" value={fees.hotelServiceFee} onChange={(e) => setFees({ ...fees, hotelServiceFee: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                <p className="mt-1 text-[11px] text-zinc-500">Applied to total booking amount</p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Bill Payment Fee (π per transaction)</label>
                <input type="number" value={fees.billServiceFee} onChange={(e) => setFees({ ...fees, billServiceFee: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                <p className="mt-1 text-[11px] text-zinc-500">Flat fee added to each bill payment</p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Property Inquiry Fee (%)</label>
                <input type="number" value={fees.propertyServiceFee} onChange={(e) => setFees({ ...fees, propertyServiceFee: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Min Transaction (π)</label>
                  <input type="number" value={fees.minTransaction} onChange={(e) => setFees({ ...fees, minTransaction: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Max Transaction (π)</label>
                  <input type="number" value={fees.maxTransaction} onChange={(e) => setFees({ ...fees, maxTransaction: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-bold">Email Notifications</h3>
              <div className="space-y-3">
                {([
                  ["emailNewOrder", "New Order", "Get notified when a new order is placed"],
                  ["emailCancellation", "Order Cancellation", "Get notified when an order is cancelled"],
                  ["emailNewUser", "New User Registration", "Get notified when a new user signs up"],
                  ["emailDailyReport", "Daily Report", "Receive a daily summary email"],
                ] as const).map(([key, label, desc]) => (
                  <label key={key} className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-white/[0.02]">
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-zinc-500">{desc}</div>
                    </div>
                    <div className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? "bg-violet-600" : "bg-zinc-700"}`} onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}>
                      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${notifications[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-bold">Push Notifications</h3>
              <div className="space-y-3">
                {([
                  ["pushNewOrder", "New Order Alert", "Push notification for new orders"],
                  ["pushPaymentReceived", "Payment Received", "Push notification for Pi payments"],
                ] as const).map(([key, label, desc]) => (
                  <label key={key} className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-white/[0.02]">
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-zinc-500">{desc}</div>
                    </div>
                    <div className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? "bg-violet-600" : "bg-zinc-700"}`} onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}>
                      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${notifications[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pi Network Settings */}
        {activeTab === "pi" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-bold">Pi Network Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">API Key</label>
                  <input type="password" value={pi.apiKey} onChange={(e) => setPi({ ...pi, apiKey: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 font-mono text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Webhook URL</label>
                  <input value={pi.webhookUrl} onChange={(e) => setPi({ ...pi, webhookUrl: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 font-mono text-sm outline-none focus:border-violet-500/50" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
              <h3 className="mb-4 text-sm font-bold">Payment Options</h3>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium">Sandbox Mode</div>
                    <div className="text-xs text-zinc-500">Use Pi testnet for development</div>
                  </div>
                  <div className={`relative h-6 w-11 rounded-full transition-colors ${pi.sandboxMode ? "bg-amber-600" : "bg-zinc-700"}`} onClick={() => setPi({ ...pi, sandboxMode: !pi.sandboxMode })}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${pi.sandboxMode ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-white/[0.02]">
                  <div>
                    <div className="text-sm font-medium">Auto-Approve Payments</div>
                    <div className="text-xs text-zinc-500">Automatically approve incoming Pi payments</div>
                  </div>
                  <div className={`relative h-6 w-11 rounded-full transition-colors ${pi.autoApprove ? "bg-violet-600" : "bg-zinc-700"}`} onClick={() => setPi({ ...pi, autoApprove: !pi.autoApprove })}>
                    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${pi.autoApprove ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
              <h3 className="mb-2 text-sm font-bold text-amber-400">⚠️ Pi SDK Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">SDK Version</span>
                  <span className="font-medium">v2.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Network</span>
                  <span className="font-medium text-emerald-400">{pi.sandboxMode ? "Testnet" : "Mainnet"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Connection</span>
                  <span className="font-medium text-emerald-400">● Connected</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
