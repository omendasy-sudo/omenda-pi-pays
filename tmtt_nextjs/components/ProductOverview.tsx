"use client";

import { useState, useRef } from "react";
import { hotels, properties, billProviders } from "@/lib/data";
import { PiPayButton } from "@/components/PiPayButton";

/** Parse price string like "π0.003" or "0.003" into a number */
function parsePiPrice(price: string): number {
  const cleaned = price.replace(/[^\d.]/g, "");
  return parseFloat(cleaned) || 0;
}

/* ── Product Data ── */

type MarketProduct = {
  id: string;
  title: string;
  price: string;
  priceHigh?: string;
  stat: string;
  image: string;
  images: string[];
  tag?: string;
  tagColor?: string;
  category: string;
};

const allCategories = ["All", "Electronics", "Fashion", "Home & Garden", "Cars", "Hotels", "Properties", "Transport", "Bills"];

const marketProducts: MarketProduct[] = [
  // Electronics (GCV: 1π = $314,159)
  { id: "e1", title: "17 PRO MAX Smartphone", price: "π0.003", priceHigh: "0.005", stat: "100+ Heats", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1580910051074-3eb694886571?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop"], tag: "Most Popular", tagColor: "from-rose-500/80 to-rose-600/80", category: "Electronics" },
  { id: "e2", title: "DELL Latitude x360 7320", price: "π0.004", stat: "50+ sold", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&auto=format&fit=crop"], category: "Electronics" },
  { id: "e3", title: "MacBook Air M3 2024", price: "π0.004", stat: "120+ views", image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1629131726692-1acfc0d42e2a?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=400&auto=format&fit=crop"], category: "Electronics" },
  { id: "e4", title: "Smart Watch Ultra", price: "π0.001", priceHigh: "0.002", stat: "1100+", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1546868871-af0de0ae72be?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&auto=format&fit=crop"], tag: "Most Wished", tagColor: "from-violet-500/80 to-violet-600/80", category: "Electronics" },
  { id: "e5", title: "Wireless Earbuds Pro", price: "π0.0005", stat: "200+ sold", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1631176093617-63490a3d785a?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=400&auto=format&fit=crop"], category: "Electronics" },
  { id: "e6", title: "4K Monitor 27\"", price: "π0.002", stat: "15+ sold", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=400&auto=format&fit=crop"], category: "Electronics" },
  // Fashion
  { id: "f1", title: "Leather Crossbody Bag", price: "π0.0003", stat: "40+ sold", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop"], tag: "New Releases", tagColor: "from-amber-500/80 to-amber-600/80", category: "Fashion" },
  { id: "f2", title: "Running Sneakers", price: "π0.0004", stat: "85+ sold", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=400&auto=format&fit=crop"], category: "Fashion" },
  { id: "f3", title: "Sunglasses UV400", price: "π0.0001", stat: "60+ sold", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=400&auto=format&fit=crop"], category: "Fashion" },
  { id: "f4", title: "Leather Belt Set", price: "π0.0001", priceHigh: "0.0002", stat: "6 Pieces (MOQ)", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1608505362930-da3c8e0a43a4?q=80&w=400&auto=format&fit=crop"], category: "Fashion" },
  { id: "f5", title: "Fashion T-Shirts Bundle", price: "π0.00003", stat: "1 Piece (MOQ)", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1503341504253-dff4f94032fc?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop"], category: "Fashion" },
  // Home & Garden
  { id: "hg1", title: "Premium Hair Dryer Kit", price: "π0.0004", stat: "New", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1585747860036-4cb2f4c6ea5c?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=400&auto=format&fit=crop"], category: "Home & Garden" },
  { id: "hg2", title: "7-Layer Shoe Rack", price: "π0.0002", stat: "Popular", image: "https://images.unsplash.com/photo-1616628182509-6f8046f8cb07?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1616628182509-6f8046f8cb07?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=400&auto=format&fit=crop"], category: "Home & Garden" },
  { id: "hg3", title: "Portable Blender", price: "π0.0003", stat: "25+ sold", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1622480916113-9000ac49b79d?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=400&auto=format&fit=crop"], category: "Home & Garden" },
  { id: "hg4", title: "LED Desk Lamp", price: "π0.0001", stat: "Fast seller", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1534105615256-13940a56ff44?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=400&auto=format&fit=crop"], category: "Home & Garden" },
  { id: "hg5", title: "Garden Spray Nozzle", price: "π0.000003", priceHigh: "0.00001", stat: "", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400&auto=format&fit=crop"], category: "Home & Garden" },
  { id: "hg6", title: "Premium Bedding Set", price: "π0.00004", priceHigh: "0.00008", stat: "", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=400&auto=format&fit=crop"], category: "Home & Garden" },
  // Cars
  { id: "c1", title: "Mercedes-Benz GLE 350", price: "π0.19", stat: "Premium", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=400&auto=format&fit=crop"], tag: "Movers & Shakers", tagColor: "from-emerald-500/80 to-emerald-600/80", category: "Cars" },
  { id: "c2", title: "Toyota Camry SE 2018", price: "π0.08", stat: "Clean title", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop"], category: "Cars" },
  { id: "c3", title: "Range Rover Evoque 2019", price: "π0.17", stat: "Automatic", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1606611013016-969c19ba27a5?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=400&auto=format&fit=crop"], category: "Cars" },
  { id: "c4", title: "Honda Civic 2021", price: "π0.09", stat: "Low mileage", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=400&auto=format&fit=crop","https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop"], category: "Cars" },
];

const transportServices = [
  { id: "tr1", icon: "🚗", name: "Economy Ride", price: "0.00001-0.00003 π", desc: "Affordable everyday rides", badge: "Popular" },
  { id: "tr2", icon: "🚙", name: "Comfort Plus", price: "0.00003-0.00005 π", desc: "Spacious SUVs, premium interiors" },
  { id: "tr3", icon: "🏎️", name: "Luxury", price: "0.00005-0.0001 π", desc: "Executive cars for VIP transport", badge: "Premium" },
  { id: "tr4", icon: "🚕", name: "City Taxi", price: "0.00001-0.00003 π", desc: "Licensed metered taxis", badge: "Popular" },
  { id: "tr5", icon: "✈️🚕", name: "Airport Transfer", price: "0.00003-0.00007 π", desc: "Reliable airport pickup & drop" },
  { id: "tr6", icon: "🏍️", name: "Boda / Motorbike", price: "0.000003-0.00001 π", desc: "Quick motorcycle rides" },
  { id: "tr7", icon: "🛺", name: "Tuk-Tuk", price: "0.000006-0.00002 π", desc: "Short city trips", badge: "New" },
  { id: "tr8", icon: "👨‍✈️", name: "Daily Driver", price: "0.00006-0.0001 π/day", desc: "Personal driver for the day" },
  { id: "tr9", icon: "📦", name: "Express Delivery", price: "0.000006-0.00002 π", desc: "Same-day delivery, under 2 hrs", badge: "Popular" },
  { id: "tr10", icon: "🚛", name: "Heavy Cargo", price: "0.00003-0.0001 π", desc: "Furniture & large items" },
];

const flights = [
  { id: "fl1", airline: "Kenya Airways", icon: "🇰🇪", from: "NBO", to: "DXB", price: "0.002 π", duration: "5h 20m" },
  { id: "fl2", airline: "Ethiopian Airlines", icon: "🇪🇹", from: "ADD", to: "LHR", price: "0.003 π", duration: "8h 15m" },
  { id: "fl3", airline: "Emirates", icon: "🇦🇪", from: "DXB", to: "JFK", price: "0.004 π", duration: "13h 40m" },
  { id: "fl4", airline: "RwandAir", icon: "🇷🇼", from: "NBO", to: "EBB", price: "0.0005 π", duration: "1h 05m" },
  { id: "fl5", airline: "Qatar Airways", icon: "🇶🇦", from: "NBO", to: "NRT", price: "0.005 π", duration: "18h 30m" },
  { id: "fl6", airline: "Turkish Airlines", icon: "🇹🇷", from: "DAR", to: "CDG", price: "0.004 π", duration: "12h 45m" },
];

/* ── Image Carousel ── */
function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef(0);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 30) d > 0 ? next() : prev();
  };

  return (
    <div className="relative h-full w-full" onTouchStart={images.length > 1 ? onTouchStart : undefined} onTouchEnd={images.length > 1 ? onTouchEnd : undefined}>
      <img src={images[idx]} alt={`${alt} ${idx + 1}`} className="h-full w-full object-cover" loading="lazy" />
      {images.length > 1 && (
        <>
          <span className="absolute right-1 top-1 rounded bg-black/50 px-1 py-0.5 text-[8px] font-bold text-white">{idx + 1}/{images.length}</span>
          <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
            {images.map((_, i) => (
              <button key={i} type="button" onClick={(e) => { e.stopPropagation(); setIdx(i); }} className={`h-1 rounded-full transition-all ${i === idx ? "w-2 bg-white" : "w-1 bg-white/50"}`} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Product Detail Modal ── */
function ProductDetailModal({ product, onClose }: { product: MarketProduct; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [payStatus, setPayStatus] = useState<"" | "success" | "error">("");
  const [payMsg, setPayMsg] = useState("");
  const touchX = useRef(0);
  const imgs = product.images;
  const piAmount = parsePiPrice(product.price);

  const next = () => setImgIdx((i) => (i + 1) % imgs.length);
  const prev = () => setImgIdx((i) => (i - 1 + imgs.length) % imgs.length);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center" onClick={onClose}>
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button onClick={onClose} className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Image carousel — large */}
        <div
          className="relative h-[280px] w-full overflow-hidden bg-slate-100 sm:h-[340px]"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const d = touchX.current - e.changedTouches[0].clientX;
            if (Math.abs(d) > 30) d > 0 ? next() : prev();
          }}
        >
          <img src={imgs[imgIdx]} alt={`${product.title} ${imgIdx + 1}`} className="h-full w-full object-cover" />
          {/* Prev / Next arrows */}
          <button onClick={prev} className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
          {/* Counter */}
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-xs font-bold text-white">{imgIdx + 1}/{imgs.length}</span>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {imgs.map((_, i) => (
              <button key={i} type="button" onClick={() => setImgIdx(i)} className={`h-2 rounded-full transition-all ${i === imgIdx ? "w-5 bg-white" : "w-2 bg-white/50"}`} />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-1.5 overflow-x-auto bg-white px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {imgs.map((src, i) => (
            <button key={i} onClick={() => setImgIdx(i)} className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === imgIdx ? "border-orange-500 ring-1 ring-orange-400" : "border-transparent opacity-60"}`}>
              <img src={src} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Product info */}
        <div className="px-4 pb-6 pt-2">
          {product.tag && (
            <span className="mb-2 inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-orange-700">{product.tag}</span>
          )}
          <h2 className="text-lg font-extrabold text-slate-900">{product.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{product.category} · {product.stat}</p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-rose-600">{product.price}</span>
            {product.priceHigh && <span className="text-sm text-slate-400">– {product.priceHigh}</span>}
            <span className="text-xs text-slate-400">GCV</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="rounded-lg bg-slate-50 py-2">
              <p className="font-bold text-slate-700">Pi Secured</p>
              <p className="text-slate-400">Safe Trade</p>
            </div>
            <div className="rounded-lg bg-slate-50 py-2">
              <p className="font-bold text-slate-700">Verified</p>
              <p className="text-slate-400">Seller</p>
            </div>
            <div className="rounded-lg bg-slate-50 py-2">
              <p className="font-bold text-slate-700">Global</p>
              <p className="text-slate-400">Shipping</p>
            </div>
          </div>

          {/* Payment status */}
          {payStatus === "success" && (
            <div className="mt-3 rounded-lg bg-green-50 p-2 text-center text-sm font-semibold text-green-700">
              ✅ Payment successful! TxID: {payMsg.slice(0, 12)}…
            </div>
          )}
          {payStatus === "error" && (
            <div className="mt-3 rounded-lg bg-red-50 p-2 text-center text-sm text-red-600">
              ❌ {payMsg}
              <button onClick={() => setPayStatus("")} className="ml-2 underline">Dismiss</button>
            </div>
          )}

          {/* Buy / Order buttons */}
          <div className="mt-4 flex gap-2">
            <PiPayButton
              amount={piAmount}
              memo={`Buy ${product.title} – Omenda Pi Pays`}
              metadata={{ productId: product.id, productTitle: product.title }}
              onSuccess={(txid) => { setPayStatus("success"); setPayMsg(txid); }}
              onError={(err) => { setPayStatus("error"); setPayMsg(err); }}
              className="flex-1 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
            >
              π Buy Now ({product.price})
            </PiPayButton>
            <button className="flex-1 rounded-xl border border-orange-500 py-3 text-sm font-bold text-orange-600 transition-colors hover:bg-orange-50">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ProductOverview Component ── */
export function ProductOverview() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MarketProduct | null>(null);

  const filteredMarket = marketProducts.filter((p) => {
    const matchesTab = activeTab === "All" || p.category === activeTab;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const showHotels = activeTab === "All" || activeTab === "Hotels";
  const showProperties = activeTab === "All" || activeTab === "Properties";
  const showTransport = activeTab === "All" || activeTab === "Transport";
  const showBills = activeTab === "All" || activeTab === "Bills";

  const filteredHotels = hotels.filter((h) => !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()));
  const filteredProperties = properties.filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
  const filteredBills = billProviders.filter((b) => !search || b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* ── Search Bar ── */}
      <div className="bg-white px-3 pb-2 pt-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search all products & services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-300 bg-white py-2 pl-4 pr-20 text-sm outline-none placeholder:text-slate-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
            <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
              <button type="button" className="rounded-full p-1.5 text-slate-400 hover:text-slate-600" aria-label="Camera search">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </button>
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white" aria-label="Search">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="flex items-center gap-0 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {allCategories.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-3 py-2 text-[13px] font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-slate-800 font-bold text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Trending Row (Alibaba-style horizontal scroll with tags) ── */}
      {activeTab === "All" && !search && (
        <div className="bg-white px-3 py-2">
          <div className="flex snap-x gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {marketProducts.filter((p) => p.tag).map((p) => (
              <article key={p.id} className="min-w-[120px] max-w-[120px] cursor-pointer snap-start" onClick={() => setSelectedProduct(p)}>
                <div className="relative h-[110px] overflow-hidden rounded-lg bg-slate-100">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                  {p.tag && (
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${p.tagColor} px-1.5 py-1`}>
                      <span className="text-[10px] font-bold text-white">{p.tag}</span>
                    </div>
                  )}
                </div>
                <div className="mt-1">
                  <p className="text-[12px] font-bold text-rose-600">
                    {p.price}{p.priceHigh ? <span>-{p.priceHigh}</span> : ""}
                  </p>
                  <p className="text-[10px] text-slate-500">{p.stat}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ── Secured Trading Service ── */}
      {activeTab === "All" && !search && (
        <section className="mt-1 bg-white px-3 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-bold text-slate-900">Secured Trading Service</h2>
              <p className="mt-0.5 text-[11px] text-slate-500">Money safe · Multiple payments · Online support</p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </div>
        </section>
      )}

      {/* ── All Products Grid (compact — 10 products fit on phone screen) ── */}
      {filteredMarket.length > 0 && (
        <section className="mt-1 bg-white px-2 py-3">
          <h2 className="mb-2 px-1 text-[15px] font-bold text-slate-900">
            {activeTab === "All" ? "All Products" : activeTab}
            <span className="ml-2 text-[11px] font-normal text-slate-400">({filteredMarket.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredMarket.map((item) => (
              <article key={item.id} className="cursor-pointer overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md" onClick={() => setSelectedProduct(item)}>
                <div className="relative h-[95px] overflow-hidden bg-slate-50">
                  <ImageCarousel images={item.images} alt={item.title} />
                  {item.tag && (
                    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${item.tagColor} px-1.5 py-0.5`}>
                      <span className="text-[9px] font-bold text-white">{item.tag}</span>
                    </div>
                  )}
                </div>
                <div className="p-1.5">
                  <p className="line-clamp-1 text-[11px] leading-tight text-slate-700">{item.title}</p>
                  <p className="mt-0.5 text-[12px] font-bold text-rose-600">
                    {item.price}{item.priceHigh ? `-${item.priceHigh}` : ""}
                  </p>
                  {item.stat && <p className="text-[9px] text-slate-400">{item.stat}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Hotels ── */}
      {showHotels && filteredHotels.length > 0 && (
        <section className="mt-1 bg-white px-2 py-3">
          <h2 className="mb-2 px-1 text-[15px] font-bold text-slate-900">
            🏨 Hotels <span className="text-[11px] font-normal text-slate-400">({filteredHotels.length})</span>
          </h2>
          <div className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filteredHotels.map((hotel) => (
              <article key={hotel.id} className="min-w-[160px] max-w-[160px] snap-start overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
                <div className="relative h-[90px] overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold capitalize text-white">{hotel.type}</span>
                  <span className="absolute right-1.5 top-1.5 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-black">★ {hotel.rating}</span>
                </div>
                <div className="p-2">
                  <p className="line-clamp-1 text-[12px] font-bold text-slate-800">{hotel.name}</p>
                  <p className="text-[10px] text-slate-500">📍 {hotel.location}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-rose-600">{hotel.pricePerNight} π</span>
                    <span className="rounded bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white">Book</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Quickly track your footprints ── */}
      {activeTab === "All" && !search && (
        <section className="mt-1 bg-white px-3 py-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-slate-900">Quickly track your footprints</h2>
            <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </div>
          <div className="flex snap-x gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {marketProducts.slice(10, 18).map((p) => (
              <article key={p.id} className="min-w-[100px] max-w-[100px] snap-start">
                <div className="h-[85px] overflow-hidden rounded-lg bg-slate-100">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-1 text-[11px] font-bold text-rose-600">
                  {p.price}{p.priceHigh ? `-${p.priceHigh}` : ""}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Properties ── */}
      {showProperties && filteredProperties.length > 0 && (
        <section className="mt-1 bg-white px-2 py-3">
          <h2 className="mb-2 px-1 text-[15px] font-bold text-slate-900">
            🏠 Properties <span className="text-[11px] font-normal text-slate-400">({filteredProperties.length})</span>
          </h2>
          <div className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filteredProperties.map((prop) => (
              <article key={prop.id} className="min-w-[160px] max-w-[160px] snap-start overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
                <div className="relative h-[90px] overflow-hidden">
                  <img src={prop.image} alt={prop.title} className="h-full w-full object-cover" loading="lazy" />
                  {prop.featured && <span className="absolute left-1.5 top-1.5 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-black">⭐ Featured</span>}
                </div>
                <div className="p-2">
                  <p className="line-clamp-1 text-[12px] font-bold text-slate-800">{prop.title}</p>
                  <p className="text-[10px] text-slate-500">📍 {prop.location}</p>
                  <div className="mt-1 flex gap-2 text-[9px] text-slate-500">
                    {prop.bedrooms > 0 && <span>🛏 {prop.bedrooms}</span>}
                    {prop.bathrooms > 0 && <span>🚿 {prop.bathrooms}</span>}
                  </div>
                  <p className="mt-1 text-[13px] font-bold text-rose-600">{prop.price.toLocaleString()} π</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Transport ── */}
      {showTransport && (
        <section className="mt-1 bg-white px-2 py-3">
          <h2 className="mb-2 px-1 text-[15px] font-bold text-slate-900">🚗 Transport & Delivery</h2>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {transportServices.map((s) => (
              <div key={s.id} className="rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="text-lg">{s.icon}</span>
                  {s.badge && <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${s.badge === "Popular" ? "bg-amber-100 text-amber-700" : s.badge === "Premium" ? "bg-violet-100 text-violet-700" : "bg-green-100 text-green-700"}`}>{s.badge}</span>}
                </div>
                <p className="text-[12px] font-bold text-slate-800">{s.name}</p>
                <p className="text-[9px] leading-tight text-slate-500">{s.desc}</p>
                <p className="mt-1 text-[12px] font-bold text-rose-600">{s.price}</p>
              </div>
            ))}
          </div>

          <h3 className="mb-1.5 mt-3 text-[13px] font-bold text-slate-800">✈️ Flights</h3>
          <div className="flex snap-x gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {flights.map((f) => (
              <div key={f.id} className="min-w-[150px] max-w-[150px] snap-start rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-base">{f.icon}</span>
                  <span className="text-[11px] font-bold text-slate-700">{f.airline}</span>
                </div>
                <div className="mb-1 flex items-center gap-1 text-[13px] font-extrabold text-slate-900">
                  {f.from} <span className="text-slate-300">→</span> {f.to}
                </div>
                <p className="text-[9px] text-slate-500">{f.duration}</p>
                <p className="mt-0.5 text-[13px] font-bold text-rose-600">{f.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Bills ── */}
      {showBills && filteredBills.length > 0 && (
        <section className="mt-1 bg-white px-2 py-3">
          <h2 className="mb-2 px-1 text-[15px] font-bold text-slate-900">
            💳 Pay Bills <span className="text-[11px] font-normal text-slate-400">({filteredBills.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {filteredBills.map((provider) => (
              <div key={provider.id} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
                <span className="text-lg">{provider.icon}</span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 truncate">{provider.name}</p>
                  <p className="text-[9px] text-slate-500 truncate">{provider.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Single Purchase Ease ── */}
      {activeTab === "All" && !search && (
        <section className="mt-1 flex items-stretch gap-0 overflow-hidden bg-white">
          <div className="flex flex-1 flex-col justify-center px-4 py-4">
            <h2 className="text-[16px] font-extrabold text-slate-900">Single Purchase Ease</h2>
            <ul className="mt-1.5 space-y-0.5 text-[12px] text-slate-600">
              <li className="flex items-center gap-1.5"><svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Bulk Flexibility</li>
              <li className="flex items-center gap-1.5"><svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Certified Sellers</li>
              <li className="flex items-center gap-1.5"><svg className="h-3 w-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Secure Pi Trading</li>
            </ul>
          </div>
          <div className="w-[120px] shrink-0 bg-gradient-to-br from-orange-50 to-amber-50">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop" alt="Secure trading" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </section>
      )}

      {/* ── Sell CTA ── */}
      <section className="mt-1 bg-white px-3 py-3">
        <div className="rounded-xl bg-gradient-to-r from-[#0d3f8f] to-[#0a7fb1] p-3 text-white">
          <h2 className="text-base font-extrabold tracking-tight">Sell your product for Pi</h2>
          <p className="mt-0.5 text-[12px] text-sky-100">Post your item, chat with buyers, and accept Pi securely.</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href="/Submit.html" className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0d3f8f]">Sell Now</a>
          </div>
        </div>
      </section>

      {/* ── Product Detail Modal ── */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
