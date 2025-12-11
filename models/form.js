import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const FormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Form || mongoose.model("Form", FormSchema);
