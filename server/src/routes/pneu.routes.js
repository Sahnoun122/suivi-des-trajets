import express from "express";
import {
  createPneu,
  getPneus,
  updatePneu,
  deletePneu,
} from "../controllers/pneu.controller.js";
import  {authenticateToken, isAdmin  } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateToken, isAdmin, createPneu);
router.get("/", authenticateToken, getPneus);
router.put("/:id", authenticateToken, isAdmin, updatePneu);
router.delete("/:id", authenticateToken, isAdmin, deletePneu);

export default router;
