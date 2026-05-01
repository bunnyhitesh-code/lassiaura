import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

const VALID_STATUSES = ["pending", "active", "suspended"] as const;
type OperatorStatus = (typeof VALID_STATUSES)[number];

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

  if (!VALID_STATUSES.includes(status as OperatorStatus)) {
    return NextResponse.json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const operator = await db.prepare("SELECT id FROM operators WHERE id = ?").bind(id).first();
  if (!operator) return NextResponse.json({ error: "Operator not found" }, { status: 404 });

  await db.prepare("UPDATE operators SET status = ? WHERE id = ?").bind(status, id).run();

  return NextResponse.json({ success: true });
}
