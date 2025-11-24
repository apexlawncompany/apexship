import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;

  if (!uri) throw new Error("Missing MongoDB URI");

  await mongoose.connect(uri);
  isConnected = true;
}
