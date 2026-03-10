"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Map data: global pioneers, businesses & services
const mapData = [
  // Africa
  { id:1, name:"Omenda Pi Pays HQ", lat:-1.2921, lng:36.8219, type:"business" as const, city:"Nairobi, Kenya", desc:"Flagship decentralized marketplace for Pi payments across Africa.", users:1840, txns:9500, category:"marketplace" },
  { id:2, name:"Pi Cafe Nairobi", lat:-1.3000, lng:36.8150, type:"business" as const, city:"Nairobi, Kenya", desc:"Coffee shop & co-working space accepting Pi payments.", users:320, txns:2100, category:"food" },
  { id:3, name:"Lagos Pi Merchants Hub", lat:6.5244, lng:3.3792, type:"business" as const, city:"Lagos, Nigeria", desc:"West Africa's largest Pi merchant network.", users:980, txns:5200, category:"marketplace" },
  { id:4, name:"Cape Town Pioneer Community", lat:-33.9249, lng:18.4241, type:"user" as const, city:"Cape Town, South Africa", desc:"Pioneer meetup group with monthly Pi trading events.", users:450, txns:1800, category:"community" },
  { id:5, name:"Accra Pi Services", lat:5.6037, lng:-0.1870, type:"service" as const, city:"Accra, Ghana", desc:"Bill payments & utility services via Pi.", users:290, txns:3400, category:"bills" },
  { id:6, name:"Dar es Salaam Pi Hotels", lat:-6.7924, lng:39.2083, type:"service" as const, city:"Dar es Salaam, Tanzania", desc:"Hotel bookings along the coast — payable in Pi.", users:180, txns:620, category:"hotel" },
  { id:7, name:"Kampala Pi Market", lat:0.3476, lng:32.5825, type:"business" as const, city:"Kampala, Uganda", desc:"East African agricultural Pi trading marketplace.", users:540, txns:2800, category:"marketplace" },
  { id:8, name:"Kigali Pi Tech Hub", lat:-1.9403, lng:29.8739, type:"service" as const, city:"Kigali, Rwanda", desc:"Tech services and digital products purchasable with Pi.", users:220, txns:1100, category:"service" },
  { id:9, name:"Cairo Pi Exchange", lat:30.0444, lng:31.2357, type:"business" as const, city:"Cairo, Egypt", desc:"North Africa's first Pi-enabled exchange platform.", users:670, txns:4300, category:"marketplace" },
  { id:10, name:"Johannesburg Pi Trade", lat:-26.2041, lng:28.0473, type:"business" as const, city:"Johannesburg, South Africa", desc:"South African Pi trading platform for local goods.", users:520, txns:2400, category:"marketplace" },

  // Europe
  { id:11, name:"London Pi Traders", lat:51.5074, lng:-0.1278, type:"business" as const, city:"London, UK", desc:"Europe's top Pi merchant network.", users:1200, txns:7800, category:"marketplace" },
  { id:12, name:"Berlin Pi Community", lat:52.5200, lng:13.4050, type:"user" as const, city:"Berlin, Germany", desc:"2,000+ pioneers hosting weekly meetups.", users:2100, txns:3200, category:"community" },
  { id:13, name:"Paris Pi Boutique", lat:48.8566, lng:2.3522, type:"business" as const, city:"Paris, France", desc:"Luxury fashion & accessories — Pi payments.", users:480, txns:2400, category:"marketplace" },
  { id:14, name:"Amsterdam Pi Hotels", lat:52.3676, lng:4.9041, type:"service" as const, city:"Amsterdam, Netherlands", desc:"Book canal-side hotels with Pi.", users:350, txns:1300, category:"hotel" },
  { id:15, name:"Madrid Pi Services", lat:40.4168, lng:-3.7038, type:"service" as const, city:"Madrid, Spain", desc:"Bill payment & home services via Pi.", users:290, txns:1800, category:"bills" },
  { id:16, name:"Rome Pi Dining", lat:41.9028, lng:12.4964, type:"business" as const, city:"Rome, Italy", desc:"Italian restaurants accepting Pi.", users:410, txns:2100, category:"food" },
  { id:17, name:"Stockholm Pi Real Estate", lat:59.3293, lng:18.0686, type:"service" as const, city:"Stockholm, Sweden", desc:"Scandinavian property listings with Pi.", users:180, txns:420, category:"realestate" },
  { id:18, name:"Warsaw Pi Exchange", lat:52.2297, lng:21.0122, type:"business" as const, city:"Warsaw, Poland", desc:"Central European Pi trading platform.", users:560, txns:3100, category:"marketplace" },
  { id:19, name:"Dublin Pi Pioneers", lat:53.3498, lng:-6.2603, type:"user" as const, city:"Dublin, Ireland", desc:"500+ active pioneers trading weekly.", users:520, txns:1600, category:"community" },
  { id:20, name:"Barcelona Pi Pioneers", lat:41.3874, lng:2.1686, type:"user" as const, city:"Barcelona, Spain", desc:"Catalan pioneers — beach meetups & Pi trading.", users:440, txns:1300, category:"community" },

  // Asia Pacific
  { id:21, name:"Tokyo Pi Exchange", lat:35.6762, lng:139.6503, type:"business" as const, city:"Tokyo, Japan", desc:"Japan's largest Pi marketplace.", users:1800, txns:9200, category:"marketplace" },
  { id:22, name:"Mumbai Pi Market", lat:19.0760, lng:72.8777, type:"business" as const, city:"Mumbai, India", desc:"India's Pi marketplace — textiles, spices & software.", users:2400, txns:11000, category:"marketplace" },
  { id:23, name:"Singapore Pi Hotels", lat:1.3521, lng:103.8198, type:"service" as const, city:"Singapore", desc:"Luxury hotel bookings — pay with Pi.", users:890, txns:3400, category:"hotel" },
  { id:24, name:"Bangkok Pi Services", lat:13.7563, lng:100.5018, type:"service" as const, city:"Bangkok, Thailand", desc:"Travel, food & bill payment via Pi.", users:720, txns:4100, category:"bills" },
  { id:25, name:"Seoul Pi Tech", lat:37.5665, lng:126.9780, type:"business" as const, city:"Seoul, South Korea", desc:"Korean tech products — Pi payments.", users:1500, txns:6800, category:"marketplace" },
  { id:26, name:"Sydney Pioneer Hub", lat:-33.8688, lng:151.2093, type:"user" as const, city:"Sydney, Australia", desc:"800+ active pioneer members.", users:820, txns:2400, category:"community" },
  { id:27, name:"Jakarta Pi Marketplace", lat:-6.2088, lng:106.8456, type:"business" as const, city:"Jakarta, Indonesia", desc:"Southeast Asia's fastest-growing Pi marketplace.", users:1300, txns:5600, category:"marketplace" },
  { id:28, name:"Manila Pi Bills", lat:14.5995, lng:120.9842, type:"service" as const, city:"Manila, Philippines", desc:"Pay utility bills with Pi.", users:940, txns:7200, category:"bills" },
  { id:29, name:"Shanghai Pi Commerce", lat:31.2304, lng:121.4737, type:"business" as const, city:"Shanghai, China", desc:"Chinese Pi commerce hub.", users:1900, txns:8600, category:"marketplace" },
  { id:30, name:"Delhi Pi Pioneers", lat:28.7041, lng:77.1025, type:"user" as const, city:"Delhi, India", desc:"North India pioneer community.", users:1100, txns:3200, category:"community" },

  // Americas
  { id:31, name:"New York Pi Hub", lat:40.7128, lng:-74.0060, type:"business" as const, city:"New York, USA", desc:"East Coast Pi commerce center.", users:1600, txns:8400, category:"marketplace" },
  { id:32, name:"San Francisco Pi Labs", lat:37.7749, lng:-122.4194, type:"service" as const, city:"San Francisco, USA", desc:"Pi developer hub & API services.", users:900, txns:2800, category:"service" },
  { id:33, name:"São Paulo Pi Market", lat:-23.5505, lng:-46.6333, type:"business" as const, city:"São Paulo, Brazil", desc:"Latin America's largest Pi marketplace.", users:1200, txns:5400, category:"marketplace" },
  { id:34, name:"Mexico City Pi Services", lat:19.4326, lng:-99.1332, type:"service" as const, city:"Mexico City, Mexico", desc:"Bill payments & remittances via Pi.", users:680, txns:3900, category:"bills" },
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

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
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
            <h4 style="font-weight:700;font-size:14px;margin-bottom:4px">${d.name}</h4>
            <span style="${badgeStyle};font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;display:inline-block;margin-bottom:8px">${label}</span>
            <p style="color:#a1a1aa;font-size:13px;line-height:1.4;margin-bottom:8px">${d.desc}</p>
            <div style="display:flex;gap:16px;font-size:12px;color:#71717a">
              <span>👤 ${d.users.toLocaleString()} users</span>
              <span>🔄 ${d.txns.toLocaleString()} txns</span>
            </div>
            <span style="color:#71717a;font-size:12px">📍 ${d.city}</span>
          </div>`,
          { maxWidth: 280 }
        )
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [leafletLoaded, activeFilter, search]);

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pt-8 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Global{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Pioneer Map
            </span>
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Discover pioneers, businesses &amp; services accepting Pi worldwide
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <strong className="text-white">12,480</strong>
            <span className="text-zinc-400">Pioneers</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <strong className="text-white">3,240</strong>
            <span className="text-zinc-400">Businesses</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
            <strong className="text-white">890</strong>
            <span className="text-zinc-400">Services</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
            <strong className="text-white">2,400</strong>
            <span className="text-zinc-400">Transport</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-500" />
            <strong className="text-white">4,800</strong>
            <span className="text-zinc-400">Social</span>
          </div>
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
                ? "border-violet-500 bg-violet-600 text-white"
                : "border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:border-white/[0.12] hover:text-white"
            }`}
          >
            {f.icon} {f.label}
            {f.key in counts && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                {counts[f.key as keyof typeof counts]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Map + Sidebar */}
      <div className="mx-6 mb-6 flex overflow-hidden rounded-2xl border border-white/[0.06]" style={{ minHeight: 500 }}>
        {/* Map */}
        <div ref={mapRef} className="flex-1" style={{ minHeight: 500, background: "#0a0a0f" }}>
          {!leafletLoaded && (
            <div className="flex h-full items-center justify-center text-zinc-500">
              Loading map...
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden w-[380px] flex-col border-l border-white/[0.06] bg-[#111114] md:flex">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <h3 className="text-sm font-bold">Nearby</h3>
            <span className="text-xs text-zinc-500">{filtered.length} results</span>
          </div>
          <div className="px-5 pt-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">🔍</span>
              <input
                type="text"
                placeholder="Search by name, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-600">No results found</div>
            ) : (
              filtered.map((d) => (
                <button
                  key={d.id}
                  onClick={() => focusMarker(d.id)}
                  className={`mb-1 w-full rounded-lg border p-3.5 text-left transition-all ${
                    selectedId === d.id
                      ? "border-violet-500 bg-white/[0.04]"
                      : "border-transparent hover:border-white/[0.06] hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold leading-snug">{d.name}</h4>
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
                  <p className="mb-2 text-xs leading-relaxed text-zinc-400">{d.desc}</p>
                  <div className="flex flex-wrap gap-3 text-[11px] text-zinc-500">
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
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors hover:border-white/[0.12]"
          >
            <h3 className="text-base font-bold">
              {r.flag} {r.name}
            </h3>
            <p className="mb-4 text-xs text-zinc-400">{r.sub}</p>
            <div className="flex gap-5">
              <div>
                <div className="text-lg font-extrabold text-amber-400">{r.pioneers.toLocaleString()}</div>
                <div className="text-[11px] text-zinc-500">Pioneers</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-violet-400">{r.biz.toLocaleString()}</div>
                <div className="text-[11px] text-zinc-500">Businesses</div>
              </div>
              <div>
                <div className="text-lg font-extrabold text-green-400">{r.svc.toLocaleString()}</div>
                <div className="text-[11px] text-zinc-500">Services</div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
