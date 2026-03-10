"use client";

import { useState } from "react";
import { billProviders } from "@/lib/data";
import type { BillProvider } from "@/lib/types";

const emptyProvider: Omit<BillProvider, "id"> = {
  name: "",
  icon: "💳",
  category: "electricity",
  description: "",
};

export default function AdminBills() {
  const [providers, setProviders] = useState<BillProvider[]>(billProviders);
  const [editing, setEditing] = useState<BillProvider | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<BillProvider, "id">>(emptyProvider);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");

  const categories = ["all", "electricity", "water", "internet", "tv", "phone", "insurance"];

  const filtered = providers.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  // Payment history mock
  const payments = [
    { id: "BP-001", user: "John M.", provider: "TANESCO", amount: 45, date: "2026-03-08", status: "completed" },
    { id: "BP-002", user: "Amina K.", provider: "DAWASCO", amount: 22, date: "2026-03-08", status: "completed" },
    { id: "BP-003", user: "Peter N.", provider: "Vodacom", amount: 25, date: "2026-03-07", status: "completed" },
    { id: "BP-004", user: "Grace W.", provider: "DSTV", amount: 30, date: "2026-03-06", status: "failed" },
    { id: "BP-005", user: "Ali R.", provider: "Kenya Power", amount: 60, date: "2026-03-06", status: "completed" },
    { id: "BP-006", user: "Fatma H.", provider: "Raha Fiber", amount: 35, date: "2026-03-05", status: "completed" },
  ];

  function openCreate() {
    setForm(emptyProvider);
    setEditing(null);
    setCreating(true);
  }

  function openEdit(prov: BillProvider) {
    setForm({ name: prov.name, icon: prov.icon, category: prov.category, description: prov.description });
    setEditing(prov);
    setCreating(true);
  }

  function handleSave() {
    if (editing) {
      setProviders((prev) => prev.map((p) => (p.id === editing.id ? { ...form, id: editing.id } : p)));
    } else {
      setProviders((prev) => [...prev, { ...form, id: `b${Date.now()}` }]);
    }
    setCreating(false);
    setEditing(null);
  }

  function handleDelete(id: string) {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bill Providers</h1>
          <p className="text-sm text-zinc-500">{providers.length} providers · {categories.length - 1} categories</p>
        </div>
        <button onClick={openCreate} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-violet-700">
          + Add Provider
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input type="text" placeholder="Search providers..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500/50" />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilterCat(c)} className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors ${filterCat === c ? "bg-violet-600 text-white" : "text-zinc-400 hover:bg-white/[0.06]"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Providers Grid */}
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prov) => (
          <div key={prov.id} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-lg">{prov.icon}</span>
              <div>
                <div className="text-sm font-semibold">{prov.name}</div>
                <div className="text-[11px] capitalize text-zinc-500">{prov.category} · {prov.description}</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => openEdit(prov)} className="rounded-lg bg-white/[0.06] p-2 text-xs text-zinc-400 hover:bg-white/[0.12] hover:text-white">✏️</button>
              <button onClick={() => handleDelete(prov.id)} className="rounded-lg bg-rose-500/10 p-2 text-xs text-rose-400 hover:bg-rose-500/20">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bill Payments */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <div className="border-b border-white/[0.06] px-6 py-4">
          <h3 className="text-sm font-bold">Recent Bill Payments</h3>
          <p className="text-xs text-zinc-500">Payment transactions history</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-xs text-zinc-500">
                <th className="px-6 py-3 font-medium">ID</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Provider</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-6 py-3 font-mono text-sm text-zinc-300">{p.id}</td>
                  <td className="px-6 py-3 text-sm">{p.user}</td>
                  <td className="px-6 py-3 text-sm text-zinc-400">{p.provider}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-amber-400">{p.amount} π</td>
                  <td className="px-6 py-3 text-sm text-zinc-500">{p.date}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.status === "completed" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCreating(false)}>
          <div className="relative mx-4 w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111113] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-lg font-bold">{editing ? "Edit Provider" : "Add New Provider"}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Icon (emoji)</label>
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as BillProvider["category"] })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
                    <option value="electricity">Electricity</option>
                    <option value="water">Water</option>
                    <option value="internet">Internet</option>
                    <option value="tv">TV</option>
                    <option value="phone">Phone</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Description</label>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setCreating(false)} className="rounded-xl px-5 py-2.5 text-sm text-zinc-400 hover:text-white">Cancel</button>
              <button onClick={handleSave} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-700">
                {editing ? "Save Changes" : "Add Provider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
