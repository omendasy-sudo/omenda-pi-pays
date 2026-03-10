"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "@/lib/data";
import { usePiSdk } from "@/hooks/usePiSdk";
import { useGcv } from "@/components/GcvProvider";

type PropertyFilter = "all" | "house" | "apartment" | "land" | "commercial";

export default function HomesPage() {
  const [filter, setFilter] = useState<PropertyFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const filtered = properties
    .filter((p) => filter === "all" || p.type === filter)
    .filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())
    );

  const selected = properties.find((p) => p.id === selectedProperty);
  const { openShareDialog, copyText, openConversation } = usePiSdk();
  const { formatUsd } = useGcv();

  function handleInquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number");
      return;
    }
    setInquirySent(true);
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
          <span className="font-medium">Buy Home</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            🏠 Buy a{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Home
            </span>
          </h1>
          <p className="text-zinc-400">Find houses, apartments, land, and commercial properties — pay with Pi</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by location or property name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-amber-500"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "house", "apartment", "land", "commercial"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-amber-500 text-black"
                  : "border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.16]"
              }`}
            >
              {f === "all" ? "All Properties" : f}
            </button>
          ))}
        </div>

        {/* Featured */}
        {filter === "all" && !search && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-amber-400">⭐ Featured Properties</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties
                .filter((p) => p.featured)
                .map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    prop={prop}
                    selected={selectedProperty === prop.id}
                    onSelect={() => setSelectedProperty(prop.id)}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Properties */}
        <h2 className="mb-4 text-lg font-bold">
          {filter === "all" ? "All Properties" : filter.charAt(0).toUpperCase() + filter.slice(1) + "s"}
          <span className="ml-2 text-sm font-normal text-zinc-500">({filtered.length})</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prop) => (
            <PropertyCard
              key={prop.id}
              prop={prop}
              selected={selectedProperty === prop.id}
              onSelect={() => setSelectedProperty(prop.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-zinc-500">
            <div className="text-4xl mb-4">🔍</div>
            No properties found. Try a different filter.
          </div>
        )}

        {/* Inquiry Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111114] p-6 max-h-[90vh] overflow-y-auto">
              {inquirySent ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-3xl">
                    ✅
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">Inquiry Submitted!</h2>
                  <p className="mb-2 text-zinc-400">{selected.title}</p>
                  <p className="mb-1 text-sm text-zinc-500">📍 {selected.location}</p> <span className="text-sm text-zinc-400">&asymp; {formatUsd(selected.price)}</span>
                  <p className="mb-6 text-2xl font-bold text-amber-400">{selected.price.toLocaleString()} π</p>
                  <p className="mb-6 text-sm text-zinc-500">Ref: PROP-{Date.now().toString(36).toUpperCase()}</p>
                  <p className="mb-6 text-sm text-zinc-400">Our agent will contact you within 24 hours.</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => { setInquirySent(false); setSelectedProperty(null); setFormData({ name: "", phone: "", message: "" }); }}
                      className="rounded-lg border border-white/[0.08] px-6 py-2.5 text-sm font-medium hover:bg-white/[0.04]"
                    >
                      Browse More
                    </button>
                    <button
                      onClick={() => copyText(`PROP-${Date.now().toString(36).toUpperCase()}`)}
                      className="rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm font-medium hover:bg-white/[0.04]" title="Copy Ref"
                    >
                      📋 Copy Ref
                    </button>
                    <button
                      onClick={() => openShareDialog("Property Inquiry", `Check out ${selected.title} in ${selected.location} — ${selected.price.toLocaleString()} π on Omenda Pi Pays!`)}
                      className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-black hover:bg-amber-400"
                    >
                      📤 Share
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Property Inquiry</h2>
                    <button
                      onClick={() => setSelectedProperty(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={selected.image} alt={selected.title} className="h-40 w-full object-cover" />
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold">{selected.title}</h3>
                    <p className="text-sm text-zinc-400">📍 {selected.location}</p>
                    <div className="mt-2 flex gap-3 text-sm text-zinc-500">
                      {selected.bedrooms > 0 && <span>🛏 {selected.bedrooms} bed</span>}
                      {selected.bathrooms > 0 && <span>🚿 {selected.bathrooms} bath</span>}
                      <span>📐 {selected.area} m²</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">{selected.description}</p> <span className="text-sm text-zinc-400">&asymp; {formatUsd(selected.price)}</span>
                    <p className="mt-3 text-2xl font-bold text-amber-400">{selected.price.toLocaleString()} π</p>
                  </div>

                  <form onSubmit={handleInquiry} className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">YOUR NAME *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-amber-500"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">PHONE NUMBER *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-amber-500"
                        placeholder="+255 700 000 000"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">MESSAGE</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-amber-500"
                        rows={3}
                        placeholder="I'm interested in this property..."
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(null)}
                        className="flex-1 rounded-lg border border-white/[0.08] py-2.5 text-sm font-medium hover:bg-white/[0.04]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-black hover:bg-amber-400"
                      >
                        Submit Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => openConversation(`property-${selected?.id}`)}
                        className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2.5 text-sm font-medium text-violet-400 hover:bg-violet-500/20" title="Chat with Agent"
                      >
                        💬
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({
  prop,
  selected,
  onSelect,
}: {
  prop: (typeof properties)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  const { formatUsd } = useGcv();
  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-2xl ${
        selected
          ? "border-amber-500 shadow-amber-500/10 shadow-lg"
          : "border-white/[0.06] hover:border-white/[0.12]"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={prop.image}
          alt={prop.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold capitalize backdrop-blur">
          {prop.type}
        </div>
        {prop.featured && (
          <div className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-black backdrop-blur">
            ⭐ Featured
          </div>
        )}
      </div>
      <div className="bg-white/[0.03] p-5">
        <h3 className="mb-1 font-bold">{prop.title}</h3>
        <p className="mb-3 text-sm text-zinc-500">📍 {prop.location}</p>
        <div className="mb-4 flex gap-3 text-sm text-zinc-400">
          {prop.bedrooms > 0 && <span>🛏 {prop.bedrooms}</span>}
          {prop.bathrooms > 0 && <span>🚿 {prop.bathrooms}</span>}
          <span>📐 {prop.area} m²</span>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div><span className="text-xl font-bold text-amber-400">{prop.price.toLocaleString()} π</span><span className="block text-xs text-zinc-500">&asymp; {formatUsd(prop.price)}</span></div>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-black hover:bg-amber-400"
          >
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
}
