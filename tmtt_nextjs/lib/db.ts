/**
 * ═══════════════════════════════════════════════════════════════
 *  Omenda Pi Pays — Backend Data Store
 *  In-memory data layer with CRUD operations for all services.
 *  Replace the store arrays with a real DB (PostgreSQL, MongoDB,
 *  Supabase, etc.) when ready — the function signatures stay the same.
 * ═══════════════════════════════════════════════════════════════
 */

import {
  Hotel, Property, BillProvider, User, Order, Payment,
  Driver, Ride, SocialPost, SocialComment, MapMarker,
} from "./types";
import { hotels as seedHotels, properties as seedProperties, billProviders as seedBillProviders } from "./data";

// ─── helpers ───
function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
function now() {
  return new Date().toISOString();
}

// ══════════════════════════════════════════════════════════════
//  IN-MEMORY STORES
// ══════════════════════════════════════════════════════════════

const users: User[] = [
  { id: "u1", uid: "pi_admin_001", username: "admin", role: "admin", createdAt: "2026-01-01T00:00:00Z", lastLogin: "2026-03-08T10:00:00Z", wallet: 10000 },
  { id: "u2", uid: "pi_john_002", username: "JohnM", role: "user", createdAt: "2026-01-15T08:30:00Z", lastLogin: "2026-03-08T09:15:00Z", wallet: 520 },
  { id: "u3", uid: "pi_amina_003", username: "AminaK", role: "user", createdAt: "2026-02-01T12:00:00Z", lastLogin: "2026-03-07T16:45:00Z", wallet: 340 },
  { id: "u4", uid: "pi_david_004", username: "DavidO", role: "user", createdAt: "2026-02-10T07:00:00Z", lastLogin: "2026-03-08T08:00:00Z", wallet: 1200 },
  { id: "u5", uid: "pi_fatma_005", username: "FatmaH", role: "user", createdAt: "2026-02-14T14:30:00Z", lastLogin: "2026-03-07T22:10:00Z", wallet: 780 },
  { id: "u6", uid: "pi_peter_006", username: "PeterN", role: "driver", createdAt: "2026-01-20T10:00:00Z", lastLogin: "2026-03-08T07:30:00Z", wallet: 2100 },
  { id: "u7", uid: "pi_grace_007", username: "GraceW", role: "user", createdAt: "2026-02-28T09:00:00Z", lastLogin: "2026-03-06T18:00:00Z", wallet: 90 },
  { id: "u8", uid: "pi_ali_008", username: "AliR", role: "user", createdAt: "2026-03-01T11:00:00Z", lastLogin: "2026-03-06T20:00:00Z", wallet: 450 },
  { id: "u9", uid: "pi_sarah_009", username: "SarahL", role: "user", createdAt: "2026-03-03T15:00:00Z", lastLogin: "2026-03-06T12:30:00Z", wallet: 3200 },
  { id: "u10", uid: "pi_driver_010", username: "KarimD", role: "driver", createdAt: "2026-01-10T06:00:00Z", lastLogin: "2026-03-08T06:00:00Z", wallet: 3800 },
];

const hotelsStore: Hotel[] = [...seedHotels];

const propertiesStore: Property[] = [...seedProperties];

const billProvidersStore: BillProvider[] = [...seedBillProviders];

