import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/models/user";
import { verifyOtp } from "@/lib/otp";
import { signToken } from "@/lib/jwt";

// Login step 2 of 2: checks the emailed code, then sets the login cookie.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const otp = typeof body.otp === "string" ? body.otp.trim() : "";

  if (!email || !otp) {
    return Response.json(
      { error: "Email and code are required" },
      { status: 400 }
    );
  }

  if (!/^\d{6}$/.test(otp)) {
    return Response.json({ error: "The code is 6 digits" }, { status: 400 });
  }

  await connectDB();
  const user = await findUserByEmail(email);
  if (!user?.password) {
    return Response.json(
      { error: "Invalid or expired code. Please request a new one." },
      { status: 400 }
    );
  }

  const result = await verifyOtp(user, otp, "login");
  if (!result.success) {
    return Response.json({ error: result.error }, { status: 400 });
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
