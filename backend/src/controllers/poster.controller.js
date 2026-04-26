import prisma from "../utils/prisma.js";
import fs from "fs";

// 📤 upload new poster
export const uploadPoster = async (req, res) => {
  try {
    const { caption } = req.body;

    // deactivate old posters
    await prisma.poster.updateMany({
      data: { active: false },
    });

    const poster = await prisma.poster.create({
      data: {
        imageUrl: req.file.path,
        caption,
        active: true,
      },
    });

    res.json(poster);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 get active poster
export const getActivePoster = async (req, res) => {
  try {
    const poster = await prisma.poster.findFirst({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(poster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 get all posters (admin)
export const getAllPosters = async (req, res) => {
  try {
    const posters = await prisma.poster.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ update caption
export const updateCaption = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    const poster = await prisma.poster.update({
      where: { id },
      data: { caption },
    });

    res.json(poster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔄 set active poster manually (optional)
export const setActivePoster = async (req, res) => {
  try {
    const { id } = req.params;

    // deactivate all
    await prisma.poster.updateMany({
      data: { active: false },
    });

    // activate selected
    const poster = await prisma.poster.update({
      where: { id },
      data: { active: true },
    });

    res.json(poster);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ delete poster
export const deletePoster = async (req, res) => {
  try {
    const { id } = req.params;

    const poster = await prisma.poster.findUnique({
      where: { id },
    });

    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    // delete file from uploads
    if (poster.imageUrl && fs.existsSync(poster.imageUrl)) {
      fs.unlinkSync(poster.imageUrl);
    }

    await prisma.poster.delete({
      where: { id },
    });

    res.json({ message: "Poster deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};