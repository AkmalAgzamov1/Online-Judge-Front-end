// src/pages/UserPublicProfile.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { problems } from "../data/problems"; // ← добавлено

const GUEST_AVATAR = "/guest.jpg";

export default function UserPublicProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`http://localhost:3000/user/${id}`);
        if (!res.ok) {
          setError("User not found");
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Public profile load failed:", err);
        setError("Failed to load profile");
      }
      setLoading(false);
    }

    load();
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading profile...</div>;

  if (error || !user)
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        {error || "User not found"}
      </div>
    );

  const avatar = user.avatar || GUEST_AVATAR;

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{user.username}'s Profile</h1>
        </div>

        {/* CARD */}
        <div className="bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-2xl p-8 shadow-xl">

          {/* TOP SECTION */}
          <div className="flex items-center gap-6 mb-8">
            {/* AVATAR */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <img src={avatar} className="w-full h-full object-cover" />
            </div>

            {/* USERNAME + XP */}
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-purple-400 font-semibold mt-1">
                {user.exp || 0} XP
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {(user.solvedProblems?.length || 0)} problems solved
              </p>
            </div>
          </div>

          {/* UNIVERSITY */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">University</h3>
            <p>{user.university || "Not specified"}</p>
          </div>

          {/* BIO */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Bio</h3>
            <p>{user.bio || "No bio yet"}</p>
          </div>

          {/* JOIN DATE */}
          <div className="mt-8">
            <p className="text-gray-400 text-sm">
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>

          {/* SOLVED PROBLEMS NEW DESIGN */}
          {user.solvedProblems && user.solvedProblems.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Solved Problems</h3>

              <div className="flex flex-wrap gap-3">
                {user.solvedProblems.map((pid) => {
                  const problem = problems.find((p) => p.id === pid);
                  if (!problem) return null;

                  return (
                    <Link
                      key={pid}
                      to={`/problem/${pid}`}
                      className="px-3 py-1 rounded-full bg-green-600/15 text-green-400 border border-green-500/40 text-sm hover:bg-green-600/25 transition"
                    >
                      {problem.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
