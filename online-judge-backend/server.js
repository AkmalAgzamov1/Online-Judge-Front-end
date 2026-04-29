import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { exec, execFile } from "child_process";
import mongoose from "mongoose";
import fetch from "node-fetch";

// MODELS
import User from "./models/User.js";
import Submission from "./models/Submission.js";

// ROUTES
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Middleware
import { auth } from "./middleware/auth.js";

// Fix dirname for ES modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MongoDB =================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set in .env");
  process.exit(1);
}

// ================= Express Setup =================
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const PORT = process.env.PORT || 3000;

// ================= Load Tests (один раз при старте) =================
const arraySumTests = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/arraySum.json"), "utf8")
);
const graphTests = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/graphTraversal.json"), "utf8")
);
const missingNumber = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/missingNumber.json"), "utf8")
);
const longestDNARepetition = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/longestDNARepetition.json"), "utf8")
);
const readingbook = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/readingbooks.json"), "utf8")
);
const towerOfHanoi = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/towerOfHanoi.json"), "utf8")
);
const diceCombination = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/diceCombination.json"), "utf8")
);
const countingRooms = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/countingRooms.json"), "utf8")
);
const buildingRoads = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/buildingRoads.json"), "utf8")
);
const bitStrings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/bitStrings.json"), "utf8")
);
const trailingZeros = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/trailingZeros.json"), "utf8")
);
const distinctNumbers = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/distinctNumbers.json"), "utf8")
);
const apartments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/apartments.json"), "utf8")
);
const ferrisWheel = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/ferrisWheel.json"), "utf8")
);
const concertTickets = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/concertTickets.json"), "utf8")
);
const retaurantCostumer = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/retaurantCostumer.json"), "utf8")
);
const sumOfTwoValues = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/sumOfTwoValues.json"), "utf8")
);
const maximumSubarraySum = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/maximumSubarraySum.json"), "utf8")
);
const stickLengths = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/stickLengths.json"), "utf8")
);
const missingCoinSum = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/missingCoinSum.json"), "utf8")
);
const collectingNumbers = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/collectingNumbers.json"), "utf8")
);
const towers = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/towers.json"), "utf8")
);
const repetitions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/repetitions.json"), "utf8")
);
const increasingArray = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/increasingArray.json"), "utf8")
);
const permutations = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/permutations.json"), "utf8")
);
const messageRoute = JSON.parse(
  fs.readFileSync(path.join(__dirname, "tests/messageRoute.json"), "utf8")
);
// все задачи и их сложность
const testMap = {
  1: arraySumTests,
  2: graphTests,
  3: missingNumber,
  4: longestDNARepetition,
  5: readingbook,
  6: towerOfHanoi,
  7: diceCombination,
  8: countingRooms,
  9: buildingRoads,
  10: bitStrings,
  11: trailingZeros,
  12: distinctNumbers,
  13: apartments,
  14: ferrisWheel,
  15: concertTickets,
  16: retaurantCostumer,
  17: sumOfTwoValues,
  18: maximumSubarraySum,
  19: stickLengths,
  20: missingCoinSum,
  21: collectingNumbers,
  22: towers,
  23: repetitions,
  24: increasingArray,
  25: permutations,
  26: messageRoute,
};

const XP_TABLE = {
  1: 15, // Array Sum - Easy
  2: 25, // Graph Traversal - Medium
  3: 15, // Missing number
  4: 15, // Longest DNA repetition
  5: 30, // Reading Books
  6: 40, // Tower of Hanoi
  7: 30, // Dice combination
  8: 35, // Counting Rooms
  9: 35, // Building Roads
  10: 20, // Bit strings
  11: 15, // Trailing Zeros
  12: 15, // Distinct numbers
  13: 15, // Apartments
  14: 25, //ferris Wheel
  15: 30, //concert Tickets
  16: 20, //Retaurant Costumer
  17: 20, //sum Of Two Values
  18: 25, //maximum Subarray Sum
  19: 20, //stick Lengths
  20: 30, //missing Coin Sum
  21: 20, //collecting Numbers
  22: 25, //towers 
  23: 10, //Repetitions 
  24: 15,//increasing Array
  25: 15, // permutation
  26: 25, // Message route
};

