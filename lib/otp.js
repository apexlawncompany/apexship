import { randomInt } from "crypto";
import bcrypt from "bcrypt";
import User from "@/models/user";

// Email code rules, shared by sign-up and login.
export const OTP_TTL_MS = 5 * 60 * 1000; // a code works for 5 minutes
export const RESEND_COOLDOWN_MS = 60 * 1000; // one new code per 60 seconds
export const MAX_ATTEMPTS = 5; // 5 wrong tries and the code is dead

const INVALID = {
  success: false,
  error: "Invalid or expired code. Please request a new one.",
};

// Makes a new 6-digit code for this user and saves only its bcrypt hash.
// Returns { code } to email, or { waitSeconds } if a code went out less than
// 60 seconds ago.
export async function issueOtp(user) {
  const now = Date.now();
  const cutoff = new Date(now - RESEND_COOLDOWN_MS);

  // crypto.randomInt draws from the operating system's secure random source.
  // (Math.random is predictable and must not be used for codes.)
  const code = randomInt(100000, 1000000).toString();
  const otpHash = await bcrypt.hash(code, 10);

  // One database step that both checks the 60-second wait and saves the new
  // code, so two quick clicks can't both slip through.
  const result = await User.updateOne(
    {
      _id: user._id,
      $or: [
        { otpLastSentAt: { $exists: false } },
        { otpLastSentAt: null },
        { otpLastSentAt: { $lte: cutoff } },
      ],
    },
    {
      $set: {
        otpHash,
        otpExpires: new Date(now + OTP_TTL_MS),
        otpAttempts: 0,
        otpUsed: false,
        otpLastSentAt: new Date(now),
      },
      // Clears the old plain-text code field left over from the previous setup.
      $unset: { otp: 1 },
    },
    { strict: false }
  );

  if (result.modifiedCount === 0) {
    const last = user.otpLastSentAt ? new Date(user.otpLastSentAt).getTime() : now;
    const waitSeconds = Math.max(
      1,
      Math.ceil((RESEND_COOLDOWN_MS - (now - last)) / 1000)
    );
    return { waitSeconds };
  }

  return { code };
}

// Checks a typed code against the saved hash.
// Returns { success: true } or { success: false, error }.
export async function verifyOtp(user, code) {
  if (
    !user?.otpHash ||
    user.otpUsed ||
    !user.otpExpires ||
    new Date(user.otpExpires) < new Date() ||
    (user.otpAttempts || 0) >= MAX_ATTEMPTS
  ) {
    return INVALID;
  }

  const match = await bcrypt.compare(String(code), user.otpHash);

  if (!match) {
    const updated = await User.findOneAndUpdate(
      { _id: user._id, otpHash: user.otpHash },
      { $inc: { otpAttempts: 1 } },
      { new: true }
    );
    const attempts = updated?.otpAttempts ?? MAX_ATTEMPTS;

    if (attempts >= MAX_ATTEMPTS) {
      await User.updateOne(
        { _id: user._id, otpHash: user.otpHash },
        { $set: { otpUsed: true }, $unset: { otpHash: 1 } }
      );
      return {
        success: false,
        error: "Too many wrong tries. Please request a new code.",
      };
    }

    const left = MAX_ATTEMPTS - attempts;
    return {
      success: false,
      error: `Incorrect code. ${left} ${left === 1 ? "try" : "tries"} left.`,
    };
  }

  // Single use: only the first request to get here can mark the code as used.
  const result = await User.updateOne(
    { _id: user._id, otpHash: user.otpHash, otpUsed: { $ne: true } },
    { $set: { otpUsed: true }, $unset: { otpHash: 1 } }
  );
  if (result.modifiedCount === 0) return INVALID;

  return { success: true };
}
