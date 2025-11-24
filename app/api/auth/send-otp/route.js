import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { sendOTP } from "@/lib/mailer";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();
  console.log("My email", email)
  if (!email) return Response.json({ error: "Email not found" }, { status: 404 });


  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });

  user.otp = otp;
  user.otpExpires = expires;
  user.name = null;
  await user.save();

  await sendOTP(email, otp);

  return Response.json({ message: "OTP sent" });
}
