import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
type BookingStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token, "admin");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json() as { status: string };

  if (!VALID_STATUSES.includes(status as BookingStatus)) {
    return NextResponse.json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const booking = await db.prepare("SELECT id FROM bookings WHERE id = ?").bind(id).first();
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  await db.prepare("UPDATE bookings SET status = ? WHERE id = ?").bind(status, id).run();

  return NextResponse.json({ success: true });
}
