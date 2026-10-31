import { Router } from "express";
import mongoose from "mongoose";
import { ok } from "../utils/apiResponse.js";

const router = Router();

router.get("/", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  ok(res, { db: states[mongoose.connection.readyState] ?? "unknown" });
});

export default router;
