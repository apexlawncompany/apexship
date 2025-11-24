import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  if (!email || !password) return Response.json({ error: "Email/Password is missing" }, { status: 404 });


  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return Response.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id });

  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return Response.json({ message: "Logged in successfully" });
}
