import { NextRequest, NextResponse } from "next/server";
import { Properties, Orders } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const featured = searchParams.get("featured");

  let result = Properties.getAll();

  if (type && type !== "all") {
    result = result.filter((p) => p.type === type);
  }
  if (featured === "true") {
    result = result.filter((p) => p.featured);
  }

  return NextResponse.json({ properties: result });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { propertyId, name, phone, message, userId, username } = body;

  if (!propertyId || !name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const property = Properties.getById(propertyId);
  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  const order = Orders.create({
    userId: userId || "guest",
    username: username || name,
    serviceType: "property",
    itemId: propertyId,
    itemName: property.title,
    amount: property.price,
    serviceFee: 0,
    total: property.price,
    status: "pending",
    details: { type: "inquiry", phone, message: message || "", location: property.location },
  });

  return NextResponse.json({ inquiry: order }, { status: 201 });
}
