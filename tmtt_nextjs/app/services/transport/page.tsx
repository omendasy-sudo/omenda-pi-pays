"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { useGcv } from "@/components/GcvProvider";

type Tab = "rides" | "taxi" | "driver" | "delivery" | "airways";

const rideOptions = [
  { id: "economy", icon: "🚗", name: "Economy", desc: "Affordable everyday rides. Sedans with AC.", features: ["AC", "4 seats", "GPS Tracking"], price: "3-8 π", badge: "Popular", badgeColor: "bg-amber-400/10 text-amber-400" },
  { id: "comfort", icon: "🚙", name: "Comfort Plus", desc: "Spacious SUVs with extra legroom and premium interiors.", features: ["Premium", "6 seats", "WiFi", "Water"], price: "8-15 π", badge: "", badgeColor: "" },
  { id: "luxury", icon: "🏎️", name: "Luxury", desc: "Executive cars for business trips and VIP transport.", features: ["Executive", "4 seats", "WiFi", "Drinks", "Privacy"], price: "15-30 π", badge: "Premium", badgeColor: "bg-violet-600/10 text-violet-300" },
  { id: "minibus", icon: "🚐", name: "Minibus", desc: "Group travel for events, tours, or family trips.", features: ["12 seats", "AC", "Luggage"], price: "10-25 π", badge: "", badgeColor: "" },
  { id: "moto", icon: "🏍️", name: "Boda / Motorbike", desc: "Quick motorcycle rides to beat city traffic.", features: ["1 rider", "Fast", "Helmet"], price: "1-4 π", badge: "Popular", badgeColor: "bg-amber-400/10 text-amber-400" },
  { id: "tuktuk", icon: "🛺", name: "Tuk-Tuk", desc: "Fun three-wheeler rides for short city trips.", features: ["3 seats", "Open air", "Affordable"], price: "2-5 π", badge: "New", badgeColor: "bg-green-500/10 text-green-400" },
];

const taxiOptions = [
  { id: "city-taxi", icon: "🚕", name: "City Taxi", desc: "Licensed city taxis with metered fares paid in Pi.", features: ["Metered", "Licensed", "24/7"], price: "3-10 π", badge: "Popular", badgeColor: "bg-amber-400/10 text-amber-400" },
  { id: "airport", icon: "✈️🚕", name: "Airport Transfer", desc: "Reliable airport pickup and drop-off service.", features: ["Flight tracking", "Meet & greet", "Luggage help"], price: "8-20 π", badge: "", badgeColor: "" },
  { id: "intercity", icon: "🛣️", name: "Intercity Taxi", desc: "Long-distance taxi between cities and towns.", features: ["AC", "Licensed", "Long haul"], price: "15-50 π", badge: "", badgeColor: "" },
  { id: "shared", icon: "👥", name: "Shared Ride", desc: "Share your ride with others heading the same way. Save Pi!", features: ["Shared", "Eco-friendly", "Save 40%"], price: "1-4 π", badge: "New", badgeColor: "bg-green-500/10 text-green-400" },
];

const driverOptions = [
  { id: "daily", icon: "👨‍✈️", name: "Daily Driver", desc: "Hire a personal driver for the full day.", features: ["8hrs", "Personal", "Flexible"], price: "20-35 π/day", badge: "Popular", badgeColor: "bg-amber-400/10 text-amber-400" },
  { id: "weekly", icon: "📅", name: "Weekly Package", desc: "Dedicated driver for 7 days. Best value.", features: ["7 days", "Dedicated", "Discount"], price: "100-180 π/week", badge: "Premium", badgeColor: "bg-violet-600/10 text-violet-300" },
  { id: "corporate", icon: "💼", name: "Corporate Driver", desc: "Professional chauffeur for business executives.", features: ["Suited", "Executive car", "Confidential"], price: "30-50 π/day", badge: "", badgeColor: "" },
  { id: "tour", icon: "🗺️", name: "Tour Guide Driver", desc: "Local driver who doubles as a city tour guide.", features: ["Multilingual", "Local knowledge", "Camera stops"], price: "25-40 π/day", badge: "New", badgeColor: "bg-green-500/10 text-green-400" },
];

