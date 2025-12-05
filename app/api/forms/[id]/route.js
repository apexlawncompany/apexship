import { NextResponse } from "next/server";
import Form from "@/models/form";
import { connectDB } from "@/lib/db";

// DELETE /api/forms/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Form.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
