import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token, "admin");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const query = status
    ? "SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC"
    : "SELECT * FROM bookings ORDER BY created_at DESC";

  const { results } = status
    ? await db.prepare(query).bind(status).all()
    : await db.prepare(query).all();

  return NextResponse.json(results);
}
