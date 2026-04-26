import express from "express";
import multer from "multer";
import { submitView, getMyViews } from "../controllers/view.controller.js";
import verifyUser from "../middleware/userAuth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/submit", verifyUser, upload.single("screenshot"), submitView);
router.get("/my", verifyUser, getMyViews);

export default router;