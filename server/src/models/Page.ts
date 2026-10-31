import { Schema, model, type InferSchemaType } from "mongoose";

export const SECTION_TYPES = [
  "hero",
  "pageHero",
  "about",
  "programsGrid",
  "whyWace",
  "universitiesGrid",
  "cta",
  "richContent",
  "leadForm",
] as const;

const sectionSchema = new Schema(
  {
    type: { type: String, required: true, enum: SECTION_TYPES },
    order: { type: Number, required: true, default: 0 },
    visible: { type: Boolean, default: true },
    // Shape per `type` is enforced by zod in validation/section.schema.ts, not here.
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: false },
);

const pageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    title: { type: String, required: true },
    seo: {
      title: { type: String },
      description: { type: String },
      ogImage: { type: Schema.Types.ObjectId, ref: "MediaAsset" },
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    sections: { type: [sectionSchema], default: [] },
    updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true },
);

export type PageDoc = InferSchemaType<typeof pageSchema>;
export const Page = model("Page", pageSchema);
