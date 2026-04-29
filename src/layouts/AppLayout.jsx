import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const GUEST_AVATAR = "/guest.jpg";

export default function AppLayout() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const avatar = user?.avatar || GUEST_AVATAR;

  return (
    <div
      className="
        min-h-screen 
        bg-gray-50 text-gray-900
        dark:bg-[#0d1117] dark:text-white 
        transition-colors
      "
    >
      {/* NAVBAR */}
      <nav
        className="
          w-full
          border-b border-white/10 
          bg-white/80
          dark:bg-[#0d1117]/80 
          backdrop-blur-md
          fixed top-0 left-0 z-50
        "
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">

            {/* LOGO */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="
                px-3 py-2 rounded-xl 
                bg-gradient-to-br from-purple-600 to-blue-600
                text-white font-bold shadow-md cursor-pointer
              "
            >
              <Link to="/">OJ</Link>
            </motion.div>

            {/* LINKS */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link
                to="/"
                className={`hover:text-purple-400 transition ${
                  location.pathname === "/" && "text-purple-400 font-semibold"
                }`}
              >
                Home
              </Link>

              <Link
                to="/problems"
                className={`hover:text-purple-400 transition ${
                  location.pathname.startsWith("/problems") &&
                  "text-purple-400 font-semibold"
                }`}
              >
                Problems
              </Link>

              <Link
                to="/ranking"
                className={`hover:text-purple-400 transition ${
                  location.pathname.startsWith("/ranking") &&
                  "text-purple-400 font-semibold"
                }`}
              >
                Ranking
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* USERNAME */}
            {isLoggedIn && (
              <Link
                to="/profile"
                className="
                  text-sm font-medium 
                  text-gray-700 dark:text-gray-300 
                  hover:text-purple-400 dark:hover:text-purple-300
                  transition
                "
              >
                {user.username}
              </Link>
            )}

            {/* AVATAR */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                w-9 h-9 rounded-full shadow 
                flex items-center justify-center 
                bg-gradient-to-br from-purple-500 to-blue-500 
                cursor-pointer overflow-hidden
              "
            >
              <Link
                to="/profile"
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={avatar}
                  className="w-full h-full object-cover rounded-full"
                />
              </Link>
            </motion.div>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="
                w-9 h-9 flex items-center justify-center rounded-full
                bg-white/20 dark:bg-white/10
                hover:bg-white/30 dark:hover:bg-white/20
                text-lg transition
              "
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

          </div>

        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
}
