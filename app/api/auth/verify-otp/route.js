import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  await connectDB();
  const { email, otp, password, name} = await req.json();
  if (!email || !otp || !password || !name) return Response.json({ error: "Details are missing" }, { status: 404 });

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  if (user.otp !== otp || user.otpExpires < new Date())
    return Response.json({ error: "Invalid or expired OTP" }, { status: 400 });

  // Update account with password
  user.password = await bcrypt.hash(password, 10);
  user.otp = null;
  user.otpExpires = null;
  console.log("my name", name)
  user.name = name;
  await user.save();

  return Response.json({
    message: "User created successfully. Please login.",
  });
}
