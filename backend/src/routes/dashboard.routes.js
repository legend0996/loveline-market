import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";
import verifyUser from "../middleware/userAuth.js";

const router = Router();

router.get("/summary", verifyUser, getDashboardSummary);

export default router;