import express from "express";
import {
  createTruck,
  getTrucks,
  updateTruck,
  deleteTruck,
} from "../controllers/truck.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";
import { verifyToken } from "../config/jwt.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createTruck);
router.get("/", verifyToken, getTrucks);
router.put("/:id", verifyToken, isAdmin, updateTruck);
router.delete("/:id", verifyToken, isAdmin, deleteTruck);

export default router;
