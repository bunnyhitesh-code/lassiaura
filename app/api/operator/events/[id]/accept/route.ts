import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("operator_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token, "operator");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const { id } = await params;
  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const event = await db
    .prepare("SELECT id, operator_id, status FROM events WHERE id = ?")
    .bind(id)
    .first<{ id: string; operator_id: string; status: string }>();

  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
  if (event.operator_id !== payload.sub) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (event.status !== "assigned") return NextResponse.json({ error: "Event cannot be accepted in current state" }, { status: 409 });

  await db
    .prepare("UPDATE events SET status = 'accepted' WHERE id = ?")
    .bind(id)
    .run();

  return NextResponse.json({ success: true });
}
