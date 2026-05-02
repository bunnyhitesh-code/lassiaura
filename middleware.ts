import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PUBLIC_PREFIXES = ["/admin/login", "/operator/login", "/join", "/api/"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export const runtime = "experimental-edge";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  if (pathname.startsWith("/admin/")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || !(await verifyToken(token, "admin"))) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (pathname.startsWith("/operator/")) {
    const token = req.cookies.get("operator_token")?.value;
    if (!token || !(await verifyToken(token, "operator"))) {
      return NextResponse.redirect(new URL("/operator/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/operator/:path*"],
};
