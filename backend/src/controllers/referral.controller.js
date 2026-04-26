import prisma from "../utils/prisma.js";

// normalize phone
const normalizePhone = (phone) => {
  if (phone.startsWith("0")) return phone.replace(/^0/, "254");
  if (phone.startsWith("+")) return phone.replace("+", "");
  return phone;
};

// 📱 SUBMIT REFERRAL
export const submitReferral = async (req, res) => {
  try {
    const { phone } = req.body;
    const userId = req.user.userId;

    const normalizedPhone = normalizePhone(phone);

    // ❌ check buyers table
    const buyer = await prisma.buyers.findUnique({
      where: { phone: normalizedPhone },
    });

    if (buyer) {
      return res.status(400).json({
        message: "This number is already a customer",
      });
    }

    // ❌ check duplicate referrals
    const existing = await prisma.referrals.findFirst({
      where: { phone: normalizedPhone },
    });

    if (existing) {
      return res.status(400).json({
        message: "This number already submitted",
      });
    }

    // ✅ save referral
    await prisma.referrals.create({
      data: {
        id: crypto.randomUUID(), // REQUIRED (your schema has no default id)
        user_id: userId,
        phone: normalizedPhone,
        status: "PENDING",
      },
    });

    res.json({
      message: "Referral submitted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 📊 GET USER REFERRALS
export const getMyReferrals = async (req, res) => {
  try {
    const userId = req.user.userId;

    const referrals = await prisma.referrals.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    res.json(referrals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};