// Create tmp folder
const TMP_DIR = path.join(__dirname, "tmp");
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

// Simple health endpoints
app.get("/", (req, res) => {
  res.send("Backend running ✔");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: Date.now(),
  });
});

// ================= ROUTES =================
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// =====================================================
// SUBMIT CODE (WITH XP AWARD)
// =====================================================
app.post("/submit", auth, async (req, res) => {
  const { problemId, language, code } = req.body;
  const pid = Number(problemId);
  const tests = testMap[pid];

  const currentUser = req.user;

  if (!tests) return res.status(400).json({ message: "No tests found." });

  // Unsupported language → сразу COMPILE ERROR
  if (language !== "cpp") {
    const results = tests.map((t) => ({
      test: t.id,
      status: "COMPILE ERROR",
    }));

    const saved = await Submission.create({
      userId: currentUser._id,
      problemId: pid,
      language,
      code,
      verdict: "COMPILE ERROR",
      results,
    });

    return res.json({ submissionId: saved._id, results });
  }

  // Prepare temp files
  const sourceFile = path.join(TMP_DIR, "solution.cpp");
  const exeFile = path.join(TMP_DIR, "solution.exe");
  fs.writeFileSync(sourceFile, code);

  const compileCmd = `g++ "${sourceFile}" -O2 -std=c++17 -o "${exeFile}"`;

  exec(compileCmd, async (err, stdout, stderr) => {
    if (err) {
      const results = tests.map((t) => ({
        test: t.id,
        status: "COMPILE ERROR",
      }));

      const saved = await Submission.create({
        userId: currentUser._id,
        problemId: pid,
        language,
        code,
        verdict: "COMPILE ERROR",
        results,
      });

      return res.json({
        submissionId: saved._id,
        results,
        compileError: stderr.toString(),
      });
    }

    let i = 0;
    const results = [];

    const normalizeOutput = (s = "") =>
      s
        .toString()
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trimEnd();

    const runTest = async () => {
      if (i >= tests.length) {
        const allAccepted =
          results.length > 0 &&
          results.every((r) => r.status === "ACCEPTED");

        const verdict = allAccepted ? "ACCEPTED" : "WRONG ANSWER";

        // XP update
        // XP update
        try {
  if (verdict === "ACCEPTED") {
    const xpValue = XP_TABLE[pid] || 0;

    // если в таблице XP ничего нет — смысла дальше идти нет
    if (xpValue > 0) {
      const user = await User.findById(currentUser._id);

      if (user && !user.solvedProblems.includes(pid)) {
        // добавляем задачу в список решённых
        user.solvedProblems.push(pid);

        // базовый XP — с учётом старого exp
        const baseXp =
          typeof user.getEffectiveXp === "function"
            ? user.getEffectiveXp()
            : user.xp ?? user.exp ?? 0;

        const newXp = baseXp + xpValue;

        // обновляем оба поля
       user.exp = newXp;


        await user.save();
      }
    }
  }
} catch (xpErr) {
  console.error("XP update error:", xpErr);
}



        const saved = await Submission.create({
          userId: currentUser._id,
          problemId: pid,
          language,
          code,
          verdict,
          results,
        });

        return res.json({
          submissionId: saved._id,
          verdict,
          results,
        });
      }

      const t = tests[i++];

      const child = execFile(
        exeFile,
        { timeout: 2000, maxBuffer: 1024 * 1024 },
        (err, stdout) => {
          if (err) {
            results.push({
              test: t.id,
              status: err.killed ? "TIME LIMIT EXCEEDED" : "WRONG ANSWER",
            });
          } else {
            const got = normalizeOutput(stdout);
            const expected = normalizeOutput(t.expected);

            results.push({
              test: t.id,
              status: got === expected ? "ACCEPTED" : "WRONG ANSWER",
            });
          }

          runTest();
        }
      );

      child.stdin.write(t.input);
      child.stdin.end();
    };

    runTest();
  });
});

