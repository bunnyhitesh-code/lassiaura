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

  const [summary, events] = await Promise.all([
    db
      .prepare(
        `SELECT
           SUM(payout_amount) AS total_earned,
           SUM(CASE WHEN paid_out = 1 THEN payout_amount ELSE 0 END) AS total_paid,
           SUM(CASE WHEN paid_out = 0 AND status = 'completed' THEN payout_amount ELSE 0 END) AS total_pending
         FROM events
         WHERE operator_id = ?`
      )
      .bind(payload.sub as string)
      .first<{ total_earned: number; total_paid: number; total_pending: number }>(),

    db
      .prepare(
        `SELECT e.id, e.status, e.payout_amount, e.paid_out, e.created_at,
                b.event_type, b.package, b.date, b.city
         FROM events e
         JOIN bookings b ON b.id = e.booking_id
         WHERE e.operator_id = ? AND e.payout_amount IS NOT NULL
         ORDER BY b.date DESC`
      )
      .bind(payload.sub as string)
      .all(),
  ]);

  return NextResponse.json({ summary, events: events.results });
}
