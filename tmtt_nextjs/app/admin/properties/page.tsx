"use client";

import { useState } from "react";
import { properties } from "@/lib/data";
import type { Property } from "@/lib/types";

const emptyProperty: Omit<Property, "id"> = {
  title: "",
  location: "",
  price: 0,
  image: "",
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  type: "house",
  description: "",
  featured: false,
};

export default function AdminProperties() {
  const [propList, setPropList] = useState<Property[]>(properties);
  const [editing, setEditing] = useState<Property | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Property, "id">>(emptyProperty);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = propList.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || p.type === filterType;
    return matchSearch && matchType;
  });

  function openCreate() {
    setForm(emptyProperty);
    setEditing(null);
    setCreating(true);
  }

  function openEdit(prop: Property) {
    setForm({ ...prop });
    setEditing(prop);
    setCreating(true);
  }

  function handleSave() {
    if (editing) {
      setPropList((prev) => prev.map((p) => (p.id === editing.id ? { ...form, id: editing.id } : p)));
    } else {
      setPropList((prev) => [...prev, { ...form, id: `p${Date.now()}` }]);
    }
    setCreating(false);
    setEditing(null);
  }

  function handleDelete(id: string) {
    setPropList((prev) => prev.filter((p) => p.id !== id));
  }

  function toggleFeatured(id: string) {
    setPropList((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Properties Management</h1>
          <p className="text-sm text-zinc-500">{propList.length} properties listed · {propList.filter((p) => p.featured).length} featured</p>
        </div>
        <button onClick={openCreate} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-violet-700">
          + Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
        />
        <div className="flex gap-2">
          {["all", "house", "apartment", "land", "commercial"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors ${
                filterType === t ? "bg-violet-600 text-white" : "text-zinc-400 hover:bg-white/[0.06]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prop) => (
          <div key={prop.id} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
            <div className="relative">
              <img src={prop.image} alt={prop.title} className="h-40 w-full object-cover" />
              {prop.featured && (
                <span className="absolute left-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-bold text-black">FEATURED</span>
              )}
              <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold capitalize text-white backdrop-blur">{prop.type}</span>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-sm font-bold">{prop.title}</h3>
              <p className="mb-2 text-xs text-zinc-500">{prop.location}</p>
              <div className="mb-3 flex items-center gap-3 text-xs text-zinc-400">
                {prop.bedrooms > 0 && <span>{prop.bedrooms} bed</span>}
                {prop.bathrooms > 0 && <span>{prop.bathrooms} bath</span>}
                <span>{prop.area} m²</span>
              </div>
              <div className="mb-3 text-lg font-bold text-amber-400">{prop.price.toLocaleString()} π</div>
              <div className="flex gap-2">
                <button onClick={() => toggleFeatured(prop.id)} className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium ${prop.featured ? "bg-amber-500/15 text-amber-400" : "bg-white/[0.06] text-zinc-400"}`}>
                  {prop.featured ? "★ Featured" : "☆ Feature"}
                </button>
                <button onClick={() => openEdit(prop)} className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/[0.12]">Edit</button>
                <button onClick={() => handleDelete(prop.id)} className="rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/20">Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-center text-sm text-zinc-500">No properties found</div>
      )}

      {/* Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCreating(false)}>
          <div className="relative mx-4 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111113] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-lg font-bold">{editing ? "Edit Property" : "Add New Property"}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Location</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Property["type"] })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Price (π)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Bedrooms</label>
                  <input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Bathrooms</label>
                  <input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Area (m²)</label>
                  <input type="number" value={form.area} onChange={(e) => setForm({ ...form, area: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Image URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 rounded accent-violet-600" />
                <span className="text-sm text-zinc-400">Featured property</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setCreating(false)} className="rounded-xl px-5 py-2.5 text-sm text-zinc-400 hover:text-white">Cancel</button>
              <button onClick={handleSave} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-700">
                {editing ? "Save Changes" : "Create Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
