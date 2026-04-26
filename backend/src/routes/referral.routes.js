import express from "express";
import { submitReferral, getMyReferrals } from "../controllers/referral.controller.js";
import verifyUser from "../middleware/userAuth.js";

const router = express.Router();

router.post("/submit", verifyUser, submitReferral);
router.get("/my", verifyUser, getMyReferrals);

export default router;