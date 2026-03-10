import { NextRequest, NextResponse } from "next/server";
import { Hotels, Orders } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ hotels: Hotels.getAll() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { hotelId, checkIn, checkOut, guests, userId, username } = body;

  if (!hotelId || !checkIn || !checkOut) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const hotel = Hotels.getById(hotelId);
  if (!hotel) {
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
  }

  const nights = Math.max(
    1,
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)
  );
  const subtotal = hotel.pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const order = Orders.create({
    userId: userId || "guest",
    username: username || "Guest",
    serviceType: "hotel",
    itemId: hotelId,
    itemName: hotel.name,
    amount: subtotal,
    serviceFee,
    total,
    status: "confirmed",
    details: { checkIn, checkOut, nights: String(nights), guests: String(guests || 1), location: hotel.location },
  });

  return NextResponse.json({ booking: { ...order, hotel: hotel.name, location: hotel.location, pricePerNight: hotel.pricePerNight, nights, subtotal } }, { status: 201 });
}
