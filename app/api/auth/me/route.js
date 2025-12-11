import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("Apex", token);
  if (!token)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");

    return Response.json({ user });
  } catch {
    return Response.json({ error: "Invalid session" }, { status: 401 });
  }
}
