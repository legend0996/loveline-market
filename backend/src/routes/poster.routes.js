import express from "express";
import multer from "multer";
import {
  uploadPoster,
  getActivePoster,
  getAllPosters,
  updateCaption,
  deletePoster,
  setActivePoster,
} from "../controllers/poster.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🔐 ADMIN ROUTES
router.post("/", verifyAdmin, upload.single("image"), uploadPoster);
router.get("/all", verifyAdmin, getAllPosters);
router.put("/caption/:id", verifyAdmin, updateCaption);
router.post("/activate/:id", verifyAdmin, setActivePoster);
router.delete("/:id", verifyAdmin, deletePoster);

// 👤 USER ROUTE
router.get("/active", getActivePoster);

export default router;