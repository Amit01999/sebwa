import type { Request, Response } from "express";
import { fail } from "../utils/apiResponse.js";

export function notFound(req: Request, res: Response) {
  fail(res, 404, `No route for ${req.method} ${req.path}`);
}
