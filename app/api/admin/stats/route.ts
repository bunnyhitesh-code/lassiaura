import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token, "admin");
  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const [bookings, operators, events] = await Promise.all([
    db.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed
      FROM bookings
    `).first<{ total: number; pending: number; confirmed: number; completed: number }>(),

    db.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active
      FROM operators
    `).first<{ total: number; pending: number; active: number }>(),

    db.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN paid_out = 0 THEN payout_amount ELSE 0 END) AS unpaid_total,
        SUM(payout_amount) AS gross_total
      FROM events
    `).first<{ total: number; unpaid_total: number; gross_total: number }>(),
  ]);

  return NextResponse.json({ bookings, operators, events });
}
