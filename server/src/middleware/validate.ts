import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { fail } from "../utils/apiResponse.js";

type ValidateSchemas = {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
};

export function validate(schemas: ValidateSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) return fail(res, 400, "Invalid request body", result.error.flatten());
      req.body = result.data;
    }
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) return fail(res, 400, "Invalid request params", result.error.flatten());
      req.params = result.data as typeof req.params;
    }
    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success)
        return fail(res, 400, "Invalid query parameters", result.error.flatten());
      req.query = result.data as typeof req.query;
    }
    next();
  };
}
