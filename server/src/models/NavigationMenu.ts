import { Schema, model, type InferSchemaType } from "mongoose";

const navChildSchema = new Schema(
  {
    label: { type: String, required: true },
    to: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const navItemSchema = new Schema(
  {
    label: { type: String, required: true },
    to: { type: String, required: true },
    order: { type: Number, default: 0 },
    children: { type: [navChildSchema], default: [] },
  },
  { _id: true },
);

const navigationMenuSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    items: { type: [navItemSchema], default: [] },
    ctaButton: {
      label: { type: String, default: "Contact Us" },
      to: { type: String, default: "/contact-us" },
    },
  },
  { timestamps: true },
);

export type NavigationMenuDoc = InferSchemaType<typeof navigationMenuSchema>;
export const NavigationMenu = model("NavigationMenu", navigationMenuSchema);
