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

  const module_ = await db
    .prepare("SELECT id FROM training_modules WHERE id = ?")
    .bind(id)
    .first();

  if (!module_) return NextResponse.json({ error: "Module not found" }, { status: 404 });

  const already = await db
    .prepare("SELECT id FROM operator_progress WHERE operator_id = ? AND module_id = ?")
    .bind(payload.sub as string, id)
    .first();

  if (already) return NextResponse.json({ success: true, alreadyCompleted: true });

  await db
    .prepare(
      "INSERT INTO operator_progress (id, operator_id, module_id, completed_at) VALUES (?, ?, ?, ?)"
    )
    .bind(crypto.randomUUID(), payload.sub as string, id, new Date().toISOString())
    .run();

  return NextResponse.json({ success: true }, { status: 201 });
}