// =====================================================
// SUBMISSIONS (My submissions for current user)
// =====================================================
app.get("/submissions/:problemId", auth, async (req, res) => {
  try {
    const pid = Number(req.params.problemId);

    const subs = await Submission.find({
      userId: req.user._id,
      problemId: pid,
    }).sort({ createdAt: -1 });

    res.json(subs);
  } catch (err) {
    console.error("GET /submissions error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================================================
// SINGLE SUBMISSION
// =====================================================
app.get("/submission/:id", async (req, res) => {
  const sub = await Submission.findById(req.params.id);
  if (!sub) return res.status(404).json({ error: "Not found" });
  res.json(sub);
});

// =====================================================
// RANKING
// =====================================================
// app.get("/ranking", async (req, res) => {
//   try {
//     const users = await User.find({})
//       .select("username avatar xp exp solvedProblems")
//       .lean()
//       .sort({ xp: -1 });

//     const ranked = users.map((u, index) => {
//       const xp = u.xp ?? u.exp ?? 0;
//       return {
//         rank: index + 1,
//         id: u._id,
//         username: u.username,
//         avatar: u.avatar,
//         xp,
//         solvedProblems: u.solvedProblems || [],
//         solved: u.solvedProblems?.length || 0,
//       };
//     });

//     res.json(ranked);
//   } catch (err) {
//     console.error("RANKING ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// GET /ranking
app.get("/ranking", async (req, res) => {
  try {
    const users = await User.find({})
      .select("username avatar exp solvedProblems createdAt") // ВАЖНО!
      .lean();

    const formatted = users.map((u) => ({
      id: u._id,
      username: u.username,
      avatar: u.avatar,
      exp: u.exp ?? 0,
      solved: u.solvedProblems?.length ?? 0,
      createdAt: u.createdAt,
    }));

    // сортировка по exp
    formatted.sort((a, b) => b.exp - a.exp);

    res.json(formatted);
  } catch (err) {
    console.error("Ranking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================================================
// AI ANALYZE (DeepSeek)
// =====================================================
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

app.post("/ai/analyze", async (req, res) => {
  try {
    const { code, language, problemId, description } = req.body;

    if (!code || !language || !problemId || !description) {
      return res.status(400).json({
        error: "code, language, problemId and description are required",
      });
    }

    const systemPrompt = `
You are an AI assistant for an online programming judge.
You receive:
- the full problem description,
- the user's solution code,
- the programming language.

Your job:
1. Explain in 2–4 sentences what the code is trying to do.
2. Check if it actually solves the described problem (logic + edge cases).
3. Point out possible bugs, missed cases, or complexity problems.
4. Give 1–3 concrete hints how to improve/fix it, WITHOUT giving full final code.
Answer in a friendly and clear style.
`;

    const userPrompt = `
Problem ID: ${problemId}

Problem Description:
${description}

User Language: ${language}

User Code:
\`\`\`${language}
${code}
\`\`\`
`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("AI ANALYZE failed:", text);
      return res.status(500).json({ error: "AI FAILED", details: text });
    }

    const data = await response.json();
    const aiText = data?.choices?.[0]?.message?.content || "No response.";

    // Обычный JSON-ответ, без SSE, без data:
    res.json({ response: aiText });
  } catch (e) {
    console.error("AI ANALYZE error:", e);
    res.status(500).json({ error: "AI FAILED", details: String(e) });
  }
});



// ================= Start Server =================
async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
    });
    console.log("🔥 MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

start();
