import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    answers: [
      {
        question: { type: String, required: true },
        answer: { type: mongoose.Schema.Types.Mixed },
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.FormResponse ||
  mongoose.model("FormResponse", ResponseSchema);
