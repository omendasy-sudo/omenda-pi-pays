// ============ Service Types ============

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  description: string;
  rooms: number;
  type: "luxury" | "standard" | "budget";
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "house" | "apartment" | "land" | "commercial";
  description: string;
  featured: boolean;
}

export interface BillProvider {
  id: string;
  name: string;
  icon: string;
  category: "electricity" | "water" | "internet" | "tv" | "phone" | "insurance";
  description: string;
}

export interface Booking {
  id: string;
  serviceType: "hotel" | "property" | "bill" | "transport";
  itemId: string;
  itemName: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  details: Record<string, string>;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  count: number;
}

// ============ User ============

export interface User {
  id: string;
  uid: string;
  username: string;
  role: "user" | "admin" | "driver";
  createdAt: string;
  lastLogin: string;
  wallet: number;
}

// ============ Order / Payment ============

export interface Order {
  id: string;
  userId: string;
  username: string;
  serviceType: "hotel" | "property" | "bill" | "transport" | "social";
  itemId: string;
  itemName: string;
  amount: number;
  serviceFee: number;
  total: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentId?: string;
  createdAt: string;
  details: Record<string, unknown>;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  piPaymentId?: string;
  txid?: string;
  status: "pending" | "approved" | "completed" | "cancelled" | "error";
  createdAt: string;
}

// ============ Transport ============

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  rating: number;
  totalTrips: number;
  location: { lat: number; lng: number };
  status: "available" | "busy" | "offline";
  category: "city" | "taxi" | "hire" | "delivery" | "airways";
  image: string;
}

export interface Ride {
  id: string;
  userId: string;
  driverId: string;
  driverName: string;
  category: "city" | "taxi" | "hire" | "delivery" | "airways";
  pickup: { address: string; lat: number; lng: number };
  dropoff: { address: string; lat: number; lng: number };
  distance: number;
  fare: number;
  status: "requested" | "accepted" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

// ============ Social ============

export interface SocialPost {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  likedBy: string[];
  createdAt: string;
  tags: string[];
}

export interface SocialComment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

// ============ Map Marker ============

export interface MapMarker {
  id: string;
  name: string;
  category: "hotels" | "homes" | "bills" | "transport" | "social";
  lat: number;
  lng: number;
  description: string;
  rating?: number;
  priceRange?: string;
}
