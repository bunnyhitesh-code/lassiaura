import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json() as Record<string, string>;
  const { name, email, password, phone, city, state, why_join } = body;

  if (!name || !email || !password || !phone || !city || !state) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const existing = await db
    .prepare("SELECT id FROM operators WHERE email = ?")
    .bind(email)
    .first();

  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const id = crypto.randomUUID();
  const password_hash = await hashPassword(password);
  const joined_at = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO operators (id, name, email, password_hash, phone, city, state, why_join, status, joined_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
    )
    .bind(id, name, email, password_hash, phone, city, state, why_join ?? null, joined_at)
    .run();

  return NextResponse.json({ success: true, id }, { status: 201 });
}
