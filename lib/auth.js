import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

// Server-side login check, modeled on analogue's lib/auth.js.
// Reads the "token" cookie the browser sends with every request and checks its
// signature. Returns the token's contents ({ id }) when valid, otherwise null.
export async function getServerAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

// For API routes: returns a ready-made 401 reply when nobody is logged in,
// or null when the request may continue. Usage at the top of a handler:
//   const denied = await requireApiAuth();
//   if (denied) return denied;
export async function requireApiAuth() {
  const auth = await getServerAuth();
  if (!auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  return null;
}
