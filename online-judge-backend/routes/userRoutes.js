import express from "express";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/**
 * PUBLIC USER PROFILE
 * GET /user/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      university: user.university,
      bio: user.bio,
      exp: user.exp ?? 0,                      // <------ ВАЖНОЕ МЕСТО!
      solvedProblems: user.solvedProblems ?? [],
      createdAt: user.createdAt,
    });

  } catch (err) {
    console.error("Public profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * UPDATE PROFILE
 * PATCH /user/update
 * (requires auth)
 */
router.patch("/update", auth, async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).lean();

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      university: user.university,
      bio: user.bio,
      avatar: user.avatar,
      exp: user.exp ?? 0,                        // <--- Чтобы совпадало
      solvedProblems: user.solvedProblems ?? [],
      createdAt: user.createdAt,
    });

  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
