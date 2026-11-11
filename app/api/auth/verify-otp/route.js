import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/models/user";
import { verifyOtp } from "@/lib/otp";
import { isApprovedEmail } from "@/lib/adminEmails";

// Sign-up step 2: checks the emailed code, then saves the name and password.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const text = (v) => (typeof v === "string" ? v : "");

  const email = text(body.email).trim().toLowerCase();
  const otp = text(body.otp).trim();
  const password = text(body.password);
  const name = text(body.name).trim();

  if (!email || !otp || !password || !name) {
    return Response.json(
      { error: "Email, code, password and name are required" },
      { status: 400 }
    );
  }

  if (!/^\d{6}$/.test(otp)) {
    return Response.json({ error: "The code is 6 digits" }, { status: 400 });
  }

  const invalid = Response.json(
    { error: "Invalid or expired code. Please request a new one." },
    { status: 400 }
  );

  // Codes are only ever issued to approved emails; this re-checks in case the
  // list changed after the code went out.
  if (!isApprovedEmail(email)) return invalid;

  await connectDB();
  const user = await findUserByEmail(email);
  if (!user) return invalid;

  const result = await verifyOtp(user, otp, "signup");
  if (!result.success) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.name = name;
  await user.save();

  return Response.json({ message: "Account ready. Please log in." });
}
