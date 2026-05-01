import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDB } from "@/lib/db";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json() as { email: string; password: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  const db = getDB(env);

  const operator = await db
    .prepare("SELECT id, name, email, password_hash, status FROM operators WHERE email = ?")
    .bind(email)
    .first<{ id: string; name: string; email: string; password_hash: string; status: string }>();

  if (!operator || !(await verifyPassword(password, operator.password_hash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  if (operator.status === "pending") {
    return NextResponse.json({ error: "Application under review" }, { status: 403 });
  }

  if (operator.status !== "active") {
    return NextResponse.json({ error: "Account not active" }, { status: 403 });
  }

  const token = await signToken(
    { sub: operator.id, name: operator.name, email: operator.email },
    "operator"
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("operator_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
