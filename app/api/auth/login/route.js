import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/models/user";
import { signToken } from "@/lib/jwt";

// A bcrypt hash of a random throwaway value (not a secret, it matches nothing).
// When an email has no account we still compare against it, so "no such
// email" takes as long as "wrong password" and timing can't reveal accounts.
const DUMMY_HASH =
  "$2b$10$6tnXi3r9y5JZrtYjnFLOUePQqVkCbSve5Gn7FYAYNW7e34TAXYw7S";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  await connectDB();
  const user = await findUserByEmail(email);

  // Unknown email and wrong password get the identical reply.
  const ok = await bcrypt.compare(password, user?.password || DUMMY_HASH);
  if (!user?.password || !ok) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user._id });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return Response.json({ message: "Logged in successfully" });
}
