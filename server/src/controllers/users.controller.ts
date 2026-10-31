import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { ok, fail } from "../utils/apiResponse.js";

export async function listUsers(req: Request, res: Response) {
  const users = await AdminUser.find({}, { passwordHash: 0 }).sort({ createdAt: 1 }).lean();
  return ok(res, { users });
}

export async function createUser(req: Request, res: Response) {
  const { email, name, password } = req.body as { email: string; name: string; password: string };
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await AdminUser.create({ email: email.toLowerCase(), name, passwordHash });
  return ok(res, { user: { id: user._id, email: user.email, name: user.name } }, 201);
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, isActive, password } = req.body as {
    name?: string;
    isActive?: boolean;
    password?: string;
  };

  if (isActive === false) {
    const activeCount = await AdminUser.countDocuments({ isActive: true });
    const target = await AdminUser.findById(id);
    if (target?.isActive && activeCount <= 1) {
      return fail(res, 400, "Cannot deactivate the last active admin");
    }
  }

  const update: Record<string, unknown> = {};
  if (name !== undefined) update.name = name;
  if (isActive !== undefined) update.isActive = isActive;
  if (password) update.passwordHash = await bcrypt.hash(password, 12);

  const user = await AdminUser.findByIdAndUpdate(id, update, {
    new: true,
    projection: { passwordHash: 0 },
  });
  if (!user) return fail(res, 404, "Admin not found");
  return ok(res, { user });
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  if (req.admin!.id === id) return fail(res, 400, "Cannot delete your own account");

  const activeCount = await AdminUser.countDocuments({ isActive: true });
  const target = await AdminUser.findById(id);
  if (target?.isActive && activeCount <= 1) {
    return fail(res, 400, "Cannot delete the last active admin");
  }

  await AdminUser.findByIdAndDelete(id);
  return ok(res, null);
}

export async function updateProfile(req: Request, res: Response) {
  const { name, currentPassword, newPassword } = req.body as {
    name?: string;
    currentPassword?: string;
    newPassword?: string;
  };

  const user = await AdminUser.findById(req.admin!.id);
  if (!user) return fail(res, 404, "Admin not found");

  if (newPassword) {
    if (!currentPassword)
      return fail(res, 400, "currentPassword is required to set a new password");
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) return fail(res, 401, "Current password is incorrect");
    user.passwordHash = await bcrypt.hash(newPassword, 12);
  }

  if (name !== undefined) user.name = name;
  await user.save();

  return ok(res, { user: { id: user._id, email: user.email, name: user.name } });
}
