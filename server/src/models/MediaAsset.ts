import { Schema, model, type InferSchemaType } from "mongoose";

const mediaAssetSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    resourceType: { type: String, enum: ["image", "video"], default: "image" },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    bytes: { type: Number },
    altText: { type: String, default: "" },
    tags: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true },
);

mediaAssetSchema.index({ tags: 1 });

export type MediaAssetDoc = InferSchemaType<typeof mediaAssetSchema>;
export const MediaAsset = model("MediaAsset", mediaAssetSchema);
