import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Form from "@/models/form";


export async function POST(request) {
  try {
    const body = await request.json();
    const { name, questions } = body;

    if (!name || !questions || !Array.isArray(questions)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    await connectDB();

    const form = await Form.create({
      name,
      questions,
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET /api/forms list all forms
export async function GET() {
  try {
    await connectDB();
    const forms = await Form.find().sort({ createdAt: -1 });
    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
