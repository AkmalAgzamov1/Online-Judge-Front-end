import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await login(email, password);

    if (!res.success) {
      setError(res.message || "Login failed");
      return;
    }

    navigate("/profile");
  }

  return (
    <div
      className="
        flex items-center justify-center min-h-screen px-6
        bg-gray-50 text-gray-900
        dark:bg-[#0d1117] dark:text-white
        transition-colors
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-md p-8 rounded-2xl
          bg-white dark:bg-[#111827]
          shadow-xl border border-gray-200 dark:border-white/10
        "
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="
              px-4 py-3 rounded-lg
              bg-gray-100 dark:bg-white/10
              border border-gray-300 dark:border-white/10
              text-gray-900 dark:text-white
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="
              px-4 py-3 rounded-lg
              bg-gray-100 dark:bg-white/10
              border border-gray-300 dark:border-white/10
              text-gray-900 dark:text-white
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="
              mt-2 py-3 rounded-lg
              bg-gradient-to-r from-purple-600 to-blue-600
              text-white font-semibold shadow hover:shadow-lg
              transition
            "
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400 underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
