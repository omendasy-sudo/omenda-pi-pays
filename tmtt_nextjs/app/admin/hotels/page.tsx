"use client";

import { useState } from "react";
import { hotels } from "@/lib/data";
import type { Hotel } from "@/lib/types";

const emptyHotel: Omit<Hotel, "id"> = {
  name: "",
  location: "",
  rating: 4.0,
  pricePerNight: 0,
  image: "",
  amenities: [],
  description: "",
  rooms: 0,
  type: "standard",
};

export default function AdminHotels() {
  const [hotelList, setHotelList] = useState<Hotel[]>(hotels);
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Hotel, "id">>(emptyHotel);
  const [amenityInput, setAmenityInput] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = hotelList.filter((h) => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || h.type === filterType;
    return matchSearch && matchType;
  });

  function openCreate() {
    setForm(emptyHotel);
    setEditing(null);
    setCreating(true);
  }

  function openEdit(hotel: Hotel) {
    setForm({ ...hotel });
    setEditing(hotel);
    setCreating(true);
  }

  function handleSave() {
    if (editing) {
      setHotelList((prev) => prev.map((h) => (h.id === editing.id ? { ...form, id: editing.id } : h)));
    } else {
      setHotelList((prev) => [...prev, { ...form, id: `h${Date.now()}` }]);
    }
    setCreating(false);
    setEditing(null);
  }

  function handleDelete(id: string) {
    setHotelList((prev) => prev.filter((h) => h.id !== id));
  }

  function addAmenity() {
    if (amenityInput.trim() && !form.amenities.includes(amenityInput.trim())) {
      setForm({ ...form, amenities: [...form.amenities, amenityInput.trim()] });
      setAmenityInput("");
    }
  }

  function removeAmenity(a: string) {
    setForm({ ...form, amenities: form.amenities.filter((x) => x !== a) });
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hotels Management</h1>
          <p className="text-sm text-zinc-500">{hotelList.length} hotels listed</p>
        </div>
        <button onClick={openCreate} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-violet-700">
          + Add Hotel
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search hotels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
        />
        <div className="flex gap-2">
          {["all", "luxury", "standard", "budget"].map((t) => (
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-xs text-zinc-500">
                <th className="px-5 py-3 font-medium">Hotel</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Price/Night</th>
                <th className="px-5 py-3 font-medium">Rooms</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((hotel) => (
                <tr key={hotel.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={hotel.image} alt={hotel.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="text-sm font-medium">{hotel.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-zinc-400">{hotel.location}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                      hotel.type === "luxury" ? "bg-amber-500/15 text-amber-400" :
                      hotel.type === "standard" ? "bg-blue-500/15 text-blue-400" :
                      "bg-zinc-500/15 text-zinc-400"
                    }`}>{hotel.type}</span>
                  </td>
                  <td className="px-5 py-3 text-sm">⭐ {hotel.rating}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-amber-400">{hotel.pricePerNight} π</td>
                  <td className="px-5 py-3 text-sm text-zinc-400">{hotel.rooms}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(hotel)} className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/[0.12]">Edit</button>
                      <button onClick={() => handleDelete(hotel.id)} className="rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/20">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No hotels found</div>
        )}
      </div>

      {/* Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCreating(false)}>
          <div className="relative mx-4 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111113] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-lg font-bold">{editing ? "Edit Hotel" : "Add New Hotel"}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Location</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Hotel["type"] })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
                    <option value="luxury">Luxury</option>
                    <option value="standard">Standard</option>
                    <option value="budget">Budget</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Price/Night (π)</label>
                  <input type="number" value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Rooms</label>
                  <input type="number" value={form.rooms} onChange={(e) => setForm({ ...form, rooms: parseInt(e.target.value) || 0 })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50" />
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
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Amenities</label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {form.amenities.map((a) => (
                    <span key={a} className="flex items-center gap-1 rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-400">
                      {a}
                      <button onClick={() => removeAmenity(a)} className="ml-1 text-violet-300 hover:text-white">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())} placeholder="Add amenity..." className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm outline-none focus:border-violet-500/50" />
                  <button onClick={addAmenity} className="rounded-xl bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.12]">Add</button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setCreating(false)} className="rounded-xl px-5 py-2.5 text-sm text-zinc-400 hover:text-white">Cancel</button>
              <button onClick={handleSave} className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-700">
                {editing ? "Save Changes" : "Create Hotel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
