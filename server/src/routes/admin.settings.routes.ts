import { Router } from "express";
import * as settingsController from "../controllers/settings.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import { updateSettingsSchema } from "../validation/settings.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.use(requireAuth);

router.get("/", asyncHandler(settingsController.getSettingsAdmin));
router.put(
  "/",
  requireCsrf,
  validate({ body: updateSettingsSchema }),
  asyncHandler(settingsController.updateSettings),
);

export default router;
