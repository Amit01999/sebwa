import crypto from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export type AdminTokenPayload = {
  sub: string;
  email: string;
  csrf: string;
};

export function signAdminToken(user: { id: string; email: string }) {
  const csrf = crypto.randomBytes(24).toString("hex");
  const payload: AdminTokenPayload = { sub: user.id, email: user.email, csrf };
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
  return { token, csrf };
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
}
