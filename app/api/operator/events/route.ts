import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("operator_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token, "operator");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const { results } = await db
    .prepare(
      `SELECT e.id, e.status, e.operator_notes, e.payout_amount, e.paid_out, e.created_at,
              b.name AS customer_name, b.email AS customer_email, b.event_type, b.package,
              b.date, b.guests, b.city, b.notes AS booking_notes
       FROM events e
       JOIN bookings b ON b.id = e.booking_id
       WHERE e.operator_id = ?
       ORDER BY b.date DESC`
    )
    .bind(payload.sub as string)
    .all();

  return NextResponse.json(results);
}
