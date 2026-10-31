import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { validate } from "../middleware/validate.js";
import {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
} from "../validation/user.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();
router.use(requireAuth);

router.get("/", asyncHandler(usersController.listUsers));
router.post(
  "/",
  requireCsrf,
  validate({ body: createUserSchema }),
  asyncHandler(usersController.createUser),
);
router.patch(
  "/:id",
  requireCsrf,
  validate({ body: updateUserSchema }),
  asyncHandler(usersController.updateUser),
);
router.delete("/:id", requireCsrf, asyncHandler(usersController.deleteUser));

export default router;
