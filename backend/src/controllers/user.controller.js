import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// 🔐 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // normalize phone (0712 → 254712)
    const normalizedPhone = phone.replace(/^0/, "254");

    // check if exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { phone: normalizedPhone },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with email or phone already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER (IMPORTANT FIXES)
    const user = await prisma.users.create({
      data: {
        id: crypto.randomUUID(), // REQUIRED (your DB has no default id)
        name,
        email,
        phone: normalizedPhone,
        password: hashedPassword,
      },
    });

    res.json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔑 LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⚠️ FIXED FIELD NAME (snake_case from DB)
    if (user.is_blocked) {
      return res.status(403).json({ message: "Account blocked" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        points: user.points || 0,
        viewsEarnings: user.views_earnings || 0, // ⚠️ FIXED FIELD NAME
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};