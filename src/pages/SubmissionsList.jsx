import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function badgeColor(verdict) {
  switch (verdict) {
    case "ACCEPTED":
      return "text-green-500 font-semibold";
    case "WRONG ANSWER":
      return "text-red-500 font-semibold";
    case "TIME LIMIT EXCEEDED":
      return "text-yellow-500 font-semibold";
    case "COMPILE ERROR":
      return "text-purple-400 font-semibold";
    default:
      return "text-gray-400";
  }
}

export default function SubmissionsList() {
  const { id } = useParams();
  const [subs, setSubs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${BACKEND_URL}/submissions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => setSubs(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load submissions");
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-4">My Submissions</h1>

        <Link
          to={`/problem/${id}`}
          className="text-blue-500 hover:text-blue-400 transition mb-4 block"
        >
          ← Back to Problem
        </Link>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {subs.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-400">
            No submissions yet.
          </p>
        ) : (
          <div className="bg-white dark:bg-white/5 dark:border-white/10 border shadow rounded-xl divide-y dark:divide-white/10">

            {subs.map((s) => (
              <Link
                key={s._id}
                to={`/submission/${s._id}`}
                className="flex justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    📝 Submission
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(s.createdAt).toLocaleString()}
                  </div>
                </div>

                <span className={badgeColor(s.verdict)}>
                  {s.verdict}
                </span>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
