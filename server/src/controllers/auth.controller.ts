import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { AdminUser } from "../models/AdminUser.js";
import { signAdminToken } from "../services/token.service.js";
import { ok, fail } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: (env.isProduction ? "none" : "lax") as "none" | "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  const user = await AdminUser.findOne({ email: email.toLowerCase() });
  if (!user || !user.isActive) return fail(res, 401, "Invalid email or password");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return fail(res, 401, "Invalid email or password");

  const { token, csrf } = signAdminToken({ id: String(user._id), email: user.email });

  user.lastLoginAt = new Date();
  await user.save();

  res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions());
  return ok(res, { user: { id: user._id, email: user.email, name: user.name }, csrfToken: csrf });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, { path: "/" });
  return ok(res, null);
}

export async function me(req: Request, res: Response) {
  const user = await AdminUser.findById(req.admin!.id).lean();
  if (!user) return fail(res, 401, "Not authenticated");
  // Re-issued on every /me call (not just login) so the SPA can restore its
  // in-memory CSRF token after a page refresh without a second cookie.
  return ok(res, {
    user: { id: user._id, email: user.email, name: user.name },
    csrfToken: req.authTokenPayload?.csrf,
  });
}
