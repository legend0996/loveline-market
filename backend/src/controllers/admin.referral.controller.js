import prisma from "../utils/prisma.js";

// 📋 GET PENDING
export const getPendingReferrals = async (req, res) => {
  const referrals = await prisma.referral.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  res.json(referrals);
};

// ✅ APPROVE
export const approveReferral = async (req, res) => {
  const { id } = req.params;

  const referral = await prisma.referral.findUnique({ where: { id } });

  if (!referral) return res.status(404).json({ message: "Not found" });

  // update referral
  await prisma.referral.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  // add point
  await prisma.user.update({
    where: { id: referral.userId },
    data: {
      points: { increment: 1 },
    },
  });

  res.json({ message: "Referral approved +1 point" });
};

// ❌ REJECT
export const rejectReferral = async (req, res) => {
  const { id } = req.params;

  await prisma.referral.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  res.json({ message: "Referral rejected" });
};