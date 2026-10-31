import { Schema, model, type InferSchemaType } from "mongoose";

const footerNavLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { _id: true },
);

const accreditationLogoSchema = new Schema(
  {
    mediaAsset: { type: Schema.Types.ObjectId, ref: "MediaAsset" },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const siteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    contact: {
      phones: { type: [String], default: [] },
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      hours: { type: String, default: "" },
    },
    social: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    footer: {
      navLinks: { type: [footerNavLinkSchema], default: [] },
      accreditationLogos: { type: [accreditationLogoSchema], default: [] },
    },
    seoDefaults: {
      titleSuffix: { type: String, default: " — SEBWA" },
      defaultOgImage: { type: Schema.Types.ObjectId, ref: "MediaAsset" },
    },
  },
  { timestamps: true },
);

export type SiteSettingsDoc = InferSchemaType<typeof siteSettingsSchema>;
export const SiteSettings = model("SiteSettings", siteSettingsSchema);
