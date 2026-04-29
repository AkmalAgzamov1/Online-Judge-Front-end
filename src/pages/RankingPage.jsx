// src/pages/RankingPage.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const GUEST_AVATAR = "/guest.jpg";

export default function RankingPage() {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:3000/ranking");
        const data = await res.json();

        if (Array.isArray(data)) {
          setUsers(
            data
              .map((u) => ({
                ...u,
                avatar: u.avatar || GUEST_AVATAR,
              }))
              .sort((a, b) => (b.exp || 0) - (a.exp || 0))
          );
        }
      } catch (err) {
        console.error("Ranking load failed:", err);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading ranking...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center">🏆 Global Ranking</h1>

      <div className="space-y-4">
        {users.map((u, index) => {
          const isMe =
            currentUser &&
            (currentUser._id === u.id || currentUser.id === u.id);

          return (
            <Link
              key={u.id || index}
              to={`/user/${u.id}`}
              className={`
                flex items-center justify-between 
                p-4 rounded-xl border shadow-sm transition cursor-pointer
                bg-white dark:bg-white/5 border-gray-300 dark:border-white/10
                hover:bg-purple-50 hover:dark:bg-purple-500/10
                ${
  isMe
    ? "bg-purple-200/50 dark:bg-purple-700/40 border-purple-500 dark:border-purple-300 shadow-lg shadow-purple-500/40"
    : ""
}

              `}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="text-2xl font-bold w-10 text-center text-purple-500">
                  #{index + 1}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
                  <img
                    src={u.avatar}
                    className="w-full h-full object-cover"
                    alt={u.username}
                  />
                </div>

                {/* Username */}
                <div className="text-lg font-semibold flex items-center gap-2">
                  {u.username}
                  {isMe && (
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-200 rounded-full">
                      You
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <p className="text-purple-500 font-bold text-lg">
                  {u.exp || 0} XP
                </p>
                <p className="text-sm text-gray-400">
                  {(u.solved ?? 0)} solved
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
