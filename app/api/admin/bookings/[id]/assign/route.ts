import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token, "admin");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const { id } = await params;
  const body = await req.json() as { operator_id?: string; payout_amount?: number };
  const { operator_id, payout_amount } = body;

  if (!operator_id) return NextResponse.json({ error: "operator_id required" }, { status: 400 });

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const [booking, operator] = await Promise.all([
    db.prepare("SELECT id, status FROM bookings WHERE id = ?").bind(id).first<{ id: string; status: string }>(),
    db.prepare("SELECT id FROM operators WHERE id = ? AND status = 'active'").bind(operator_id).first(),
  ]);

  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (!operator) return NextResponse.json({ error: "Operator not found or not active" }, { status: 404 });

  const eventId = crypto.randomUUID();

  await db.batch([
    db
      .prepare(
        `INSERT INTO events (id, booking_id, operator_id, status, payout_amount, paid_out, created_at)
         VALUES (?, ?, ?, 'assigned', ?, 0, ?)`
      )
      .bind(eventId, id, operator_id, payout_amount ?? null, new Date().toISOString()),
    db
      .prepare("UPDATE bookings SET operator_id = ?, status = 'confirmed' WHERE id = ?")
      .bind(operator_id, id),
  ]);

  return NextResponse.json({ success: true, event_id: eventId }, { status: 201 });
}
