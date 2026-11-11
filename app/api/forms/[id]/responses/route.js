import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Form from "@/models/form";
import FormResponse from "@/models/formResponse";
import { requireApiAuth } from "@/lib/auth";

// POST /api/forms/:id/responses
// PUBLIC: customers submit their answers from app/form/[id].
export async function POST(req, { params }) {
  try {
    await connectDB();

    const resolvedParams = await params;
    const formId = resolvedParams.id;

    const body = await req.json();
    const { answers } = body;

    const form = await Form.findById(formId);
    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { message: "Invalid response format" },
        { status: 400 }
      );
    }

    await FormResponse.create({ formId, answers });

    return NextResponse.json(
      { message: "Response saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Response Save Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// GET /api/forms/:id/responses  lists answers (admin only)
export async function GET(req, { params }) {
  const denied = await requireApiAuth();
  if (denied) return denied;

  try {
    await connectDB();

    const resolvedParams = await params;
    const responses = await FormResponse.find({ formId: resolvedParams.id });

    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    console.error("Fetch Responses Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
