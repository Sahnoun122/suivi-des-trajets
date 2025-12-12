import express from "express";
import {
  createMaintenance,
  getMaintenances,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", authenticateToken, createMaintenance);
router.get("/", authenticateToken, getMaintenances);
router.get("/:id", authenticateToken, getMaintenance);
router.put("/:id", authenticateToken, updateMaintenance);
router.delete("/:id", authenticateToken, deleteMaintenance);

export default router;
