import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  currentPassword: z.string().min(1).optional(),
  newPassword: z.string().min(8).optional(),
});
