import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verify(token) {
  try {
    return await jwtVerify(token, secret);
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