const orders: Order[] = [
  { id: "ORD-2026-001", userId: "u2", username: "JohnM", serviceType: "hotel", itemId: "h1", itemName: "Serena Hotel", amount: 360, serviceFee: 18, total: 378, status: "confirmed", createdAt: "2026-03-08T08:00:00Z", details: { checkIn: "2026-03-10", checkOut: "2026-03-13", nights: "3", guests: "2" } },
  { id: "ORD-2026-002", userId: "u3", username: "AminaK", serviceType: "bill", itemId: "b1", itemName: "TANESCO", amount: 45, serviceFee: 1, total: 46, status: "completed", createdAt: "2026-03-08T09:00:00Z", details: { accountNumber: "TZ-45923", provider: "TANESCO" } },
  { id: "ORD-2026-003", userId: "u4", username: "DavidO", serviceType: "property", itemId: "p1", itemName: "Modern Villa", amount: 450000, serviceFee: 0, total: 450000, status: "pending", createdAt: "2026-03-07T14:00:00Z", details: { type: "inquiry", phone: "+255712345678" } },
  { id: "ORD-2026-004", userId: "u5", username: "FatmaH", serviceType: "hotel", itemId: "h3", itemName: "Zanzibar Beach Resort", amount: 600, serviceFee: 30, total: 630, status: "confirmed", createdAt: "2026-03-07T11:00:00Z", details: { checkIn: "2026-03-15", checkOut: "2026-03-18", nights: "3", guests: "2" } },
  { id: "ORD-2026-005", userId: "u6", username: "PeterN", serviceType: "bill", itemId: "b3", itemName: "Vodacom", amount: 25, serviceFee: 1, total: 26, status: "completed", createdAt: "2026-03-07T10:00:00Z", details: { accountNumber: "255-712-000-111", provider: "Vodacom" } },
  { id: "ORD-2026-006", userId: "u7", username: "GraceW", serviceType: "bill", itemId: "b8", itemName: "DSTV", amount: 30, serviceFee: 1, total: 31, status: "cancelled", createdAt: "2026-03-06T16:00:00Z", details: { accountNumber: "DST-99281", provider: "DSTV" } },
  { id: "ORD-2026-007", userId: "u8", username: "AliR", serviceType: "hotel", itemId: "h4", itemName: "City Lodge Hotel", amount: 135, serviceFee: 6.75, total: 141.75, status: "pending", createdAt: "2026-03-06T15:00:00Z", details: { checkIn: "2026-03-12", checkOut: "2026-03-15", nights: "3", guests: "1" } },
  { id: "ORD-2026-008", userId: "u9", username: "SarahL", serviceType: "property", itemId: "p2", itemName: "3BR Apartment", amount: 85000, serviceFee: 0, total: 85000, status: "pending", createdAt: "2026-03-06T13:00:00Z", details: { type: "inquiry", phone: "+254700111222" } },
  { id: "ORD-2026-009", userId: "u2", username: "JohnM", serviceType: "transport", itemId: "r1", itemName: "City Ride — Airport", amount: 25, serviceFee: 2.5, total: 27.5, status: "completed", createdAt: "2026-03-05T07:00:00Z", details: { category: "city", pickup: "JNIA Airport", dropoff: "Masaki Peninsula" } },
  { id: "ORD-2026-010", userId: "u5", username: "FatmaH", serviceType: "bill", itemId: "b2", itemName: "DAWASCO", amount: 18, serviceFee: 1, total: 19, status: "completed", createdAt: "2026-03-05T11:00:00Z", details: { accountNumber: "DAW-77123", provider: "DAWASCO" } },
];

const payments: Payment[] = [
  { id: "PAY-001", orderId: "ORD-2026-001", userId: "u2", amount: 378, piPaymentId: "pi_pay_abc1", txid: "tx_001", status: "completed", createdAt: "2026-03-08T08:01:00Z" },
  { id: "PAY-002", orderId: "ORD-2026-002", userId: "u3", amount: 46, piPaymentId: "pi_pay_abc2", txid: "tx_002", status: "completed", createdAt: "2026-03-08T09:01:00Z" },
  { id: "PAY-003", orderId: "ORD-2026-004", userId: "u5", amount: 630, piPaymentId: "pi_pay_abc3", txid: "tx_003", status: "completed", createdAt: "2026-03-07T11:02:00Z" },
  { id: "PAY-004", orderId: "ORD-2026-005", userId: "u6", amount: 26, piPaymentId: "pi_pay_abc4", txid: "tx_004", status: "completed", createdAt: "2026-03-07T10:01:00Z" },
  { id: "PAY-005", orderId: "ORD-2026-006", userId: "u7", amount: 31, status: "cancelled", createdAt: "2026-03-06T16:05:00Z" },
  { id: "PAY-006", orderId: "ORD-2026-009", userId: "u2", amount: 27.5, piPaymentId: "pi_pay_abc6", txid: "tx_006", status: "completed", createdAt: "2026-03-05T07:02:00Z" },
  { id: "PAY-007", orderId: "ORD-2026-010", userId: "u5", amount: 19, piPaymentId: "pi_pay_abc7", txid: "tx_007", status: "completed", createdAt: "2026-03-05T11:01:00Z" },
];