const deliveryOptions = [
  { id: "express", icon: "⚡", name: "Express Delivery", desc: "Same-day delivery within the city. Under 2 hours.", features: ["< 2hrs", "Tracked", "Insured"], price: "2-5 π", badge: "Popular", badgeColor: "bg-amber-400/10 text-amber-400" },
  { id: "standard", icon: "📦", name: "Standard Delivery", desc: "Affordable delivery within 24 hours citywide.", features: ["24hrs", "Tracked", "Affordable"], price: "1-3 π", badge: "", badgeColor: "" },
  { id: "heavy", icon: "🚛", name: "Heavy Cargo", desc: "Large items and furniture delivery with a truck.", features: ["Truck", "Up to 500kg", "2 helpers"], price: "10-30 π", badge: "", badgeColor: "" },
  { id: "intercity-del", icon: "🌍", name: "Intercity Courier", desc: "Send packages between cities safely.", features: ["Intercity", "Insured", "48hrs"], price: "5-15 π", badge: "New", badgeColor: "bg-green-500/10 text-green-400" },
];

const flights = [
  { airline: "Kenya Airways", code: "KQ", icon: "🇰🇪", gradient: "from-green-700 to-green-600", from: "NBO", fromCity: "Nairobi", to: "DXB", toCity: "Dubai", duration: "5h 20m", stops: "Direct", price: "85 π" },
  { airline: "Ethiopian Airlines", code: "ET", icon: "🇪🇹", gradient: "from-green-700 to-green-500", from: "ADD", fromCity: "Addis Ababa", to: "LHR", toCity: "London", duration: "8h 15m", stops: "Direct", price: "120 π" },
  { airline: "Emirates", code: "EK", icon: "🇦🇪", gradient: "from-red-700 to-red-600", from: "DXB", fromCity: "Dubai", to: "JFK", toCity: "New York", duration: "13h 40m", stops: "Direct", price: "180 π" },
  { airline: "RwandAir", code: "WB", icon: "🇷🇼", gradient: "from-cyan-600 to-blue-600", from: "NBO", fromCity: "Nairobi", to: "EBB", toCity: "Entebbe", duration: "1h 05m", stops: "Direct", price: "25 π" },
  { airline: "Qatar Airways", code: "QR", icon: "🇶🇦", gradient: "from-red-900 to-red-800", from: "NBO", fromCity: "Nairobi", to: "NRT", toCity: "Tokyo", duration: "18h 30m", stops: "1 Stop (DOH)", price: "210 π" },
  { airline: "Turkish Airlines", code: "TK", icon: "🇹🇷", gradient: "from-red-600 to-red-500", from: "DAR", fromCity: "Dar es Salaam", to: "CDG", toCity: "Paris", duration: "12h 45m", stops: "1 Stop (IST)", price: "145 π" },
];

const tabs: { key: Tab; icon: string; label: string }[] = [
  { key: "rides", icon: "🚗", label: "City Rides" },
  { key: "taxi", icon: "🚕", label: "Taxi" },
  { key: "driver", icon: "👤", label: "Hire Driver" },
  { key: "delivery", icon: "📦", label: "Delivery" },
  { key: "airways", icon: "✈️", label: "Airways" },
];

