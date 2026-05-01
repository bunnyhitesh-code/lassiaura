import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token, "admin");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const { id } = await params;
  const body = await req.json() as Record<string, unknown>;

  const ALLOWED = ["title", "step_order", "content", "type", "required"] as const;
  type Field = (typeof ALLOWED)[number];

  const updates = ALLOWED.filter((k) => k in body) as Field[];
  if (updates.length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const module_ = await db
    .prepare("SELECT id FROM training_modules WHERE id = ?")
    .bind(id)
    .first();

  if (!module_) return NextResponse.json({ error: "Module not found" }, { status: 404 });

  const setClauses = updates.map((k) => `${k} = ?`).join(", ");
  const values = updates.map((k) => body[k]);

  await db
    .prepare(`UPDATE training_modules SET ${setClauses} WHERE id = ?`)
    .bind(...values, id)
    .run();

  return NextResponse.json({ success: true });
}