const drivers: Driver[] = [
  { id: "d1", name: "Karim Daudi", phone: "+255712000001", vehicle: "Toyota Axio", plate: "T 123 DES", rating: 4.8, totalTrips: 342, location: { lat: -6.7924, lng: 39.2083 }, status: "available", category: "city", image: "https://picsum.photos/seed/d1/100/100" },
  { id: "d2", name: "Amos Mwakyusa", phone: "+255713000002", vehicle: "Suzuki Alto", plate: "T 456 DES", rating: 4.5, totalTrips: 189, location: { lat: -6.8000, lng: 39.2700 }, status: "available", category: "city", image: "https://picsum.photos/seed/d2/100/100" },
  { id: "d3", name: "Hassan Juma", phone: "+255714000003", vehicle: "Toyota NZE", plate: "T 789 DES", rating: 4.9, totalTrips: 510, location: { lat: -6.7750, lng: 39.2340 }, status: "busy", category: "taxi", image: "https://picsum.photos/seed/d3/100/100" },
  { id: "d4", name: "Joseph Kamau", phone: "+254722000004", vehicle: "Toyota Probox", plate: "KDA 234X", rating: 4.3, totalTrips: 276, location: { lat: -1.2921, lng: 36.8219 }, status: "available", category: "taxi", image: "https://picsum.photos/seed/d4/100/100" },
  { id: "d5", name: "Mary Otieno", phone: "+254733000005", vehicle: "Honda Fit", plate: "KCA 567Y", rating: 4.7, totalTrips: 421, location: { lat: -1.2864, lng: 36.8172 }, status: "available", category: "city", image: "https://picsum.photos/seed/d5/100/100" },
  { id: "d6", name: "Salim Bakari", phone: "+255715000006", vehicle: "Toyota HiAce", plate: "T 321 ZNZ", rating: 4.6, totalTrips: 155, location: { lat: -6.1659, lng: 39.1982 }, status: "available", category: "hire", image: "https://picsum.photos/seed/d6/100/100" },
  { id: "d7", name: "Daniel Oloo", phone: "+254744000007", vehicle: "Mitsubishi L200", plate: "KBZ 890A", rating: 4.4, totalTrips: 98, location: { lat: -1.3000, lng: 36.7800 }, status: "available", category: "delivery", image: "https://picsum.photos/seed/d7/100/100" },
  { id: "d8", name: "Agnes Mwende", phone: "+255716000008", vehicle: "Bajaj RE", plate: "T 654 DES", rating: 4.2, totalTrips: 620, location: { lat: -6.8100, lng: 39.2750 }, status: "offline", category: "city", image: "https://picsum.photos/seed/d8/100/100" },
];

const rides: Ride[] = [
  { id: "r1", userId: "u2", driverId: "d1", driverName: "Karim Daudi", category: "city", pickup: { address: "JNIA Airport", lat: -6.8781, lng: 39.2026 }, dropoff: { address: "Masaki Peninsula", lat: -6.7500, lng: 39.2700 }, distance: 18.5, fare: 25, status: "completed", createdAt: "2026-03-05T07:00:00Z" },
  { id: "r2", userId: "u5", driverId: "d3", driverName: "Hassan Juma", category: "taxi", pickup: { address: "Kariakoo Market", lat: -6.8260, lng: 39.2750 }, dropoff: { address: "Mlimani City Mall", lat: -6.7700, lng: 39.2200 }, distance: 8.2, fare: 12, status: "completed", createdAt: "2026-03-06T14:30:00Z" },
  { id: "r3", userId: "u4", driverId: "d5", driverName: "Mary Otieno", category: "city", pickup: { address: "KICC, Nairobi", lat: -1.2864, lng: 36.8172 }, dropoff: { address: "Westlands, Nairobi", lat: -1.2676, lng: 36.8114 }, distance: 5.1, fare: 8, status: "completed", createdAt: "2026-03-07T09:00:00Z" },
];

