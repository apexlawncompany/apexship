import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Checks the login token. HS256 is locked here too, matching lib/jwt.js.
// No secret configured means nobody counts as logged in.
async function verify(token) {
  if (!process.env.JWT_SECRET) return null;
  try {
    return await jwtVerify(token, secret, { algorithms: ["HS256"] });
  } catch (e) {
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const publicRoutes = ["/admin/login", "/admin/register", "/admin/verify"];

  // If logged in, block access to login/register
  if (publicRoutes.includes(path)) {
    if (token) {
      const valid = await verify(token);
      if (valid) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (path.startsWith("/admin") && !publicRoutes.includes(path)) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const valid = await verify(token);
    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
