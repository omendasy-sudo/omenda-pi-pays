"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductOverview } from "@/components/ProductOverview";

type MapEntry = {
  id: number; name: string; lat: number; lng: number;
  type: "user" | "business" | "service"; city: string; desc: string;
  users: number; txns: number; category: string;
  live?: boolean; image?: string;
};

// Seed data: global pioneers, businesses & services (fallback)
const seedData: MapEntry[] = [
  // Africa
  { id:1, name:"Omenda Pi Pays HQ", lat:-1.2921, lng:36.8219, type:"business" as const, city:"Nairobi, Kenya", desc:"Flagship decentralized marketplace for Pi payments across Africa.", users:1840, txns:9500, category:"marketplace" },
  { id:2, name:"Pi Cafe Nairobi", lat:-1.3000, lng:36.8150, type:"business" as const, city:"Nairobi, Kenya", desc:"Coffee shop & co-working space accepting Pi payments.", users:320, txns:2100, category:"food" },
  { id:3, name:"Lagos Pi Merchants Hub", lat:6.5244, lng:3.3792, type:"business" as const, city:"Lagos, Nigeria", desc:"West Africa's largest Pi merchant network.", users:980, txns:5200, category:"marketplace" },
  { id:4, name:"Cape Town Pioneer Community", lat:-33.9249, lng:18.4241, type:"user" as const, city:"Cape Town, South Africa", desc:"Pioneer meetup group with monthly Pi trading events.", users:450, txns:1800, category:"community" },
  { id:35, name:"Toronto Pi Community", lat:43.6532, lng:-79.3832, type:"user" as const, city:"Toronto, Canada", desc:"600+ member pioneer group.", users:640, txns:1900, category:"community" },
  { id:36, name:"Miami Pi Hotels", lat:25.7617, lng:-80.1918, type:"service" as const, city:"Miami, USA", desc:"Beach-front hotel bookings with Pi.", users:480, txns:1200, category:"hotel" },
  { id:37, name:"Buenos Aires Pi Exchange", lat:-34.6037, lng:-58.3816, type:"business" as const, city:"Buenos Aires, Argentina", desc:"South American Pi exchange.", users:560, txns:2600, category:"marketplace" },
  { id:38, name:"Los Angeles Pi Market", lat:34.0522, lng:-118.2437, type:"business" as const, city:"Los Angeles, USA", desc:"West Coast Pi marketplace.", users:1100, txns:5200, category:"marketplace" },
  { id:39, name:"Chicago Pi Pioneers", lat:41.8781, lng:-87.6298, type:"user" as const, city:"Chicago, USA", desc:"Midwest pioneer community.", users:520, txns:1500, category:"community" },
  { id:40, name:"Vancouver Pi Tech", lat:49.2827, lng:-123.1207, type:"business" as const, city:"Vancouver, Canada", desc:"Canadian tech marketplace accepting Pi.", users:380, txns:1800, category:"marketplace" },

  // Middle East
  { id:41, name:"Dubai Pi Luxury", lat:25.2048, lng:55.2708, type:"business" as const, city:"Dubai, UAE", desc:"Luxury goods & real estate — Pi-enabled.", users:920, txns:4800, category:"marketplace" },
  { id:42, name:"Istanbul Pi Bazaar", lat:41.0082, lng:28.9784, type:"business" as const, city:"Istanbul, Turkey", desc:"Historic crossroads — now powered by Pi.", users:740, txns:3600, category:"marketplace" },
  { id:43, name:"Riyadh Pi Services", lat:24.7136, lng:46.6753, type:"service" as const, city:"Riyadh, Saudi Arabia", desc:"Bill payments & telecom via Pi.", users:410, txns:2200, category:"bills" },

  // ── TRANSPORT & RIDE SERVICES ──
  { id:87, name:"Nairobi Pi Rides", lat:-1.2800, lng:36.8200, type:"service" as const, city:"Nairobi, Kenya", desc:"City rides, taxis & boda-boda — book and pay with Pi.", users:1200, txns:8400, category:"transport" },
  { id:88, name:"Lagos Pi Transport", lat:6.5300, lng:3.3850, type:"service" as const, city:"Lagos, Nigeria", desc:"Taxi & ride-hailing across Lagos — powered by Pi.", users:980, txns:6800, category:"transport" },
  { id:89, name:"London Pi Cabs", lat:51.5100, lng:-0.1300, type:"service" as const, city:"London, UK", desc:"Black cab & minicab bookings — pay with Pi cryptocurrency.", users:750, txns:4200, category:"transport" },
  { id:90, name:"Dubai Pi Rides", lat:25.2100, lng:55.2750, type:"service" as const, city:"Dubai, UAE", desc:"Luxury rides, airport transfers & desert excursions via Pi.", users:620, txns:3100, category:"transport" },
  { id:91, name:"Mumbai Pi Auto", lat:19.0800, lng:72.8800, type:"service" as const, city:"Mumbai, India", desc:"Auto-rickshaw & cab bookings across Mumbai — Pi payments.", users:1400, txns:9200, category:"transport" },
  { id:92, name:"São Paulo Pi Rides", lat:-23.5550, lng:-46.6400, type:"service" as const, city:"São Paulo, Brazil", desc:"City rides & airport shuttles — pay with Pi in Brazil.", users:680, txns:3800, category:"transport" },
  { id:93, name:"Bangkok Pi Tuk-Tuk", lat:13.7600, lng:100.5050, type:"service" as const, city:"Bangkok, Thailand", desc:"Tuk-tuk, taxi & motorbike rides — all bookable with Pi.", users:890, txns:5600, category:"transport" },
  { id:94, name:"New York Pi Rides", lat:40.7200, lng:-74.0000, type:"service" as const, city:"New York, USA", desc:"Yellow cab & ride-share bookings — Pi-powered transport.", users:1100, txns:7400, category:"transport" },
  { id:95, name:"Tokyo Pi Rides", lat:35.6800, lng:139.6550, type:"service" as const, city:"Tokyo, Japan", desc:"Train passes, taxi & ride-hailing — pay with Pi in Japan.", users:950, txns:5200, category:"transport" },
  { id:96, name:"Kampala Pi Boda", lat:0.3500, lng:32.5850, type:"service" as const, city:"Kampala, Uganda", desc:"Boda-boda & matatu rides — book safely with Pi.", users:540, txns:3400, category:"transport" },
  { id:97, name:"Cairo Pi Transport", lat:30.0500, lng:31.2400, type:"service" as const, city:"Cairo, Egypt", desc:"City taxis, Uber-style rides & Nile transfers via Pi.", users:480, txns:2600, category:"transport" },
  { id:98, name:"Paris Pi Transport", lat:48.8600, lng:2.3550, type:"service" as const, city:"Paris, France", desc:"Taxi, VTC & airport shuttle — pay with Pi in Paris.", users:560, txns:2800, category:"transport" },
  { id:99, name:"Dar es Salaam Pi Rides", lat:-6.7950, lng:39.2100, type:"service" as const, city:"Dar es Salaam, Tanzania", desc:"Dala-dala & taxi rides along the coast — Pi payments.", users:320, txns:1800, category:"transport" },
  { id:100, name:"Singapore Pi Rides", lat:1.3550, lng:103.8200, type:"service" as const, city:"Singapore", desc:"Premium & economy rides across the city-state — Pi enabled.", users:710, txns:3600, category:"transport" },

  // ── PI AIRWAYS / FLIGHTS ──
  { id:101, name:"Pi Airways — Africa Hub", lat:-1.3200, lng:36.9300, type:"service" as const, city:"Nairobi, Kenya (JKIA)", desc:"Book flights across Africa — Nairobi to Lagos, Cairo, Cape Town & more.", users:2400, txns:4200, category:"transport" },
  { id:102, name:"Pi Airways — Europe Hub", lat:51.4700, lng:-0.4543, type:"service" as const, city:"London, UK (Heathrow)", desc:"European flights — London to Paris, Berlin, Dubai & beyond.", users:1800, txns:3600, category:"transport" },
  { id:103, name:"Pi Airways — Asia Hub", lat:1.3644, lng:103.9915, type:"service" as const, city:"Singapore (Changi)", desc:"Asia-Pacific flights — Singapore to Tokyo, Mumbai, Sydney.", users:1600, txns:3200, category:"transport" },
  { id:104, name:"Pi Airways — Americas Hub", lat:40.6413, lng:-73.7781, type:"service" as const, city:"New York, USA (JFK)", desc:"Americas flights — New York to São Paulo, LA, Toronto.", users:1400, txns:2800, category:"transport" },

  // ── SOCIAL / COMMUNITY HUBS ──
  { id:105, name:"Nairobi Pi Social Hub", lat:-1.2750, lng:36.8150, type:"user" as const, city:"Nairobi, Kenya", desc:"Pioneer social feed — share posts, photos & trade tips in Pi.", users:2800, txns:1200, category:"social" },
  { id:106, name:"Lagos Pi Social", lat:6.5280, lng:3.3750, type:"user" as const, city:"Lagos, Nigeria", desc:"West African pioneer social community — trending posts & discussions.", users:1600, txns:860, category:"social" },
  { id:107, name:"London Pi Social", lat:51.5120, lng:-0.1250, type:"user" as const, city:"London, UK", desc:"European pioneer social feed — meetup announcements & Pi tips.", users:1400, txns:740, category:"social" },
  { id:108, name:"Mumbai Pi Social", lat:19.0820, lng:72.8750, type:"user" as const, city:"Mumbai, India", desc:"Largest South Asian Pi social community — 2,000+ active daily.", users:2200, txns:980, category:"social" },
  { id:109, name:"Tokyo Pi Social", lat:35.6720, lng:139.6480, type:"user" as const, city:"Tokyo, Japan", desc:"Japanese pioneer broadcast — Pi culture, anime & trading.", users:1300, txns:620, category:"social" },
  { id:110, name:"São Paulo Pi Social", lat:-23.5480, lng:-46.6300, type:"user" as const, city:"São Paulo, Brazil", desc:"Latin American Pi social — posts in Portuguese & Spanish.", users:1100, txns:540, category:"social" },
  { id:111, name:"Dubai Pi Social", lat:25.2000, lng:55.2650, type:"user" as const, city:"Dubai, UAE", desc:"Middle East pioneer social hub — luxury lifestyle & Pi commerce.", users:900, txns:480, category:"social" },
  { id:112, name:"New York Pi Social", lat:40.7150, lng:-74.0080, type:"user" as const, city:"New York, USA", desc:"US pioneer social feed — tech discussions & Pi marketplace.", users:1800, txns:920, category:"social" },
  { id:113, name:"Kampala Pi Social", lat:0.3450, lng:32.5800, type:"user" as const, city:"Kampala, Uganda", desc:"East African pioneer social — agricultural Pi trading tips.", users:680, txns:340, category:"social" },
  { id:114, name:"Bangkok Pi Social", lat:13.7580, lng:100.5000, type:"user" as const, city:"Bangkok, Thailand", desc:"Southeast Asian social hub — food, travel & Pi discussions.", users:760, txns:380, category:"social" },
];

