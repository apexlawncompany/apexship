import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: String,
  otpExpires: Date,
  password: String,
  name: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
