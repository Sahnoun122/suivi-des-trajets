import express from "express";
import {
  createPneu,
  getPneus,
  updatePneu,
  deletePneu,
} from "../controllers/pneu.controller.js";
import {  isAdmin } from "../middleware/auth.middleware.js";
import { verifyToken } from "../config/jwt.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createPneu);
router.get("/", verifyToken, getPneus);
router.put("/:id", verifyToken, isAdmin, updatePneu);
router.delete("/:id", verifyToken, isAdmin, deletePneu);

export default router;
