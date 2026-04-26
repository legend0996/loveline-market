import prisma from "../utils/prisma.js";

export const payUser = async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const total = user.points + user.viewsEarnings;

  // save payment record
  await prisma.payment.create({
    data: {
      userId,
      amount: total,
      type: "REFERRAL",
    },
  });

  // reset balances
  await prisma.user.update({
    where: { id: userId },
    data: {
      points: 0,
      viewsEarnings: 0,
    },
  });

  res.json({
    message: "User paid successfully",
    amount: total,
  });
};