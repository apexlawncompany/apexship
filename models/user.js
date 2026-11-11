import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,

  // Email code (one-time passcode). Only a bcrypt hash of the code is stored,
  // never the code itself, so reading the database does not reveal it.
  otpHash: String,
  otpExpires: Date,
  otpAttempts: { type: Number, default: 0 },
  otpUsed: { type: Boolean, default: false },
  otpLastSentAt: Date,
  otpPurpose: String, // "signup" or "login": a code only works for what it was sent for
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Finds a user by email. Tries the exact spelling first (how existing accounts
// were always looked up), then ignores capital letters, so an account saved as
// "Name@Example.com" is still found when someone types "name@example.com".
export async function findUserByEmail(email) {
  const trimmed = email.trim();
  const exact = await User.findOne({ email: trimmed });
  if (exact) return exact;
  return User.findOne({ email: trimmed }).collation({
    locale: "en",
    strength: 2,
  });
}

export default User;
