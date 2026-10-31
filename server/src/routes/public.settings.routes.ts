import { Router } from "express";
import * as settingsController from "../controllers/settings.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(settingsController.getSettings));

export default router;
