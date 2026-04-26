import express from "express";
import multer from "multer";
import { uploadBuyers } from "../controllers/admin.upload.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/buyers", verifyAdmin, upload.single("file"), uploadBuyers);

export default router;