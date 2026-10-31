import { Router } from "express";
import * as pagesController from "../controllers/pages.controller.js";
import { validate } from "../middleware/validate.js";
import { slugParamSchema } from "../validation/page.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(pagesController.getPublicPage),
);

export default router;
