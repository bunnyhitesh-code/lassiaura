import { SignJWT, jwtVerify } from "jose";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const computed = await hashPassword(password);
  return computed === hash;
}

export type TokenRole = "admin" | "operator";

function getSecret(role: TokenRole): Uint8Array {
  const envVar =
    role === "admin" ? "JWT_ADMIN_SECRET" : "JWT_OPERATOR_SECRET";
  const secret = process.env[envVar];
  if (!secret) throw new Error(`Missing env var: ${envVar}`);
  return new TextEncoder().encode(secret);
}

export async function signToken(
  payload: Record<string, unknown>,
  role: TokenRole,
  expiresIn = "8h"
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret(role));
}

export async function verifyToken(
  token: string,
  role: TokenRole
): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(role));
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}
