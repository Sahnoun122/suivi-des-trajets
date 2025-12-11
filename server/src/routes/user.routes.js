import express from "express";
import {
  getDrivers,
  toggleDriverStatus,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/drivers",authenticateToken, isAdmin, getDrivers);
router.patch(
  "/drivers/:id/toggle-status",
  authenticateToken,
  isAdmin,toggleDriverStatus
);

export default router;
