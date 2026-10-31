import { Schema, model, type InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    text: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const formSubmissionSchema = new Schema(
  {
    formType: { type: String, enum: ["contact", "lead"], required: true },
    pageSlug: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    // "contact" -> {subject, message}; "lead" -> {phone, surname, location}
    fields: { type: Schema.Types.Mixed, default: {} },
    referenceId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["new", "in_progress", "resolved"], default: "new" },
    notes: { type: [noteSchema], default: [] },
  },
  { timestamps: true },
);

formSubmissionSchema.index({ status: 1, createdAt: -1 });
formSubmissionSchema.index({ name: "text", email: "text" });

export type FormSubmissionDoc = InferSchemaType<typeof formSubmissionSchema>;
export const FormSubmission = model("FormSubmission", formSubmissionSchema);
