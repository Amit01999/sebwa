import { Router } from "express";
import * as navigationController from "../controllers/navigation.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(navigationController.getNavigation));

export default router;
