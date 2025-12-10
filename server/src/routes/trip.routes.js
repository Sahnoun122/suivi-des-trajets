import express from "express";
import {
  createTrip,
  getTrips,
  updateTrip,
  deleteTrip,
} from "../controllers/trip.controller.js";
import { authenticateToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, isAdmin, createTrip);
router.get("/", authenticateToken, getTrips);
router.put("/:id", authenticateToken, isAdmin, updateTrip);
router.delete("/:id", authenticateToken, isAdmin, deleteTrip);

export default router;