const socialPosts: SocialPost[] = [
  { id: "s1", userId: "u2", username: "JohnM", avatar: "https://picsum.photos/seed/u2/50/50", content: "Just booked my stay at Serena Hotel using Pi! 🏨 The future of travel payments is here. #PiPayments #Travel", likes: 24, comments: 5, shares: 3, likedBy: ["u3", "u4", "u5"], createdAt: "2026-03-08T08:30:00Z", tags: ["PiPayments", "Travel"] },
  { id: "s2", userId: "u3", username: "AminaK", avatar: "https://picsum.photos/seed/u3/50/50", content: "Paid my electricity bill with Pi in seconds! No more long queues. ⚡ Love the convenience of Omenda Pi Pays.", likes: 18, comments: 3, shares: 7, likedBy: ["u2", "u5", "u7"], createdAt: "2026-03-08T09:15:00Z", tags: ["BillPay", "PiNetwork"] },
  { id: "s3", userId: "u5", username: "FatmaH", avatar: "https://picsum.photos/seed/u5/50/50", content: "Zanzibar Beach Resort here I come! 🏖️ Booked 3 nights, all paid in Pi. Can't wait!", image: "https://picsum.photos/seed/beach/600/400", likes: 42, comments: 8, shares: 12, likedBy: ["u2", "u3", "u4", "u7", "u8"], createdAt: "2026-03-07T12:00:00Z", tags: ["Zanzibar", "Travel", "Pi"] },
  { id: "s4", userId: "u4", username: "DavidO", avatar: "https://picsum.photos/seed/u4/50/50", content: "Exploring stunning properties on the platform. Modern Villa with Ocean View is 🔥. Who else is house hunting with Pi?", likes: 31, comments: 6, shares: 4, likedBy: ["u2", "u3", "u9"], createdAt: "2026-03-07T15:00:00Z", tags: ["RealEstate", "PiHomes"] },
  { id: "s5", userId: "u6", username: "PeterN", avatar: "https://picsum.photos/seed/u6/50/50", content: "As a driver on the platform, I've completed 342 rides paid in Pi. The transport feature is a game changer! 🚗", likes: 55, comments: 12, shares: 20, likedBy: ["u2", "u3", "u4", "u5", "u7", "u8"], createdAt: "2026-03-06T16:00:00Z", tags: ["Transport", "PiDriver", "Earnings"] },
  { id: "s6", userId: "u9", username: "SarahL", avatar: "https://picsum.photos/seed/u9/50/50", content: "The multi-language support is amazing! 🌍 I switched to Swahili and everything just works. Jambo! Karibu Pi Pays!", likes: 27, comments: 4, shares: 9, likedBy: ["u3", "u5", "u6"], createdAt: "2026-03-06T14:00:00Z", tags: ["i18n", "Swahili", "Global"] },
  { id: "s7", userId: "u8", username: "AliR", avatar: "https://picsum.photos/seed/u8/50/50", content: "City Lodge Hotel was perfect for my business trip to Kampala. Budget-friendly and paid with Pi! 💼", likes: 15, comments: 2, shares: 1, likedBy: ["u2", "u7"], createdAt: "2026-03-05T18:00:00Z", tags: ["Business", "Hotels", "Pi"] },
  { id: "s8", userId: "u7", username: "GraceW", avatar: "https://picsum.photos/seed/u7/50/50", content: "Just discovered the map feature — you can find every service globally! Hotels, rides, bill pay locations all in one place. 🗺️", likes: 38, comments: 7, shares: 15, likedBy: ["u2", "u3", "u4", "u5"], createdAt: "2026-03-05T10:00:00Z", tags: ["Map", "Services", "Global"] },
];

const socialComments: SocialComment[] = [
  { id: "c1", postId: "s1", userId: "u3", username: "AminaK", content: "So exciting! How was the booking process?", createdAt: "2026-03-08T08:45:00Z" },
  { id: "c2", postId: "s1", userId: "u5", username: "FatmaH", content: "Serena is amazing! You'll love it.", createdAt: "2026-03-08T09:00:00Z" },
  { id: "c3", postId: "s2", userId: "u2", username: "JohnM", content: "Same here! Never going back to manual payments.", createdAt: "2026-03-08T09:30:00Z" },
  { id: "c4", postId: "s3", userId: "u4", username: "DavidO", content: "Take me with you! 😂", createdAt: "2026-03-07T12:30:00Z" },
  { id: "c5", postId: "s5", userId: "u3", username: "AminaK", content: "That's incredible Peter! Keep up the great work.", createdAt: "2026-03-06T16:30:00Z" },
  { id: "c6", postId: "s3", userId: "u8", username: "AliR", content: "Best beach in East Africa, hands down!", createdAt: "2026-03-07T13:00:00Z" },
];

