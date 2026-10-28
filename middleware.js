import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// The educational library lives on its own subdomain.
const EDU_HOST = "edu.apexship.net";
const MAIN_ORIGIN = "https://www.apexship.net";
// Every page inside app/(library). Add new library pages here.
const LIBRARY_PATHS = ["/stat"];

const isLibraryPath = (path) =>
  LIBRARY_PATHS.some((p) => path === p || path.startsWith(p + "/"));

async function verify(token) {
  try {
    return await jwtVerify(token, secret);
  } catch (e) {
    return null;
  }
}

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const host = (req.headers.get("host") || "").toLowerCase().split(":")[0];
  const onEdu = host === EDU_HOST || host.startsWith("edu.");

  // edu.apexship.net only serves the library; anything else goes to the main site.
  if (onEdu) {
    if (path === "/") return NextResponse.redirect(new URL("/stat", req.url));
    if (!isLibraryPath(path)) {
      return NextResponse.redirect(new URL(path + req.nextUrl.search, MAIN_ORIGIN));
    }
    return NextResponse.next();
  }

  // Library pages asked for on the main domain move over to the subdomain.
  if (isLibraryPath(path) && host.endsWith("apexship.net")) {
    return NextResponse.redirect(new URL(path, "https://" + EDU_HOST));
  }

  if (!path.startsWith("/admin")) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
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
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  const valid = await verify(token);
  if (!valid) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next's own assets, API routes and files with an extension.
  matcher: ["/((?!_next/|api/|.*\\.[A-Za-z0-9]+$).*)"],
};
