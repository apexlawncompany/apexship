import { NextResponse } from "next/server";
import Form from "@/models/form";
import { connectDB } from "@/lib/db";

// GET /api/forms/:id  fetches a single form
export async function GET(req, { params }) {
  try {
    await connectDB();
    const form = await Form.findById(params.id);

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT /api/forms/:id  updates form
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedForm = await Form.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedForm) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(updatedForm, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE /api/forms/:id removes form
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
