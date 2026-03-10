"use client";

import { useState } from "react";
import Link from "next/link";
import { hotels } from "@/lib/data";
import { PiButton } from "@/components/PiButton";
import { usePiSdk } from "@/hooks/usePiSdk";
import { useGcv } from "@/components/GcvProvider";

type HotelFilter = "all" | "luxury" | "standard" | "budget";

export default function HotelsPage() {
  const [filter, setFilter] = useState<HotelFilter>("all");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { openShareDialog, copyText, requestAd, showAd } = usePiSdk();
  const { formatUsd } = useGcv();

  const filtered = filter === "all" ? hotels : hotels.filter((h) => h.type === filter);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
      : 1;

  const selected = hotels.find((h) => h.id === selectedHotel);

  function handleBook() {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    setBookingConfirmed(true);
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
          <span className="font-medium">Hotels</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            🏨 Rent a{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              Hotel
            </span>
          </h1>
          <p className="text-zinc-400">Book hotels across East Africa and pay with Pi cryptocurrency</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">CHECK IN</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">CHECK OUT</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">GUESTS</label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="bg-zinc-900">{n} Guest{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold transition-colors hover:bg-violet-700">
              Search Hotels
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {(["all", "luxury", "standard", "budget"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-violet-600 text-white"
                  : "border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.16]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Hotel Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => setSelectedHotel(hotel.id)}
              className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-2xl ${
                selectedHotel === hotel.id
                  ? "border-violet-500 shadow-violet-500/10 shadow-lg"
                  : "border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold capitalize backdrop-blur">
                  {hotel.type}
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-black backdrop-blur">
                  ★ {hotel.rating}
                </div>
              </div>
              <div className="bg-white/[0.03] p-5">
                <h3 className="mb-1 font-bold">{hotel.name}</h3>
                <p className="mb-2 text-sm text-zinc-500">📍 {hotel.location}</p>
                <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{hotel.description}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {hotel.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="rounded-md bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-400">
                      {a}
                    </span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-500">
                      +{hotel.amenities.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <div>
                    <span className="text-xl font-bold text-amber-400">{hotel.pricePerNight} π</span>
                    <span className="text-xs text-zinc-500"> / night</span>
                    <span className="block text-xs text-zinc-500">&asymp; {formatUsd(hotel.pricePerNight)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotel(hotel.id);
                    }}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-violet-700"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openShareDialog(hotel.name, `Check out ${hotel.name} in ${hotel.location} — ${hotel.pricePerNight} π/night on Omenda Pi Pays!`);
                    }}
                    className="rounded-lg border border-white/[0.08] px-3 py-2 text-sm transition-colors hover:bg-white/[0.06]" title="Share"
                  >
                    📤
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Panel */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111114] p-6">
              {bookingConfirmed ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-3xl">
                    ✅
                  </div>
                  <h2 className="mb-2 text-2xl font-bold">Booking Confirmed!</h2>
                  <p className="mb-2 text-zinc-400">{selected.name}</p>
                  <p className="mb-1 text-sm text-zinc-500">{checkIn} → {checkOut} · {guests} guest{guests > 1 ? "s" : ""}</p>
                  <p className="mb-6 text-2xl font-bold text-amber-400">{selected.pricePerNight * nights} π <span className="text-sm text-zinc-400">&asymp; {formatUsd(selected.pricePerNight * nights)}</span></p>
                  <p className="mb-6 text-sm text-zinc-500">Ref: HTL-{Date.now().toString(36).toUpperCase()}</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => { setBookingConfirmed(false); setSelectedHotel(null); }}
                      className="rounded-lg border border-white/[0.08] px-6 py-2.5 text-sm font-medium hover:bg-white/[0.04]"
                    >
                      Browse More
                    </button>
                    <button
                      onClick={() => copyText(`HTL-${Date.now().toString(36).toUpperCase()}`)}
                      className="rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm font-medium hover:bg-white/[0.04]" title="Copy Reference"
                    >
                      📋 Copy Ref
                    </button>
                    <button
                      onClick={() => openShareDialog("Booking Confirmed!", `I just booked ${selected.name} for ${selected.pricePerNight * nights} π on Omenda Pi Pays!`)}
                      className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold hover:bg-violet-700"
                    >
                      📤 Share
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Book {selected.name}</h2>
                    <button
                      onClick={() => setSelectedHotel(null)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mb-4 rounded-xl bg-white/[0.03] p-4">
                    <p className="text-sm text-zinc-400">📍 {selected.location}</p>
                    <p className="text-sm text-zinc-400">★ {selected.rating} · {selected.type} · {selected.rooms} rooms</p>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">CHECK IN</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">CHECK OUT</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>
                  <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">{selected.pricePerNight} π × {nights} night{nights > 1 ? "s" : ""}</span>
                      <span>{selected.pricePerNight * nights} π</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-zinc-400">Service fee</span>
                      <span>{Math.round(selected.pricePerNight * nights * 0.05)} π</span>
                    </div>
                    <div className="mt-3 flex justify-between border-t border-white/[0.06] pt-3 font-bold">
                      <span>Total</span>
                      <span className="text-amber-400">
                        {selected.pricePerNight * nights + Math.round(selected.pricePerNight * nights * 0.05)} π
                        <span className="block text-xs text-zinc-400 font-normal">&asymp; {formatUsd(selected.pricePerNight * nights + Math.round(selected.pricePerNight * nights * 0.05))}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedHotel(null)}
                      className="flex-1 rounded-lg border border-white/[0.08] py-2.5 text-sm font-medium hover:bg-white/[0.04]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBook}
                      className="flex-1 rounded-lg bg-violet-600 py-2.5 text-sm font-semibold hover:bg-violet-700"
                    >
                      Pay with π
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
