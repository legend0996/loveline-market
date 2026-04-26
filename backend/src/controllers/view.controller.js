import prisma from "../utils/prisma.js";

// ⏰ check time window
const isAllowedTime = () => {
  const now = new Date();
  const hour = now.getHours();

  return hour >= 21 && hour <= 23; // 9PM - 11PM
};

// 📅 check same day
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 📤 SUBMIT VIEW
export const submitView = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { views } = req.body;

    // ⏰ time restriction
    if (!isAllowedTime()) {
      return res.status(400).json({
        message: "Submission allowed only between 9PM - 11:59PM",
      });
    }

    // 📅 check if already submitted today
    const latest = await prisma.viewSubmission.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (latest && isSameDay(new Date(latest.createdAt), new Date())) {
      return res.status(400).json({
        message: "You already submitted today",
      });
    }

    // 📊 cap views
    let safeViews = Math.min(parseInt(views), 100);

    // 💰 calculate earnings
    const earnings = Math.floor(safeViews / 5);

    // save
    await prisma.viewSubmission.create({
      data: {
        userId,
        screenshot: req.file.path,
        views: safeViews,
        earnings,
      },
    });

    res.json({
      message: "View submitted successfully",
      earnings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 📊 GET USER VIEWS
export const getMyViews = async (req, res) => {
  try {
    const userId = req.user.userId;

    const views = await prisma.viewSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(views);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};