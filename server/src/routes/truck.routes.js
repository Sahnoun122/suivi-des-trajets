import express from "express";
import {
  createTruck,
  getTrucks,
  updateTruck,
  deleteTruck,
} from "../controllers/truck.controller.js";

import { authenticateToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, isAdmin, createTruck);
router.put("/:id", authenticateToken, isAdmin, updateTruck);
router.delete("/:id", authenticateToken, isAdmin, deleteTruck);

router.get("/", authenticateToken, getTrucks);

export default router;
