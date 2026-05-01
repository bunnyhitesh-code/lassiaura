import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("operator_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token, "operator");
  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const operator = await db
    .prepare(
      `SELECT id, name, email, phone, city, state, status, commission_rate, total_earnings, joined_at
       FROM operators WHERE id = ?`
    )
    .bind(payload.sub as string)
    .first();

  if (!operator) {
    return NextResponse.json({ error: "Operator not found" }, { status: 404 });
  }

  return NextResponse.json(operator);
}
