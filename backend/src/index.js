import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import adminReferralRoutes from "./routes/admin.referral.routes.js";
import uploadRoutes from "./routes/admin.upload.routes.js";
import viewRoutes from "./routes/view.routes.js";
import adminViewRoutes from "./routes/admin.view.routes.js";
import paymentRoutes from "./routes/admin.payment.routes.js";
import posterRoutes from "./routes/poster.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/admin/referral", adminReferralRoutes);
app.use("/api/admin/upload", uploadRoutes);
app.use("/api/view", viewRoutes);
app.use("/api/admin/view", adminViewRoutes);
app.use("/api/admin/payment", paymentRoutes);
app.use("/api/poster", posterRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("i love coding with all my passion and dedication");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));