function OptionCard({ o }: { o: typeof rideOptions[0] }) {
  const { formatUsd } = useGcv();
  // Extract first number from price like "3-8 π" or "20-35 π/day"
  const priceMatch = o.price.match(/([\d.]+)/);
  const piVal = priceMatch ? parseFloat(priceMatch[1]) : 0;
  return (
    <div className="group bg-[#111114] border border-white/[0.08] rounded-2xl p-6 cursor-pointer transition-all hover:border-cyan-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(6,182,212,0.1)]">
      <div className="flex justify-between items-start mb-3">
        <span className="text-4xl">{o.icon}</span>
        {o.badge && <span className={`px-3 py-1 rounded-full text-[0.6875rem] font-bold ${o.badgeColor}`}>{o.badge}</span>}
      </div>
      <h3 className="text-lg font-extrabold mb-1">{o.name}</h3>
      <p className="text-xs text-zinc-400 leading-relaxed mb-3">{o.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {o.features.map(f => <span key={f} className="px-2.5 py-1 rounded-full text-[0.6875rem] bg-white/[0.04] border border-white/[0.08] text-zinc-500">{f}</span>)}
      </div>
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[0.6875rem] text-zinc-500">Starting from</span>
          {piVal > 0 && <span className="block text-[0.625rem] text-zinc-600">&asymp; {formatUsd(piVal)}</span>}
        </div>
        <span className="text-lg font-extrabold text-cyan-400"><span className="text-amber-400">π</span> {o.price}</span>
      </div>
    </div>
  );
}

function FlightCard({ f }: { f: typeof flights[0] }) {
  const { formatUsd } = useGcv();
  const priceMatch = f.price.match(/([\d.]+)/);
  const piVal = priceMatch ? parseFloat(priceMatch[1]) : 0;
  return (
    <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.16] transition-all hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl`}>{f.icon}</div>
        <div>
          <h4 className="text-sm font-bold">{f.airline}</h4>
          <span className="text-[0.6875rem] text-zinc-500">{f.code}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl mb-3">
        <div className="text-center">
          <div className="text-lg font-extrabold">{f.from}</div>
          <div className="text-[0.6875rem] text-zinc-500">{f.fromCity}</div>
        </div>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-px bg-white/[0.08]" />
          <span className="text-cyan-400">✈️</span>
          <div className="flex-1 h-px bg-white/[0.08]" />
        </div>
        <div className="text-center">
          <div className="text-lg font-extrabold">{f.to}</div>
          <div className="text-[0.6875rem] text-zinc-500">{f.toCity}</div>
        </div>
      </div> {piVal > 0 && <span>&asymp; {formatUsd(piVal)}</span>}
      <div className="flex justify-between items-center mb-3">
        <div className="text-xs text-zinc-500">Duration<strong className="block text-sm text-white">{f.duration}</strong></div>
        <div className="text-xs text-zinc-500">Stops<strong className="block text-sm text-white">{f.stops}</strong></div>
        <div className="text-right">
          <div className="text-xl font-extrabold text-amber-400">{f.price}</div>
          <div className="text-[0.6875rem] text-zinc-500">per person</div>
        </div>
      </div>
      <button className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-bold text-xs hover:bg-cyan-600 hover:border-cyan-600 transition-colors">
        Book Flight — {f.price}
      </button>
    </div>
  );
}

export default function TransportPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("rides");

  const currentOptions = activeTab === "rides" ? rideOptions : activeTab === "taxi" ? taxiOptions : activeTab === "driver" ? driverOptions : deliveryOptions;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">← Services</Link>
          <span className="text-zinc-600">/</span>
          <span className="font-medium">{t("transport.title")}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-transparent to-amber-900/10" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {t("transport.badge") || "Pay with Pi Cryptocurrency"}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            🚗 {t("transport.heroTitle") || "City Transport &"}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
              {t("transport.heroHighlight") || "Ride Services"}
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            {t("transport.heroDesc") || "Book taxis, hire drivers, schedule city rides and fly anywhere — all powered by Pi Network payments"}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: "🚗", val: "2,400+", label: t("transport.activeDrivers") || "Active Drivers" },
              { icon: "🏙️", val: "86", label: t("transport.citiesCovered") || "Cities Covered" },
              { icon: "✈️", val: "14", label: t("transport.airlines") || "Airlines" },
              { icon: "⭐", val: "4.8", label: t("transport.avgRating") || "Avg Rating" },
            ].map((s) => (
              <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-extrabold">{s.val}</div>
                <div className="text-[0.6875rem] text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-2 justify-center flex-wrap px-6 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-colors ${activeTab === tab.key ? "bg-cyan-500 text-white border-cyan-500" : "bg-transparent text-zinc-500 border-white/[0.08] hover:border-white/[0.16] hover:text-zinc-300"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Booking Form (not for airways) */}
        {activeTab !== "airways" && (
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-7 mb-8">
            <h2 className="text-lg font-extrabold mb-5">📍 {t("transport.bookRide") || "Book Your Ride"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">{t("transport.pickup") || "Pickup Location"}</label>
                <input type="text" placeholder="Enter pickup address" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">{t("transport.destination") || "Destination"}</label>
                <input type="text" placeholder="Where are you going?" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 placeholder:text-zinc-600" />
              </div>
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">{t("transport.dateTime") || "Date & Time"}</label>
                <input type="datetime-local" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">{t("transport.passengers") || "Passengers"}</label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500">
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
            <button className="mt-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-10 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(6,182,212,0.3)] transition-all">
              🚗 {t("transport.findRides") || "Find Available Rides"}
            </button>
          </div>
        )}

        {/* Driver Agent CTA (only on driver tab) */}
        {activeTab === "driver" && (
          <div className="bg-gradient-to-br from-violet-600/[0.06] to-amber-500/[0.04] border border-white/[0.08] rounded-2xl p-8 mb-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl font-extrabold mb-3">👤 {t("transport.becomeDriver") || "Become a Driver Agent"}</h2>
              <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{t("transport.driverDesc") || "Join Omenda Pi Pays as a professional driver agent. Earn Pi cryptocurrency for every completed ride."}</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: "💰", text: "Earn in Pi" },
                  { icon: "🕐", text: "Flexible schedule" },
                  { icon: "🚀", text: "Instant payouts" },
                  { icon: "⭐", text: "Rating rewards" },
                  { icon: "🌍", text: "Global network" },
                  { icon: "🔒", text: "Insurance coverage" },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">{b.icon}</span>
                    {b.text}
                  </div>
                ))}
              </div>
              <button className="bg-gradient-to-r from-violet-600 to-violet-700 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,58,237,0.3)] transition-all">
                👤 {t("transport.applyNow") || "Apply as Driver Agent"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "💰", val: "45π", label: "Avg Daily Earning", color: "text-amber-400" },
                { icon: "🚗", val: "12", label: "Rides Per Day", color: "text-cyan-400" },
                { icon: "⭐", val: "4.9", label: "Top Driver Rating", color: "text-green-400" },
                { icon: "🌍", val: "86", label: "Cities Active", color: "text-white" },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 text-center">
                  <div className="text-xl mb-2">{s.icon}</div>
                  <div className={`text-xl font-extrabold ${s.color}`}>{s.val}</div>
                  <div className="text-[0.6875rem] text-zinc-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Airways Flight Search */}
        {activeTab === "airways" && (
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-7 mb-8">
            <h2 className="text-lg font-extrabold mb-5">✈️ {t("transport.bookFlight") || "Book a Flight"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">From</label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500">
                  {["Nairobi (NBO)","Dar es Salaam (DAR)","Entebbe (EBB)","Addis Ababa (ADD)","Lagos (LOS)","Dubai (DXB)"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">To</label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500">
                  {["Dubai (DXB)","London (LHR)","Paris (CDG)","New York (JFK)","Tokyo (NRT)","Singapore (SIN)"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">Departure Date</label>
                <input type="date" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500" />
              </div>
              <div>
                <label className="block text-[0.6875rem] font-bold uppercase text-zinc-500 mb-1">Class</label>
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500">
                  <option>Economy</option><option>Business</option><option>First Class</option>
                </select>
              </div>
            </div>
            <button className="mt-5 bg-gradient-to-r from-violet-600 to-violet-700 text-white px-10 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,58,237,0.3)] transition-all">
              ✈️ {t("transport.searchFlights") || "Search Flights"}
            </button>
          </div>
        )}

        {/* Content Grid */}
        {activeTab !== "airways" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {currentOptions.map(o => <OptionCard key={o.id} o={o} />)}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {flights.map(f => <FlightCard key={f.code + f.from + f.to} f={f} />)}
          </div>
        )}

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-xl font-extrabold text-center mb-8">🤔 {t("transport.howItWorks") || "How It Works"}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: 1, icon: "📍", title: "Set Location", desc: "Enter your pickup point and destination" },
              { num: 2, icon: "🚗", title: "Choose Ride", desc: "Select from taxi, driver agent, or flight" },
              { num: 3, icon: "💰", title: "Pay with Pi", desc: "Secure payment using Pi cryptocurrency" },
              { num: 4, icon: "🎉", title: "Enjoy Ride", desc: "Track your ride in real-time and arrive safely" },
            ].map(s => (
              <div key={s.num} className="bg-[#111114] border border-white/[0.08] rounded-2xl p-6 text-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white text-sm font-extrabold flex items-center justify-center mx-auto mb-3">{s.num}</div>
                <div className="text-2xl mb-2">{s.icon}</div>
                <h4 className="text-sm font-bold mb-1">{s.title}</h4>
                <p className="text-xs text-zinc-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
