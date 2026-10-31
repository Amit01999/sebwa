import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { fail } from "../utils/apiResponse.js";

export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof HttpError) {
    return fail(res, err.status, err.message, err.details);
  }

  if (
    err &&
    typeof err === "object" &&
    "code" in err &&
    (err as { code: unknown }).code === 11000
  ) {
    return fail(res, 409, "A record with that value already exists");
  }

  console.error(err);
  return fail(
    res,
    500,
    env.isProduction ? "Something went wrong" : String((err as Error)?.message ?? err),
  );
}
