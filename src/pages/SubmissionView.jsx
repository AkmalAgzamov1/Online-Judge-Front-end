import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function SubmissionView() {
  const { id } = useParams();
  const [sub, setSub] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/submission/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => setSub(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load submission");
      });
  }, [id]);

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (!sub)
    return (
      <div className="p-6 text-gray-800 dark:text-gray-200">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-1">Submission #{id}</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-3">
          Submitted at: {new Date(sub.createdAt).toLocaleString()}
        </p>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Language: {sub.language.toUpperCase()} — {sub.code.split("\n").length} lines
        </div>

        {/* FIXED LINK */}
        <Link
          to={`/submissions/${sub.problemId}`}
          className="text-blue-500 hover:text-blue-400 transition mb-4 block"
        >
          ← Back to submissions
        </Link>

        {/* Results */}
        <div className="bg-white dark:bg-white/5 dark:border-white/10 border shadow rounded-xl p-4 mb-6">
          <h2 className="font-semibold text-lg mb-3">Results</h2>

          {sub.results.map((r, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-100 dark:bg-white/10 p-3 rounded mb-2"
            >
              <span>Test {r.test}</span>
              <span
                className={
                  r.status === "ACCEPTED"
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>

        {/* Code Viewer */}
        <div className="bg-white dark:bg-white/5 dark:border-white/10 border shadow rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-3">Your Code</h2>

          <Editor
            height="450px"
            language="cpp"
            value={sub.code}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: true },
              fontSize: 14,
            }}
          />
        </div>
      </div>
    </div>
  );
}
