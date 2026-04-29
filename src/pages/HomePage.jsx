import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { login, signup } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [authMessage, setAuthMessage] = useState("");
  const [authType, setAuthType] = useState(""); // "login" | "signup" | ""
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setAuthMessage("");
    setAuthType("");

    const res = await login(loginForm.email, loginForm.password);
    if (res?.success) {
      setAuthType("login");
      setAuthMessage("✅ Logged in successfully!");
    } else {
      setAuthType("login");
      setAuthMessage(res?.message || "❌ Login failed. Check your credentials.");
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    setAuthMessage("");
    setAuthType("");

    const res = await signup(
      signupForm.username,
      signupForm.email,
      signupForm.password
    );
    if (res?.success) {
      setAuthType("signup");
      setAuthMessage("✅ Account created! You can now log in.");
      setAuthMode("login");
    } else {
      setAuthType("signup");
      setAuthMessage(res?.message || "❌ Sign up failed. Try again.");
    }
  }

  return (
    <div
      className="
        relative min-h-screen overflow-x-hidden
        bg-gray-50 text-gray-900
        dark:bg-[#0d1117] dark:text-white
        transition-colors
      "
    >
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Glow Effects only for hero */}
        <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 rounded-full blur-[150px] top-[-80px] left-[-80px]" />
        <div className="absolute w-[450px] h-[450px] bg-blue-600 opacity-20 rounded-full blur-[160px] bottom-[-120px] right-[-120px]" />

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent top-1/4" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent top-2/4" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent top-3/4" />
        </div>

        <main className="relative z-10 font-inter">
          <div className="flex flex-col items-center text-center px-4 pt-28 pb-20 md:pt-32 md:pb-24 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4"
            >
              YZU · Online Judge Platform
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="
                text-4xl md:text-6xl 
                leading-[1.25]
                font-montserrat font-extrabold 
                mb-6
              "
            >
              <span className="block">Practice. Compete.</span>
              <span className="block mt-3 gradient-text-animate">
                Code Better.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl leading-normal"
            >
              Solve algorithmic problems, learn computing concepts, and enhance
              your skills — built by students, for students at Yuan Ze
              University.
            </motion.p>

            {/* Start Solving Button */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link
                to="/problems"
                className="
                  px-10 py-4 
                  bg-gradient-to-r from-purple-600 to-blue-600 
                  text-white rounded-full text-lg md:text-xl 
                  font-semibold shadow-lg hover:shadow-purple-900/40 
                  transition
                "
              >
                🚀 Start Solving
              </Link>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-10 text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"
            >
              <span>Scroll to learn more</span>
              <span className="animate-bounce">⬇️</span>
            </motion.div>
          </div>
        </main>
      </section>

      {/* ================= WHAT IS THIS PLATFORM (NEW DESIGN) ================= */}
      <section className="py-14 md:py-16 px-4">
        <div className="max-w-5xl mx-auto relative">
          {/* floating icons around the main card */}
          <FloatingIcon
            icon="💻"
            className="top-0 left-6 md:left-20"
            delay={0}
          />
          <FloatingIcon
            icon="🧠"
            className="top-[-10px] right-4 md:right-24"
            delay={0.3}
          />
          <FloatingIcon
            icon="📊"
            className="bottom-0 left-2 md:left-10"
            delay={0.6}
          />
          <FloatingIcon
            icon="🎓"
            className="bottom-[-10px] right-6 md:right-16"
            delay={0.9}
          />
          <FloatingIcon
            icon="🚀"
            className="top-1/2 -left-1 md:-left-6"
            delay={1.2}
          />

          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              relative z-10
              bg-white/80 dark:bg-[#111827]/80
              backdrop-blur-md
              border border-gray-200/80 dark:border-white/10
              rounded-3xl p-6 md:p-10 shadow-xl
              flex flex-col md:flex-row gap-6 md:gap-10
            "
          >
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What is this platform?
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                This online judge is your personal lab for algorithms and
                problem solving. Instead of only reading theory, you write real
                code, send it to a real judging system, and receive instant
                feedback — just like on competitive programming platforms.
              </p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Problems are tailored for YZU courses: from basic I/O and arrays
                to graphs, shortest paths, and dynamic programming. Each
                submission is compiled and tested against carefully designed
                input files that check both correctness and performance.
              </p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Whether you are preparing for exams, coding interviews, or just
                want to think sharper, this platform helps you build confidence
                step by step — one accepted solution at a time.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="
                flex-1 flex flex-col justify-center gap-4
              "
            >
              <AnimatedHighlight
                title="Built for YZU students"
                text="Aligned with topics from your classes, designed by students who faced the same exams and assignments."
              />
              <AnimatedHighlight
                title="Hands-on learning"
                text="You learn by writing and running code, not just memorizing formulas or slides."
              />
              <AnimatedHighlight
                title="Safe place to fail & improve"
                text="Wrong answers here don’t hurt your grade — they help you get better before it matters."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
 
      {/* ================= HOW IT WORKS ================= */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-6 text-center"
          >
            How it works
          </motion.h2>

          <motion.ol
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="
              grid gap-6 md:grid-cols-4 text-sm md:text-base
              text-gray-700 dark:text-gray-200
            "
          >
            <StepCard step="1" title="Browse problems">
              Filter by topic and difficulty, then pick a problem that matches
              what you want to practice.
            </StepCard>
            <StepCard step="2" title="Write your solution">
              Use your favorite language, follow input/output format, and focus
              on correctness and complexity.
            </StepCard>
            <StepCard step="3" title="Submit & get verdict">
              Your code is compiled, executed on hidden tests, and you get a
              verdict like Accepted or Wrong Answer.
            </StepCard>
            <StepCard step="4" title="Improve & repeat">
              Learn from feedback, optimize your solution, and move on to harder
              problems.
            </StepCard>
          </motion.ol>
        </div>
      </section>

      {/* ================= EXAMPLE PROBLEMS ================= */}
      <section className="py-10 md:py-14 px-4 bg-gray-100/70 dark:bg-[#050816]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-6 text-center"
          >
            Example problem types
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="grid gap-6 md:grid-cols-3 text-sm md:text-base"
          >
            <ProblemCard
              title="Array Sum"
              difficulty="Easy"
              description="Warm-up challenge to read numbers and compute their sum efficiently."
            />
            <ProblemCard
              title="Grid BFS"
              difficulty="Medium"
              description="Explore reachable cells in a maze using breadth-first search."
            />
            <ProblemCard
              title="Shortest Paths"
              difficulty="Hard"
              description="Compute all-pairs shortest paths in a weighted graph."
            />
          </motion.div>

          <div className="mt-6 text-center">
            <Link
              to="/problems"
              className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline"
            >
              View full problem list →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= AUTH SECTION (ONE FORM + TOGGLE) ================= */}
      <section className="py-14 md:py-16 px-4">
        <div className="max-w-md mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
          >
            {authMode === "login" ? "Welcome back" : "Create your account"}
          </motion.h2>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center mb-6">
            {authMode === "login"
              ? "Log in to continue solving problems and tracking your progress."
              : "Sign up in a few seconds and start practicing algorithmic problems tailored for YZU students."}
          </p>

          {/* Message area for both modes */}
          {authMessage && (
            <div className="mb-4 text-center text-xs md:text-sm">
              <span
                className={
                  authMessage.startsWith("✅")
                    ? "text-green-500"
                    : "text-red-400"
                }
              >
                {authMessage}
              </span>
            </div>
          )}

          <motion.div
            key={authMode}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="
              bg-white dark:bg-[#111827]
              border border-gray-200 dark:border-white/10
              rounded-2xl p-6 shadow-sm
            "
          >
            {authMode === "login" ? (
              <form className="flex flex-col gap-3" onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  className="
                    px-4 py-3 rounded-lg 
                    bg-gray-100 dark:bg-white/10 
                    border border-gray-300 dark:border-white/10
                    text-sm
                  "
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="
                    px-4 py-3 rounded-lg 
                    bg-gray-100 dark:bg-white/10 
                    border border-gray-300 dark:border-white/10
                    text-sm
                  "
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="
                    mt-2 py-3 rounded-lg w-full
                    bg-gradient-to-r from-purple-600 to-blue-600
                    text-white font-semibold text-sm shadow hover:shadow-lg
                    transition
                  "
                >
                  Log In
                </button>
              </form>
            ) : (
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSignupSubmit}
              >
                <input
                  type="text"
                  placeholder="Username"
                  className="
                    px-4 py-3 rounded-lg 
                    bg-gray-100 dark:bg-white/10 
                    border border-gray-300 dark:border-white/10
                    text-sm
                  "
                  value={signupForm.username}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="
                    px-4 py-3 rounded-lg 
                    bg-gray-100 dark:bg-white/10 
                    border border-gray-300 dark:border-white/10
                    text-sm
                  "
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="
                    px-4 py-3 rounded-lg 
                    bg-gray-100 dark:bg-white/10 
                    border border-gray-300 dark:border-white/10
                    text-sm
                  "
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="
                    mt-2 py-3 rounded-lg w-full
                    bg-gradient-to-r from-purple-600 to-blue-600
                    text-white font-semibold text-sm shadow hover:shadow-lg
                    transition
                  "
                >
                  Sign Up
                </button>
              </form>
            )}

            {/* Toggle link */}
            <div className="mt-4 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthMessage("");
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthMessage("");
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ======================= SMALL SUB-COMPONENTS ======================= */

function FeatureCard({ title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, translateY: -4, boxShadow: "0 18px 35px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="
        bg-white dark:bg-[#111827]
        border border-gray-200 dark:border-white/10
        rounded-2xl p-5 shadow-sm
        flex flex-col gap-2
        cursor-pointer
      "
    >
      <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </motion.div>
  );
}

function StepCard({ step, title, children }) {
  return (
    <motion.li
      whileHover={{ scale: 1.04, translateY: -3, boxShadow: "0 16px 32px rgba(0,0,0,0.16)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 230, damping: 18 }}
      className="
        bg-white dark:bg-[#111827]
        border border-gray-200 dark:border-white/10
        rounded-2xl p-4 shadow-sm
        flex flex-col gap-2
        cursor-pointer
      "
    >
      <div className="flex items-center gap-2">
        <span
          className="
            inline-flex items-center justify-center
            w-7 h-7 rounded-full
            bg-gradient-to-r from-purple-600 to-blue-600
            text-white text-xs font-bold
          "
        >
          {step}
        </span>
        <span className="font-semibold text-sm md:text-base">{title}</span>
      </div>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
        {children}
      </p>
    </motion.li>
  );
}

function ProblemCard({ title, difficulty, description }) {
  const difficultyColor =
    difficulty === "Easy"
      ? "text-green-500"
      : difficulty === "Medium"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <motion.div
      whileHover={{ scale: 1.03, translateY: -4, boxShadow: "0 18px 35px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="
        bg-white dark:bg-[#111827]
        border border-gray-200 dark:border-white/10
        rounded-2xl p-5 shadow-sm
        flex flex-col gap-2
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm md:text-base">{title}</h3>
        <span className={`text-xs font-semibold ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}

function FloatingIcon({ icon, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        delay,
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={`
        hidden md:flex
        absolute text-2xl 
        bg-white/70 dark:bg-[#111827]/80
        border border-gray-200/70 dark:border-white/10
        rounded-2xl shadow-md
        w-10 h-10 items-center justify-center
      ${className}
      `}
    >
      <span>{icon}</span>
    </motion.div>
  );
}

function AnimatedHighlight({ title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, x: 3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="
        bg-gray-100/80 dark:bg-[#050816]/80
        border border-gray-200 dark:border-white/10
        rounded-2xl px-4 py-3 shadow-sm
        cursor-pointer
      "
    >
      <h3 className="text-sm md:text-base font-semibold mb-1">{title}</h3>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </motion.div>
  );
}
