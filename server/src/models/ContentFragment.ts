import { Schema, model, type InferSchemaType } from "mongoose";

const courseTableRowSchema = new Schema(
  {
    program: { type: String, required: true },
    values: { type: [Schema.Types.Mixed], required: true }, // boolean | string per column
  },
  { _id: false },
);

const contentFragmentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    type: { type: String, enum: ["courseTable"], required: true },
    data: {
      columns: { type: [String], required: true },
      rows: { type: [courseTableRowSchema], required: true },
    },
  },
  { timestamps: true },
);

export type ContentFragmentDoc = InferSchemaType<typeof contentFragmentSchema>;
export const ContentFragment = model("ContentFragment", contentFragmentSchema);
