import prisma from "../utils/prisma.js";

// 📋 GET ALL (pending first)
export const getAllViews = async (req, res) => {
  const views = await prisma.viewSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(views);
};

// ✅ APPROVE
export const approveView = async (req, res) => {
  const { id } = req.params;

  const view = await prisma.viewSubmission.findUnique({ where: { id } });

  if (!view) return res.status(404).json({ message: "Not found" });

  if (view.status === "APPROVED") {
    return res.json({ message: "Already approved" });
  }

  // update status
  await prisma.viewSubmission.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  // add earnings to user
  await prisma.user.update({
    where: { id: view.userId },
    data: {
      viewsEarnings: { increment: view.earnings },
    },
  });

  res.json({ message: "View approved" });
};

// ❌ REJECT
export const rejectView = async (req, res) => {
  const { id } = req.params;

  await prisma.viewSubmission.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  res.json({ message: "View rejected" });
};