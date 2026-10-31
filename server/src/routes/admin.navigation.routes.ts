import { Router } from "express";
import * as navigationController from "../controllers/navigation.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import { updateNavigationSchema } from "../validation/navigation.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.use(requireAuth);

router.get("/", asyncHandler(navigationController.getNavigationAdmin));
router.put(
  "/",
  requireCsrf,
  validate({ body: updateNavigationSchema }),
  asyncHandler(navigationController.updateNavigation),
);

export default router;
