import { Router } from "express";
import * as submissionsController from "../controllers/submissions.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import {
  listSubmissionsQuerySchema,
  updateSubmissionStatusSchema,
  addSubmissionNoteSchema,
} from "../validation/form.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.use(requireAuth);

router.get(
  "/",
  validate({ query: listSubmissionsQuerySchema }),
  asyncHandler(submissionsController.listSubmissions),
);
router.get(
  "/export",
  validate({ query: listSubmissionsQuerySchema }),
  asyncHandler(submissionsController.exportSubmissions),
);
router.get("/:id", asyncHandler(submissionsController.getSubmission));
router.patch(
  "/:id",
  requireCsrf,
  validate({ body: updateSubmissionStatusSchema }),
  asyncHandler(submissionsController.updateSubmissionStatus),
);
router.post(
  "/:id/notes",
  requireCsrf,
  validate({ body: addSubmissionNoteSchema }),
  asyncHandler(submissionsController.addSubmissionNote),
);
router.delete("/:id", requireCsrf, asyncHandler(submissionsController.deleteSubmission));

export default router;
