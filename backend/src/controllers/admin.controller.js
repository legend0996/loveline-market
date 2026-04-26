import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTPEmail } from "../utils/mailer.js";

// 🔢 GENERATE OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 🔐 LOGIN ADMIN (STEP 1)
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ correct model name
    const admin = await prisma.admins.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 🔑 check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const code = generateOTP();

    // 💾 save OTP (correct model + fields)
    await prisma.admin_otps.create({
      data: {
        id: crypto.randomUUID(),
        email,
        code,
        expires_at: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      },
    });

    // 📧 send email (safe fallback)
    try {
      await sendOTPEmail(email, code);
    } catch (err) {
      console.log("⚠️ Email failed. OTP:", code);
    }

    res.json({
      message: "OTP sent (check email or console)",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔐 VERIFY OTP (STEP 2)
export const verifyOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    const record = await prisma.admin_otps.findFirst({
      where: { email, code },
      orderBy: { created_at: "desc" },
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid code" });
    }

    // ⏰ check expiry
    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "Code expired" });
    }

    // 🎟️ create token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};