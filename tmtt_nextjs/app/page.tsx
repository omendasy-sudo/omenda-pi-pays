"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function PiBrowserBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const inPiBrowser =
      /PiBrowser/i.test(navigator.userAgent) || typeof window.Pi !== "undefined";
    if (!inPiBrowser) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="mx-3 mb-3 flex items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
      <div>
        <p className="font-semibold text-amber-300">Open in Pi Browser</p>
        <p className="mt-0.5 text-xs text-amber-300/70">Pi login and payments require the Pi Browser app.</p>
      </div>
      <a
        href="pi://omendapipaysglobel.online"
        className="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black"
      >
        Open
      </a>
    </div>
  );
}

type ProductCard = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  badge: "New" | "Used";
  image: string;
};

const categoryRows: { title: string; items: ProductCard[] }[] = [
  {
    title: "Technology and Electronics",
    items: [
      { id: "te1", title: "DELL Latitude x360 7320", subtitle: "13 inch touchscreen intel edition", price: "3300.00 Pi", badge: "New", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop" },
      { id: "te2", title: "MacBook Air M3", subtitle: "13 inch 256GB midnight", price: "3900.00 Pi", badge: "New", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop" },
      { id: "te3", title: "Smart Watch Pro", subtitle: "Sport and health tracking", price: "150.00 Pi", badge: "New", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  {
    title: "Home and Garden",
    items: [
      { id: "hg1", title: "Premium Hair Dryer Kit", subtitle: "Complete accessories bundle", price: "125.00 Pi", badge: "New", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop" },
      { id: "hg2", title: "7-Layer Shoe Rack", subtitle: "Cover included and washable", price: "150.00 Pi", badge: "New", image: "https://images.unsplash.com/photo-1616628182509-6f8046f8cb07?q=80&w=1200&auto=format&fit=crop" },
      { id: "hg3", title: "Portable Blender", subtitle: "Rechargeable kitchen helper", price: "215.00 Pi", badge: "New", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  {
    title: "Cars",
    items: [
      { id: "c1", title: "Mercedes-Benz GLE 350", subtitle: "2020 SUV pickup Lagos", price: "500000.00 Pi", badge: "Used", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop" },
      { id: "c2", title: "Toyota Camry SE", subtitle: "2018 clean interior", price: "150000.00 Pi", badge: "Used", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop" },
      { id: "c3", title: "Range Rover Evoque", subtitle: "2019 automatic transmission", price: "355000.00 Pi", badge: "Used", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
];

const quickFilters = ["GPM Games", "Categories", "Favorites", "Donate", "GPM Rankings"];

function ProductStrip({ title, items }: { title: string; items: ProductCard[] }) {
  return (
    <section className="mt-5">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-[17px] font-bold text-slate-900">{title}</h3>
        <button className="text-sm font-semibold text-sky-600 hover:text-sky-700" type="button">See All</button>
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="min-w-[170px] max-w-[170px] snap-start overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative h-[116px] w-full overflow-hidden">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                {item.badge}
              </span>
            </div>
            <div className="space-y-1 p-2.5">
              <p className="text-[22px] font-extrabold leading-none tracking-tight text-slate-800">{item.price}</p>
              <p className="line-clamp-1 text-[12px] font-bold uppercase text-slate-700">{item.title}</p>
              <p className="line-clamp-2 min-h-8 text-[12px] leading-4 text-slate-500">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#edf2f7] pb-24 text-slate-900">
      <div className="mx-auto w-full max-w-2xl px-3 pb-2 pt-3 sm:px-5 sm:pt-6">
        <PiBrowserBanner />
        <section className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-sky-300 to-indigo-300" />
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search Pi Market"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-sky-500/30 placeholder:text-slate-400 focus:ring"
              />
            </div>
            <button type="button" className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-bold text-slate-600">EN</button>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {quickFilters.map((filter) => (
              <button
                type="button"
                key={filter}
                className="whitespace-nowrap rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            alt="Marketplace update banner"
            className="h-[180px] w-full object-cover"
          />
          <div className="flex items-center justify-between bg-[#06184a] px-4 py-2 text-sm text-white">
            <span className="font-semibold">Click here for updates on our X channel</span>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="rounded-md bg-white/15 px-2 py-1 text-xs font-bold">Open X</a>
          </div>
        </section>

        {categoryRows.map((row) => (
          <ProductStrip key={row.title} title={row.title} items={row.items} />
        ))}

        <section className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-r from-[#0d3f8f] to-[#0a7fb1] p-4 text-white shadow-sm">
          <h2 className="text-lg font-extrabold tracking-tight">Sell your product for Pi</h2>
          <p className="mt-1 text-sm text-sky-100">Post your item, chat with buyers, and accept Pi securely.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/services" className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0d3f8f]">Explore Services</Link>
            <a href="/Submit.html" className="rounded-full border border-white/60 px-3 py-1.5 text-xs font-bold text-white">Sell Now</a>
          </div>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-300 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around text-[11px] font-semibold text-slate-500">
          <button type="button" className="flex flex-col items-center text-sky-600"><span className="text-lg leading-none">⌂</span>Home</button>
          <button type="button" className="flex flex-col items-center"><span className="text-lg leading-none">❤</span>Favorites</button>
          <button type="button" className="flex flex-col items-center"><span className="text-lg leading-none">＋</span>Sell</button>
          <button type="button" className="flex flex-col items-center"><span className="text-lg leading-none">✉</span>Chat</button>
          <button type="button" className="flex flex-col items-center"><span className="text-lg leading-none">◉</span>Profile</button>
        </div>
      </nav>
    </main>
  );
}
