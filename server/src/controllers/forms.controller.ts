import type { Request, Response } from "express";
import { FormSubmission } from "../models/FormSubmission.js";
import { generateReferenceId } from "../services/referenceId.service.js";
import { ok } from "../utils/apiResponse.js";

export async function submitForm(req: Request, res: Response) {
  const { formType, pageSlug, name, email, fields } = req.body as {
    formType: "contact" | "lead";
    pageSlug: string;
    name: string;
    email: string;
    fields: Record<string, string>;
  };

  const referenceId = await generateReferenceId();

  await FormSubmission.create({ formType, pageSlug, name, email, fields, referenceId });

  return ok(res, { referenceId }, 201);
}
