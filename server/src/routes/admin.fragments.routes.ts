import { Router } from "express";
import * as fragmentsController from "../controllers/fragments.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import { upsertFragmentSchema } from "../validation/fragment.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.use(requireAuth);

router.get("/", asyncHandler(fragmentsController.listFragments));
router.get("/:key", asyncHandler(fragmentsController.getFragment));
router.put(
  "/:key",
  requireCsrf,
  validate({ body: upsertFragmentSchema }),
  asyncHandler(fragmentsController.upsertFragment),
);

export default router;
