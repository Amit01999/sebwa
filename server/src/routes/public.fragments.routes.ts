import { Router } from "express";
import * as fragmentsController from "../controllers/fragments.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// Public read access: the `courseTableRef` rich-content block needs to
// resolve a shared fragment (e.g. the WACE/WAM course-availability table)
// on the public pages that reference it, not just inside the admin UI.
router.get("/:key", asyncHandler(fragmentsController.getFragment));

export default router;
