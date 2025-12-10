import express from "express";
import {
  createRemorque,
  getRemorques,
  updateRemorque,
  deleteRemorque,
} from "../controllers/remorque.controller.js";
import {  isAdmin } from "../middleware/auth.middleware.js";

import { verifyToken } from "../config/jwt.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createRemorque);
router.get("/", verifyToken, getRemorques);
router.put("/:id", verifyToken, isAdmin, updateRemorque);
router.delete("/:id", verifyToken, isAdmin, deleteRemorque);

export default router;