type FilterType = "all" | "user" | "business" | "service" | "hotel" | "realestate" | "bills" | "transport" | "social";

const typeColors: Record<string, string> = { user: "#22c55e", business: "#f5a623", service: "#7c3aed" };
const catColors: Record<string, string> = { transport: "#06b6d4", social: "#ec4899" };
const typeLabels: Record<string, string> = { user: "Pioneer", business: "Business", service: "Service" };
const catLabels: Record<string, string> = { transport: "Transport", social: "Social" };

const filters: { key: FilterType; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "🌎" },
  { key: "user", label: "Pioneers", icon: "👤" },
  { key: "business", label: "Businesses", icon: "🏪" },
  { key: "service", label: "Services", icon: "⚙️" },
  { key: "hotel", label: "Hotels", icon: "🏨" },
  { key: "realestate", label: "Real Estate", icon: "🏠" },
  { key: "bills", label: "Bill Pay", icon: "💰" },
  { key: "transport", label: "Transport", icon: "🚗" },
  { key: "social", label: "Social", icon: "💬" },
];

const regions = [
  { name: "Europe", flag: "🇪🇺", sub: "Leading in Pi merchant adoption", pioneers: 3840, biz: 920, svc: 245 },
  { name: "Asia Pacific", flag: "🌏", sub: "Fastest growing Pi community", pioneers: 4200, biz: 1100, svc: 310 },
  { name: "Americas", flag: "🌎", sub: "Strong enterprise integration", pioneers: 2900, biz: 780, svc: 190 },
  { name: "Africa", flag: "🌍", sub: "Emerging Pi payment ecosystem", pioneers: 1540, biz: 440, svc: 145 },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapData, setMapData] = useState<MapEntry[]>(seedData);
  const [liveCount, setLiveCount] = useState(0);

  // Fetch live data from PHP backend + merge with seed data
  useEffect(() => {
    let cancelled = false;
    async function fetchLive() {
      try {
        const res = await fetch("/backend/map_data.php");
        if (!res.ok) return;
        const data = await res.json();
        const live: MapEntry[] = (data.live || []).map((d: MapEntry) => ({
          ...d,
          type: (d.type || "business") as MapEntry["type"],
        }));
        if (!cancelled && live.length > 0) {
          // Merge: seed data + live data (deduplicated by id)
          const seedIds = new Set(seedData.map((s) => s.id));
          const unique = live.filter((l) => !seedIds.has(l.id));
          setMapData([...seedData, ...unique]);
          setLiveCount(unique.length);
        }
      } catch {
        // Backend unavailable — keep seed data
      }
    }
    fetchLive();
    return () => { cancelled = true; };
  }, []);

  // Load Leaflet dynamically (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, {
      center: [20, 10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
  }, [leafletLoaded]);

  // Update markers
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current) return;
    const L = window.L;
    const map = mapInstanceRef.current;

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    const filtered = mapData.filter((d) => {
      const matchSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        activeFilter === "all" ||
        (["user", "business", "service"].includes(activeFilter)
          ? d.type === activeFilter
          : d.category === activeFilter);
      return matchSearch && matchFilter;
    });

    filtered.forEach((d) => {
      const color = catColors[d.category] || typeColors[d.type] || "#7c3aed";
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px ${color}88, 0 2px 8px rgba(0,0,0,0.4);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -12],
      });

      const badgeColors: Record<string, string> = {
        transport: "background:rgba(6,182,212,0.12);color:#22d3ee",
        social: "background:rgba(236,72,153,0.12);color:#f472b6",
        user: "background:rgba(34,197,94,0.12);color:#4ade80",
        business: "background:rgba(245,166,35,0.12);color:#f5a623",
        service: "background:rgba(124,58,237,0.12);color:#a78bfa",
      };
      const badgeStyle = badgeColors[d.category] || badgeColors[d.type] || badgeColors.service;
      const label = catLabels[d.category] || typeLabels[d.type] || d.type;

      const marker = L.marker([d.lat, d.lng], { icon })
        .bindPopup(
          `<div style="min-width:220px;padding:4px">
            <h4 style="font-weight:700;font-size:14px;margin-bottom:4px">${d.name}${d.live ? ' <span style="background:#22c55e;color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:100px;margin-left:6px">LIVE</span>' : ''}</h4>
            <span style="${badgeStyle};font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;display:inline-block;margin-bottom:8px">${label}</span>
            <p style="color:#a1a1aa;font-size:13px;line-height:1.4;margin-bottom:8px">${d.desc}</p>
            <div style="display:flex;gap:16px;font-size:12px;color:#71717a">
              <span>👤 ${(d.users || 0).toLocaleString()} users</span>
              <span>🔄 ${(d.txns || 0).toLocaleString()} txns</span>
            </div>
            <span style="color:#71717a;font-size:12px">📍 ${d.city}</span>
          </div>`,
          { maxWidth: 280 }
        )
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [leafletLoaded, activeFilter, search, mapData]);

  const filtered = mapData.filter((d) => {
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "all" ||
      (["user", "business", "service"].includes(activeFilter)
        ? d.type === activeFilter
        : d.category === activeFilter);
    return matchSearch && matchFilter;
  });

  function focusMarker(id: number) {
    setSelectedId(id);
    const d = mapData.find((x) => x.id === id);
    if (!d || !mapInstanceRef.current) return;
    mapInstanceRef.current.setView([d.lat, d.lng], 10, { animate: true });
    const idx = filtered.findIndex((x) => x.id === id);
    if (idx >= 0 && markersRef.current[idx]) {
      markersRef.current[idx].openPopup();
    }
  }

  const counts: Record<string, number> = {
    all: mapData.length,
    user: mapData.filter((d) => d.type === "user").length,
    business: mapData.filter((d) => d.type === "business").length,
    service: mapData.filter((d) => d.type === "service").length,
    transport: mapData.filter((d) => d.category === "transport").length,
    social: mapData.filter((d) => d.category === "social").length,
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-8 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Global{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Pioneer Map
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Discover pioneers, businesses &amp; services accepting Pi worldwide
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <strong className="text-slate-800">{counts.user?.toLocaleString() || 0}</strong>
            <span className="text-slate-500">Pioneers</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <strong className="text-slate-800">{counts.business?.toLocaleString() || 0}</strong>
            <span className="text-slate-500">Businesses</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <strong className="text-slate-800">{counts.service?.toLocaleString() || 0}</strong>
            <span className="text-slate-500">Services</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
            <strong className="text-slate-800">{counts.transport?.toLocaleString() || 0}</strong>
            <span className="text-slate-500">Transport</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
            <strong className="text-slate-800">{counts.social?.toLocaleString() || 0}</strong>
            <span className="text-slate-500">Social</span>
          </div>
          {liveCount > 0 && (
            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 shadow-sm px-4 py-2 text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <strong className="text-green-700">{liveCount}</strong>
              <span className="text-green-600">Live Sellers</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 px-6 pb-4">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              activeFilter === f.key
                ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-slate-800 shadow-sm"
            }`}
          >
            {f.icon} {f.label}
            {f.key in counts && (
              <span className="rounded-full bg-orange-100 text-orange-600 px-2 py-0.5 text-[10px]">
                {counts[f.key as keyof typeof counts]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Map + Sidebar */}
      <div className="mx-6 mb-6 flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ minHeight: 500 }}>
        {/* Map */}
        <div ref={mapRef} className="flex-1" style={{ minHeight: 500, background: "#e8e8e8" }}>
          {!leafletLoaded && (
            <div className="flex h-full items-center justify-center text-slate-400">
              Loading map...
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden w-[380px] flex-col border-l border-slate-200 bg-white md:flex">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h3 className="text-sm font-bold text-slate-800">Nearby</h3>
            <span className="text-xs text-slate-500">{filtered.length} results</span>
          </div>
          <div className="px-5 pt-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Search by name, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-orange-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">No results found</div>
            ) : (
              filtered.map((d) => (
                <button
                  key={d.id}
                  onClick={() => focusMarker(d.id)}
                  className={`mb-1 w-full rounded-lg border p-3.5 text-left transition-all ${
                    selectedId === d.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold leading-snug text-slate-800">
                      {d.name}
                      {d.live && <span className="ml-1.5 inline-block rounded-full bg-green-500 px-1.5 py-0.5 text-[9px] font-bold text-white">LIVE</span>}
                    </h4>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        d.category === "transport"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : d.category === "social"
                            ? "bg-pink-500/10 text-pink-400"
                            : d.type === "user"
                              ? "bg-green-500/10 text-green-400"
                              : d.type === "business"
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-violet-500/10 text-violet-400"
                      }`}
                    >
                      {catLabels[d.category] || typeLabels[d.type]}
                    </span>
                  </div>
                  <p className="mb-2 text-xs leading-relaxed text-slate-500">{d.desc}</p>
                  <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
                    <span>📍 {d.city}</span>
                    <span>👤 {d.users.toLocaleString()}</span>
                    <span>🔄 {d.txns.toLocaleString()} txns</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Regional Stats */}
      <div className="grid gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {regions.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 transition-colors hover:border-orange-300"
          >
            <h3 className="text-base font-bold text-slate-800">
              {r.flag} {r.name}
            </h3>
            <p className="mb-4 text-xs text-slate-500">{r.sub}</p>
            <div className="flex gap-5">
              <div>
                <div className="text-lg font-extrabold text-orange-500">{r.pioneers.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">Pioneers</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-orange-400">{r.biz.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">Businesses</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-green-500">{r.svc.toLocaleString()}</div>
                <div className="text-[11px] text-slate-500">Services</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Product Overview ── */}
      <ProductOverview />
    </div>
  );
}

// Extend window for Leaflet
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}
