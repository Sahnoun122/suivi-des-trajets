import express from "express";
import {
  createFuelLog,
  getFuelLogs,
} from "../controllers/fuelLog.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authenticateToken, createFuelLog);
router.get("/", authenticateToken, getFuelLogs);

export default router;
