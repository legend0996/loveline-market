import express from "express";
import {
  getAllViews,
  approveView,
  rejectView,
} from "../controllers/admin.view.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllViews);
router.post("/approve/:id", verifyAdmin, approveView);
router.post("/reject/:id", verifyAdmin, rejectView);

export default router;