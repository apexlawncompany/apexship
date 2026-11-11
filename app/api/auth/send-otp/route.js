import { after } from "next/server";
import { connectDB } from "@/lib/db";
import User, { findUserByEmail } from "@/models/user";
import { sendOTP } from "@/lib/mailer";
import { issueOtp } from "@/lib/otp";
import { isApprovedEmail } from "@/lib/adminEmails";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every valid email gets this exact reply, approved or not, so nobody can use
// this page to find out who is on the ADMIN_EMAILS list.
const REPLY = { message: "If this email is approved, a code is on its way." };

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !emailRegex.test(email)) {
    return Response.json(
      { error: "A valid email is required" },
      { status: 400 }
    );
  }

  if (isApprovedEmail(email)) {
    // after() runs this work just after the reply has been sent. The reply
    // comes back equally fast for approved and unapproved emails, so the
    // response time can't reveal who is on the list either.
    after(async () => {
      try {
        await connectDB();
        let user = await findUserByEmail(email);
        if (!user) user = await User.create({ email });

        // issueOtp enforces the 60-second wait; within it, nothing is sent.
        const { code } = await issueOtp(user, "signup");
        if (code) await sendOTP(email, code);
      } catch (err) {
        console.error("send-otp: could not send code:", err?.message || err);
      }
    });
  }

  return Response.json(REPLY);
}