const mapMarkers: MapMarker[] = [
  // Hotels
  { id: "m1", name: "Serena Hotel Dar", category: "hotels", lat: -6.8160, lng: 39.2803, description: "5-star luxury hotel", rating: 4.8, priceRange: "120 π/night" },
  { id: "m2", name: "Hyatt Regency Nairobi", category: "hotels", lat: -1.2921, lng: 36.8219, description: "Modern luxury hotel", rating: 4.6, priceRange: "95 π/night" },
  { id: "m3", name: "Zanzibar Beach Resort", category: "hotels", lat: -6.1659, lng: 39.1882, description: "Beachfront paradise", rating: 4.9, priceRange: "200 π/night" },
  { id: "m4", name: "City Lodge Kampala", category: "hotels", lat: 0.3476, lng: 32.5825, description: "Business hotel", rating: 4.2, priceRange: "45 π/night" },
  { id: "m5", name: "Mountain View Inn", category: "hotels", lat: -3.3869, lng: 36.6830, description: "Safari base camp", rating: 4.4, priceRange: "55 π/night" },
  { id: "m6", name: "Pioneer Backpackers", category: "hotels", lat: -4.0435, lng: 39.6682, description: "Budget hostel", rating: 4.0, priceRange: "15 π/night" },
  // Properties
  { id: "m7", name: "Modern Villa Masaki", category: "homes", lat: -6.7500, lng: 39.2700, description: "5BR Ocean View Villa", priceRange: "450,000 π" },
  { id: "m8", name: "3BR Apt Westlands", category: "homes", lat: -1.2676, lng: 36.8114, description: "Secure apartment complex", priceRange: "85,000 π" },
  { id: "m9", name: "CBD Commercial Plot", category: "homes", lat: -6.8130, lng: 39.2890, description: "Prime commercial land", priceRange: "1,200,000 π" },
  { id: "m10", name: "Penthouse Kilimani", category: "homes", lat: -1.2950, lng: 36.7850, description: "Luxury penthouse suite", priceRange: "320,000 π" },
  // Bills
  { id: "m11", name: "TANESCO Office", category: "bills", lat: -6.8200, lng: 39.2920, description: "Electricity provider" },
  { id: "m12", name: "DAWASCO Center", category: "bills", lat: -6.8100, lng: 39.2850, description: "Water utility" },
  { id: "m13", name: "Vodacom Hub", category: "bills", lat: -6.7960, lng: 39.2780, description: "Mobile provider" },
  { id: "m14", name: "Kenya Power Office", category: "bills", lat: -1.2880, lng: 36.8200, description: "Electricity provider" },
  // Transport
  { id: "m15", name: "City Rides — Dar Hub", category: "transport", lat: -6.7924, lng: 39.2083, description: "Main city ride pickup" },
  { id: "m16", name: "City Rides — Nairobi", category: "transport", lat: -1.2921, lng: 36.8219, description: "Nairobi ride hub" },
  { id: "m17", name: "JNIA Airport Taxi", category: "transport", lat: -6.8781, lng: 39.2026, description: "Airport taxi rank" },
  { id: "m18", name: "Jomo Kenyatta Taxi", category: "transport", lat: -1.3192, lng: 36.9275, description: "JKIA taxi rank" },
  { id: "m19", name: "Zanzibar Ferry Terminal", category: "transport", lat: -6.1200, lng: 39.1900, description: "Ferry & transport" },
  { id: "m20", name: "Pi Airways — Dar", category: "transport", lat: -6.8700, lng: 39.2100, description: "Airways hub" },
  { id: "m21", name: "Pi Airways — Nairobi", category: "transport", lat: -1.3190, lng: 36.9270, description: "Airways hub" },
  // Social
  { id: "m22", name: "Pi Community — Dar", category: "social", lat: -6.8050, lng: 39.2600, description: "Pi community meetup spot" },
  { id: "m23", name: "Pi Community — Nairobi", category: "social", lat: -1.2800, lng: 36.8200, description: "Nairobi Pi community" },
  { id: "m24", name: "Pi Community — Zanzibar", category: "social", lat: -6.1600, lng: 39.2000, description: "Island Pi community" },
  { id: "m25", name: "Pi Community — Kampala", category: "social", lat: 0.3500, lng: 32.5900, description: "Kampala Pi community" },
  { id: "m26", name: "Pi Community — Mombasa", category: "social", lat: -4.0500, lng: 39.6700, description: "Mombasa Pi community" },
];

