import express from "express";
import {
  getPendingReferrals,
  approveReferral,
  rejectReferral,
} from "../controllers/admin.referral.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/pending", verifyAdmin, getPendingReferrals);
router.post("/approve/:id", verifyAdmin, approveReferral);
router.post("/reject/:id", verifyAdmin, rejectReferral);

export default router;