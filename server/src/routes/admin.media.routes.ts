import { Router } from "express";
import multer from "multer";
import * as mediaController from "../controllers/media.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import {
  listMediaQuerySchema,
  uploadMediaBodySchema,
  updateMediaSchema,
  deleteMediaQuerySchema,
} from "../validation/media.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

const router = Router();
router.use(requireAuth);

router.get("/", validate({ query: listMediaQuerySchema }), asyncHandler(mediaController.listMedia));
router.post(
  "/upload",
  requireCsrf,
  upload.single("file"),
  validate({ body: uploadMediaBodySchema }),
  asyncHandler(mediaController.uploadMedia),
);
router.patch(
  "/:id",
  requireCsrf,
  validate({ body: updateMediaSchema }),
  asyncHandler(mediaController.updateMedia),
);
router.delete(
  "/:id",
  requireCsrf,
  validate({ query: deleteMediaQuerySchema }),
  asyncHandler(mediaController.deleteMedia),
);

export default router;
