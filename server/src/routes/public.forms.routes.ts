import { Router } from "express";
import * as formsController from "../controllers/forms.controller.js";
import { formSubmitRateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { submitFormSchema } from "../validation/form.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post(
  "/submit",
  formSubmitRateLimit,
  validate({ body: submitFormSchema }),
  asyncHandler(formsController.submitForm),
);

export default router;
