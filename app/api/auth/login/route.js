import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/models/user";
import { issueOtp, RESEND_COOLDOWN_MS } from "@/lib/otp";
import { sendOTP } from "@/lib/mailer";

// A bcrypt hash of a random throwaway value (not a secret, it matches nothing).
// When an email has no account we still compare against it, so "no such
// email" takes as long as "wrong password" and timing can't reveal accounts.
const DUMMY_HASH =
  "$2b$10$6tnXi3r9y5JZrtYjnFLOUePQqVkCbSve5Gn7FYAYNW7e34TAXYw7S";

// Login step 1 of 2: checks the password, then emails a 6-digit code.
// No login cookie is set here; that happens in verify-login-otp (step 2).
// Calling this again with the same email and password is how "Resend" works.
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

  const { code, waitSeconds } = await issueOtp(user, "login");

  if (waitSeconds) {
    // A login code went out under a minute ago and is still good: go to the
    // code screen and let the timer run out before another one is sent.
    if (user.otpPurpose === "login") {
      return Response.json({
        otpRequired: true,
        resendIn: waitSeconds,
        message:
          "A code was sent less than a minute ago. Use that one, or resend when the timer ends.",
      });
    }
    return Response.json(
      { error: `Please wait ${waitSeconds} seconds, then try again.` },
      { status: 429 }
    );
  }

  try {
    await sendOTP(user.email, code);
  } catch (err) {
    console.error("login: could not send code:", err?.message || err);
    return Response.json(
      { error: "Couldn't send the code. Please try again in a minute." },
      { status: 500 }
    );
  }

  return Response.json({
    otpRequired: true,
    resendIn: RESEND_COOLDOWN_MS / 1000,
  });
}
