import type { NextFunction, Request, Response } from "express";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { AdminUser } from "../models/AdminUser.js";
import { verifyAdminToken, type AdminTokenPayload } from "../services/token.service.js";
import { fail } from "../utils/apiResponse.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: { id: string; email: string };
      authTokenPayload?: AdminTokenPayload;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  if (!token) return fail(res, 401, "Not authenticated");

  let payload: AdminTokenPayload;
  try {
    payload = verifyAdminToken(token);
  } catch {
    return fail(res, 401, "Session expired or invalid");
  }

  const user = await AdminUser.findById(payload.sub).lean();
  if (!user || !user.isActive) return fail(res, 401, "Account no longer active");

  req.admin = { id: String(user._id), email: user.email };
  req.authTokenPayload = payload;
  next();
}
