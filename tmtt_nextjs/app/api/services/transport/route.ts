import { NextRequest, NextResponse } from "next/server";
import { Drivers, Rides, Orders } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const available = searchParams.get("available");

  if (available === "true") {
    const cat = category as "city" | "taxi" | "hire" | "delivery" | "airways" | undefined;
    return NextResponse.json({ drivers: Drivers.getAvailable(cat || undefined) });
  }

  if (category) {
    return NextResponse.json({ drivers: Drivers.getByCategory(category as "city" | "taxi" | "hire" | "delivery" | "airways") });
  }

  return NextResponse.json({ drivers: Drivers.getAll(), rides: Rides.getAll() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, username, driverId, category, pickup, dropoff, distance } = body;

  if (!pickup || !dropoff || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Find an available driver
  const driver = driverId
    ? Drivers.getById(driverId)
    : Drivers.getAvailable(category)?.[0];

  if (!driver) {
    return NextResponse.json({ error: "No available drivers" }, { status: 404 });
  }

  const dist = distance || Math.round(Math.random() * 20 + 3);
  const baseFare = category === "airways" ? 150 : category === "hire" ? 50 : 5;
  const perKm = category === "airways" ? 2 : category === "hire" ? 1.5 : 1.2;
  const fare = Math.round((baseFare + dist * perKm) * 100) / 100;
  const serviceFee = Math.round(fare * 0.1 * 100) / 100;

  // Create ride
  const ride = Rides.create({
    userId: userId || "guest",
    driverId: driver.id,
    driverName: driver.name,
    category,
    pickup: { address: pickup.address || pickup, lat: pickup.lat || 0, lng: pickup.lng || 0 },
    dropoff: { address: dropoff.address || dropoff, lat: dropoff.lat || 0, lng: dropoff.lng || 0 },
    distance: dist,
    fare,
    status: "accepted",
  });

  // Mark driver busy
  Drivers.updateStatus(driver.id, "busy");

  // Create order
  const order = Orders.create({
    userId: userId || "guest",
    username: username || "Guest",
    serviceType: "transport",
    itemId: ride.id,
    itemName: `${category} ride — ${pickup.address || pickup}`,
    amount: fare,
    serviceFee,
    total: fare + serviceFee,
    status: "confirmed",
    details: { category, pickup: pickup.address || pickup, dropoff: dropoff.address || dropoff, distance: String(dist), driverName: driver.name, vehicle: driver.vehicle, plate: driver.plate },
  });

  return NextResponse.json({
    ride,
    order,
    driver: { id: driver.id, name: driver.name, vehicle: driver.vehicle, plate: driver.plate, rating: driver.rating, image: driver.image },
  }, { status: 201 });
}