// ══════════════════════════════════════════════════════════════
//  USERS
// ══════════════════════════════════════════════════════════════

export const Users = {
  getAll: () => [...users],
  getById: (id: string) => users.find((u) => u.id === id),
  getByUid: (uid: string) => users.find((u) => u.uid === uid),
  getByRole: (role: User["role"]) => users.filter((u) => u.role === role),
  count: () => users.length,

  create: (data: { uid: string; username: string; role?: User["role"] }): User => {
    const user: User = {
      id: genId("U"),
      uid: data.uid,
      username: data.username,
      role: data.role || "user",
      createdAt: now(),
      lastLogin: now(),
      wallet: 0,
    };
    users.push(user);
    return user;
  },

  upsertByUid: (uid: string, username: string): User => {
    const existing = users.find((u) => u.uid === uid);
    if (existing) {
      existing.lastLogin = now();
      existing.username = username;
      return existing;
    }
    return Users.create({ uid, username });
  },

  updateWallet: (id: string, delta: number): User | null => {
    const user = users.find((u) => u.id === id);
    if (!user) return null;
    user.wallet += delta;
    return user;
  },
};

// ══════════════════════════════════════════════════════════════
//  HOTELS
// ══════════════════════════════════════════════════════════════

export const Hotels = {
  getAll: () => [...hotelsStore],
  getById: (id: string) => hotelsStore.find((h) => h.id === id),
  getByType: (type: Hotel["type"]) => hotelsStore.filter((h) => h.type === type),
  count: () => hotelsStore.length,

  create: (data: Omit<Hotel, "id">): Hotel => {
    const hotel: Hotel = { id: genId("H"), ...data };
    hotelsStore.push(hotel);
    return hotel;
  },

  update: (id: string, data: Partial<Omit<Hotel, "id">>): Hotel | null => {
    const idx = hotelsStore.findIndex((h) => h.id === id);
    if (idx === -1) return null;
    hotelsStore[idx] = { ...hotelsStore[idx], ...data };
    return hotelsStore[idx];
  },

  delete: (id: string): boolean => {
    const idx = hotelsStore.findIndex((h) => h.id === id);
    if (idx === -1) return false;
    hotelsStore.splice(idx, 1);
    return true;
  },
};

// ══════════════════════════════════════════════════════════════
//  PROPERTIES
// ══════════════════════════════════════════════════════════════

export const Properties = {
  getAll: () => [...propertiesStore],
  getById: (id: string) => propertiesStore.find((p) => p.id === id),
  getByType: (type: Property["type"]) => propertiesStore.filter((p) => p.type === type),
  getFeatured: () => propertiesStore.filter((p) => p.featured),
  count: () => propertiesStore.length,

  create: (data: Omit<Property, "id">): Property => {
    const property: Property = { id: genId("P"), ...data };
    propertiesStore.push(property);
    return property;
  },

  update: (id: string, data: Partial<Omit<Property, "id">>): Property | null => {
    const idx = propertiesStore.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    propertiesStore[idx] = { ...propertiesStore[idx], ...data };
    return propertiesStore[idx];
  },

  delete: (id: string): boolean => {
    const idx = propertiesStore.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    propertiesStore.splice(idx, 1);
    return true;
  },
};

// ══════════════════════════════════════════════════════════════
//  BILL PROVIDERS
// ══════════════════════════════════════════════════════════════

export const BillProviders = {
  getAll: () => [...billProvidersStore],
  getById: (id: string) => billProvidersStore.find((b) => b.id === id),
  getByCategory: (cat: BillProvider["category"]) => billProvidersStore.filter((b) => b.category === cat),
  count: () => billProvidersStore.length,
};

// ══════════════════════════════════════════════════════════════
//  ORDERS
// ══════════════════════════════════════════════════════════════

