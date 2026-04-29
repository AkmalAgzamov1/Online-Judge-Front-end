import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { problems } from "../data/problems";  // ⬅️ ВАЖНО, чтоб был доступ к описанию задачи!

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function SubmissionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const pid = Number(id);

  const [results, setResults] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // Найти описание задачи
  const problem = problems.find(p => p.id === pid);

  // ============================
  // LOAD localStorage properly
  // ============================
  useEffect(() => {
    const r = localStorage.getItem("last_results");
    const c = localStorage.getItem("last_code");
    const l = localStorage.getItem("last_lang");

    if (r) setResults(JSON.parse(r));
    if (c) setCode(c);
    if (l) setLanguage(l);

    // second chance (fixes timing bug)
    if (!r) {
      setTimeout(() => {
        const r2 = localStorage.getItem("last_results");
        if (r2) setResults(JSON.parse(r2));
      }, 150);
    }
  }, []);

  // Если results нет — показываем ошибку
  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] p-6 text-gray-900 dark:text-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">No submission data 😢</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You refreshed the page. Submit again to see the result.
          </p>
          <button
            onClick={() => navigate(`/problem/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back to Problem
          </button>
        </div>
      </div>
    );
  }

  const statusColor = {
    ACCEPTED: "text-green-500 font-bold",
    "WRONG ANSWER": "text-red-500 font-bold",
    "TIME LIMIT EXCEEDED": "text-yellow-500 font-bold",
    "COMPILE ERROR": "text-purple-400 font-bold",
  };

  // ============================
  // AI ANALYSIS
  // ============================
  async function handleAskAI() {
    setAiLoading(true);
    setAiError("");
    setAiResponse("");

    try {
      const res = await fetch(`${BACKEND_URL}/ai/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: pid,
          language,
          code,
          results,
          title: problem?.title || "Unknown Problem",
          description: problem?.description || "",
        }),
      });

      const data = await res.json();
      setAiResponse(data.response || "No AI response.");
    } catch (err) {
      setAiError(String(err));
    }

    setAiLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] p-6 text-gray-900 dark:text-gray-200">
      <div className="max-w-3xl mx-auto bg-white dark:bg-white/5 dark:border-white/10 border shadow p-6 rounded-xl">

        <h1 className="text-2xl font-bold mb-4">Submission Result</h1>

        {/* RESULTS */}
        <div className="space-y-3">
          {results.map((r, idx) => (
            <div key={idx} className="flex justify-between bg-gray-100 dark:bg-white/10 p-3 rounded">
              <span>Test {r.test}</span>
              <span className={statusColor[r.status] || "text-gray-300"}>
                {r.status}
              </span>
            </div>
          ))}
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(`/problem/${id}`)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Problem
        </button>

        {/* CODE */}
        <h2 className="text-xl font-semibold mt-6 mb-2">Your Code</h2>

        <div className="border dark:border-white/10 rounded-xl overflow-hidden shadow mb-6">
          <Editor
            height="55vh"
            language={language}
            value={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>

        {/* AI HELPER */}
        <div className="mt-8 border-t dark:border-white/10 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">AI Code Analysis 💡</h2>

            <button
              onClick={handleAskAI}
              disabled={aiLoading}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm disabled:opacity-50"
            >
              {aiLoading ? "Asking AI…" : "Explain my code"}
            </button>
          </div>

          {aiError && (
            <p className="text-sm text-red-400 mb-2">{aiError}</p>
          )}

          {aiResponse && (
            <div className="bg-gray-50 dark:bg-white/10 border dark:border-white/10 rounded p-3 text-sm whitespace-pre-wrap">
              {aiResponse}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
