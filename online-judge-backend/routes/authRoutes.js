import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Генерация токена
function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Универсальная сборка user-объекта
function buildUserPayload(user) {
  // эксп — единственный источник правды
  const exp = user.exp ?? 0;


  return {
    id: user._id,
    username: user.username,
    email: user.email,
    university: user.university,
    exp, // <---- ТОЛЬКО EXP
    avatar: user.avatar,
    solvedProblems: user.solvedProblems,
    createdAt: user.createdAt,
  };
}

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, university } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash: hash,
      university: university || "",
      exp: 0, // NEW USERS → exp=0
    });

    const token = createToken(user._id);

    return res.status(201).json({
      token,
      user: buildUserPayload(user),
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    return res.json({
      token,
      user: buildUserPayload(user),
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ME (автолого)
router.get("/me", auth, async (req, res) => {
  const freshUser = await User.findById(req.user._id);
  if (!freshUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(buildUserPayload(freshUser));
});

export default router;