export const Orders = {
  getAll: () => [...orders],
  getById: (id: string) => orders.find((o) => o.id === id),
  getByUserId: (userId: string) => orders.filter((o) => o.userId === userId),
  getByStatus: (status: Order["status"]) => orders.filter((o) => o.status === status),
  getByService: (serviceType: Order["serviceType"]) => orders.filter((o) => o.serviceType === serviceType),
  count: () => orders.length,

  create: (data: Omit<Order, "id" | "createdAt">): Order => {
    const order: Order = {
      id: genId("ORD"),
      createdAt: now(),
      ...data,
    };
    orders.push(order);
    return order;
  },

  updateStatus: (id: string, status: Order["status"]): Order | null => {
    const order = orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    return order;
  },

  getStats: () => {
    const totalRevenue = orders.filter((o) => o.status === "completed" || o.status === "confirmed").reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const byService = {
      hotel: orders.filter((o) => o.serviceType === "hotel"),
      property: orders.filter((o) => o.serviceType === "property"),
      bill: orders.filter((o) => o.serviceType === "bill"),
      transport: orders.filter((o) => o.serviceType === "transport"),
    };
    return { totalRevenue, totalOrders, pending, completed, cancelled, byService };
  },

  getRecent: (limit = 10) => [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit),
};

// ══════════════════════════════════════════════════════════════
//  PAYMENTS
// ══════════════════════════════════════════════════════════════

export const Payments = {
  getAll: () => [...payments],
  getById: (id: string) => payments.find((p) => p.id === id),
  getByOrderId: (orderId: string) => payments.find((p) => p.orderId === orderId),
  getByUserId: (userId: string) => payments.filter((p) => p.userId === userId),
  count: () => payments.length,

  create: (data: Omit<Payment, "id" | "createdAt">): Payment => {
    const payment: Payment = {
      id: genId("PAY"),
      createdAt: now(),
      ...data,
    };
    payments.push(payment);
    return payment;
  },

  updateStatus: (id: string, status: Payment["status"], piPaymentId?: string, txid?: string): Payment | null => {
    const payment = payments.find((p) => p.id === id);
    if (!payment) return null;
    payment.status = status;
    if (piPaymentId) payment.piPaymentId = piPaymentId;
    if (txid) payment.txid = txid;
    return payment;
  },
};

// ══════════════════════════════════════════════════════════════
//  DRIVERS
// ══════════════════════════════════════════════════════════════

export const Drivers = {
  getAll: () => [...drivers],
  getById: (id: string) => drivers.find((d) => d.id === id),
  getAvailable: (category?: Driver["category"]) => {
    let result = drivers.filter((d) => d.status === "available");
    if (category) result = result.filter((d) => d.category === category);
    return result;
  },
  getByCategory: (category: Driver["category"]) => drivers.filter((d) => d.category === category),
  count: () => drivers.length,

  updateStatus: (id: string, status: Driver["status"]): Driver | null => {
    const driver = drivers.find((d) => d.id === id);
    if (!driver) return null;
    driver.status = status;
    return driver;
  },

  updateLocation: (id: string, lat: number, lng: number): Driver | null => {
    const driver = drivers.find((d) => d.id === id);
    if (!driver) return null;
    driver.location = { lat, lng };
    return driver;
  },
};

// ══════════════════════════════════════════════════════════════
//  RIDES
// ══════════════════════════════════════════════════════════════

export const Rides = {
  getAll: () => [...rides],
  getById: (id: string) => rides.find((r) => r.id === id),
  getByUserId: (userId: string) => rides.filter((r) => r.userId === userId),
  getByDriverId: (driverId: string) => rides.filter((r) => r.driverId === driverId),
  count: () => rides.length,

  create: (data: Omit<Ride, "id" | "createdAt">): Ride => {
    const ride: Ride = {
      id: genId("R"),
      createdAt: now(),
      ...data,
    };
    rides.push(ride);
    return ride;
  },

  updateStatus: (id: string, status: Ride["status"]): Ride | null => {
    const ride = rides.find((r) => r.id === id);
    if (!ride) return null;
    ride.status = status;
    return ride;
  },
};

// ══════════════════════════════════════════════════════════════
//  SOCIAL POSTS
// ══════════════════════════════════════════════════════════════

