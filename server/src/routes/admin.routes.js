import express from "express";
import User from "../models/user.model.js";
import Truck from "../models/Truck.model.js";
import Remorque from "../models/Remorque.model.js";
import Trip from "../models/Trip.model.js";
import Maintenance from "../models/maintenance.model.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const drivers = await User.countDocuments({ role: "driver" });
    const trucks = await Truck.countDocuments();
    const remorques = await Remorque.countDocuments();
    const trips = await Trip.countDocuments();
    const maintenance = await Maintenance.countDocuments();

    res.json({ drivers, trucks, remorques, trips, maintenance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
