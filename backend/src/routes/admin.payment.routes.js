import express from "express";
import { payUser } from "../controllers/admin.payment.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/pay/:userId", verifyAdmin, payUser);

export default router;