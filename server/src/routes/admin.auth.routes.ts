import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as usersController from "../controllers/users.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireCsrf } from "../middleware/requireCsrf.js";
import { loginRateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../validation/auth.schema.js";
import { updateProfileSchema } from "../validation/user.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post(
  "/login",
  loginRateLimit,
  validate({ body: loginSchema }),
  asyncHandler(authController.login),
);
router.post("/logout", requireAuth, asyncHandler(authController.logout));
router.get("/me", requireAuth, asyncHandler(authController.me));
router.patch(
  "/profile",
  requireAuth,
  requireCsrf,
  validate({ body: updateProfileSchema }),
  asyncHandler(usersController.updateProfile),
);

export default router;
