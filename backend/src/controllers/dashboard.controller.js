import prisma from "../utils/prisma.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    // REFERRALS
    const referrals = await prisma.referrals.findMany({
      where: { user_id: userId },
    });

    const approvedRefs = referrals.filter(r => r.status === "APPROVED");
    const pendingRefs = referrals.filter(r => r.status === "PENDING");

    // VIEWS
    const views = await prisma.view_submissions.findMany({
      where: { user_id: userId },
    });

    const approvedViews = views.filter(v => v.status === "APPROVED");
    const pendingViews = views.filter(v => v.status === "PENDING");

    const totalViewEarnings = approvedViews.reduce(
      (sum, v) => sum + (v.earnings || 0),
      0
    );

    res.json({
      totalPoints: approvedRefs.length,
      pendingReferrals: pendingRefs.length,
      approvedReferrals: approvedRefs.length,
      totalViewEarnings,
      pendingViews: pendingViews.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};