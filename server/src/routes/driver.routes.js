import express from "express";
import { authenticateToken  , isDriver} from "../middleware/auth.middleware.js";
import {
  getMyTrips,
  downloadTripPDF,
  updateTripStatus,
  updateTripDetails,
} from "../controllers/driver.controller.js";

const router = express.Router();

router.get("/my-trips", authenticateToken,isDriver, getMyTrips);

router.get("/:tripId/pdf", authenticateToken,isDriver, downloadTripPDF);

router.put("/:tripId/status", authenticateToken,isDriver, updateTripStatus);

router.put("/:tripId/details", authenticateToken, isDriver, updateTripDetails);

export default router;
