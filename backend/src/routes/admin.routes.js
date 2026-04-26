import express from "express";
import { loginAdmin, verifyOTP } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/verify-otp", verifyOTP);

export default router;