import express from "express";
import {
  createRemorque,
  getRemorques,
  updateRemorque,
  deleteRemorque,
} from "../controllers/remorque.controller.js";
import { authenticateToken,  isAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", authenticateToken, isAdmin, createRemorque);
router.get("/", authenticateToken, getRemorques);
router.put("/:id", authenticateToken, isAdmin, updateRemorque);
router.delete("/:id", authenticateToken, isAdmin, deleteRemorque);

export default router;
