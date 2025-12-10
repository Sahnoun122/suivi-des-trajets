import express from "express";
import {
  createMaintenance,
  getMaintenances,
  updateMaintenance,
} from "../controllers/maintenance.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authenticateToken, createMaintenance);
router.get("/", authenticateToken, getMaintenances);
router.put("/:id", authenticateToken, updateMaintenance);

export default router;
