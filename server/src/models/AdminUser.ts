import { Schema, model, type InferSchemaType } from "mongoose";

const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

export type AdminUserDoc = InferSchemaType<typeof adminUserSchema>;
export const AdminUser = model("AdminUser", adminUserSchema);
