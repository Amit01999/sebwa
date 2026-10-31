import type { NextFunction, Request, Response } from "express";
import { CSRF_HEADER_NAME } from "../constants.js";
import { fail } from "../utils/apiResponse.js";

/**
 * Double-submit CSRF check. The csrf value lives inside the JWT (set at
 * login and returned once in the login response body, not as a second
 * cookie), so this works regardless of same-site vs cross-site cookie
 * topology. Must run after `requireAuth` (needs `req.authTokenPayload`).
 */
export function requireCsrf(req: Request, res: Response, next: NextFunction) {
  const expected = req.authTokenPayload?.csrf;
  const provided = req.header(CSRF_HEADER_NAME);

  if (!expected || !provided || provided !== expected) {
    return fail(res, 403, "Missing or invalid CSRF token");
  }

  next();
}
