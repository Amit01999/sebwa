import { Router } from "express";
import * as pagesController from "../controllers/pages.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import { slugParamSchema, updatePageMetaSchema } from "../validation/page.schema.js";
import {
  addSectionSchema,
  updateSectionSchema,
  reorderSectionsSchema,
} from "../validation/section.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { z } from "zod";

const router = Router();
router.use(requireAuth);

const sectionParamSchema = z.object({ slug: z.string(), sectionId: z.string() });

router.get("/", asyncHandler(pagesController.listPages));
router.get(
  "/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(pagesController.getPageAdmin),
);
router.patch(
  "/:slug",
  requireCsrf,
  validate({ params: slugParamSchema, body: updatePageMetaSchema }),
  asyncHandler(pagesController.updatePageMeta),
);
router.post(
  "/:slug/sections",
  requireCsrf,
  validate({ params: slugParamSchema, body: addSectionSchema }),
  asyncHandler(pagesController.addSection),
);
router.patch(
  "/:slug/sections/reorder",
  requireCsrf,
  validate({ params: slugParamSchema, body: reorderSectionsSchema }),
  asyncHandler(pagesController.reorderSections),
);
router.patch(
  "/:slug/sections/:sectionId",
  requireCsrf,
  validate({ params: sectionParamSchema, body: updateSectionSchema }),
  asyncHandler(pagesController.updateSection),
);
router.delete(
  "/:slug/sections/:sectionId",
  requireCsrf,
  validate({ params: sectionParamSchema }),
  asyncHandler(pagesController.deleteSection),
);

export default router;
