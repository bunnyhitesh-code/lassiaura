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

  type TrainingModule = { id: string; title: string; step_order: number; content: string; type: string; required: number };
  type ProgressRow = { module_id: string; completed_at: string };

  const [modules, progress] = await Promise.all([
    db
      .prepare("SELECT id, title, step_order, content, type, required FROM training_modules ORDER BY step_order")
      .all<TrainingModule>(),
    db
      .prepare("SELECT module_id, completed_at FROM operator_progress WHERE operator_id = ?")
      .bind(payload.sub as string)
      .all<ProgressRow>(),
  ]);

  const completedMap = new Map(progress.results.map((p: ProgressRow) => [p.module_id, p.completed_at]));

  const result = modules.results.map((m: TrainingModule) => ({
    ...m,
    completed: completedMap.has(m.id),
    completed_at: completedMap.get(m.id) ?? null,
  }));

  return NextResponse.json(result);
}