export const Social = {
  getPosts: () => [...socialPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  getPostById: (id: string) => socialPosts.find((p) => p.id === id),
  getPostsByUser: (userId: string) => socialPosts.filter((p) => p.userId === userId),
  countPosts: () => socialPosts.length,

  createPost: (data: { userId: string; username: string; content: string; image?: string; tags?: string[] }): SocialPost => {
    const post: SocialPost = {
      id: genId("S"),
      userId: data.userId,
      username: data.username,
      avatar: `https://picsum.photos/seed/${data.userId}/50/50`,
      content: data.content,
      image: data.image,
      likes: 0,
      comments: 0,
      shares: 0,
      likedBy: [],
      createdAt: now(),
      tags: data.tags || [],
    };
    socialPosts.push(post);
    return post;
  },

  likePost: (postId: string, userId: string): SocialPost | null => {
    const post = socialPosts.find((p) => p.id === postId);
    if (!post) return null;
    if (post.likedBy.includes(userId)) {
      post.likedBy = post.likedBy.filter((id) => id !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }
    return post;
  },

  deletePost: (id: string): boolean => {
    const idx = socialPosts.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    socialPosts.splice(idx, 1);
    // Remove associated comments
    for (let i = socialComments.length - 1; i >= 0; i--) {
      if (socialComments[i].postId === id) socialComments.splice(i, 1);
    }
    return true;
  },

  getComments: (postId: string) => socialComments.filter((c) => c.postId === postId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),

  addComment: (data: { postId: string; userId: string; username: string; content: string }): SocialComment | null => {
    const post = socialPosts.find((p) => p.id === data.postId);
    if (!post) return null;
    const comment: SocialComment = {
      id: genId("C"),
      postId: data.postId,
      userId: data.userId,
      username: data.username,
      content: data.content,
      createdAt: now(),
    };
    socialComments.push(comment);
    post.comments += 1;
    return comment;
  },
};

// ══════════════════════════════════════════════════════════════
//  MAP MARKERS
// ══════════════════════════════════════════════════════════════

export const Markers = {
  getAll: () => [...mapMarkers],
  getByCategory: (category: MapMarker["category"]) => mapMarkers.filter((m) => m.category === category),
  count: () => mapMarkers.length,
};

// ══════════════════════════════════════════════════════════════
//  DASHBOARD / ANALYTICS
// ══════════════════════════════════════════════════════════════

export const Dashboard = {
  getStats: () => {
    const orderStats = Orders.getStats();
    return {
      totalRevenue: orderStats.totalRevenue,
      totalBookings: orderStats.totalOrders,
      activeUsers: users.filter((u) => u.role === "user").length,
      totalUsers: users.length,
      pendingOrders: orderStats.pending,
      completedOrders: orderStats.completed,
      cancelledOrders: orderStats.cancelled,
      totalDrivers: drivers.length,
      availableDrivers: drivers.filter((d) => d.status === "available").length,
      totalRides: rides.length,
      totalPosts: socialPosts.length,
      totalHotels: hotelsStore.length,
      totalProperties: propertiesStore.length,
      totalBillProviders: billProvidersStore.length,
      revenueByService: {
        hotel: orderStats.byService.hotel.reduce((s, o) => s + o.total, 0),
        property: orderStats.byService.property.reduce((s, o) => s + o.total, 0),
        bill: orderStats.byService.bill.reduce((s, o) => s + o.total, 0),
        transport: orderStats.byService.transport.reduce((s, o) => s + o.total, 0),
      },
      ordersByService: {
        hotel: orderStats.byService.hotel.length,
        property: orderStats.byService.property.length,
        bill: orderStats.byService.bill.length,
        transport: orderStats.byService.transport.length,
      },
    };
  },

  getRecentOrders: (limit = 10) => Orders.getRecent(limit),

  getTopServices: () => {
    const stats = Orders.getStats();
    return [
      { name: "Hotel Bookings", count: stats.byService.hotel.length, revenue: stats.byService.hotel.reduce((s, o) => s + o.total, 0) },
      { name: "Bill Payments", count: stats.byService.bill.length, revenue: stats.byService.bill.reduce((s, o) => s + o.total, 0) },
      { name: "Property Inquiries", count: stats.byService.property.length, revenue: stats.byService.property.reduce((s, o) => s + o.total, 0) },
      { name: "Transport Rides", count: stats.byService.transport.length, revenue: stats.byService.transport.reduce((s, o) => s + o.total, 0) },
    ];
  },
};
