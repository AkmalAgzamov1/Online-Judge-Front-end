import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { problems } from "../data/problems";

const templates = {
  cpp: `#include <bits/stdc++.h>
using namespace std;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    // your code here
    return 0;
}
`,
};

const monacoLangId = { cpp: "cpp" };
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pid = Number(id);

  const problem = problems.find(p => p.id === pid);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(templates.cpp);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode(templates[language]);
  }, [language]);

  async function handleSubmit() {
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BACKEND_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        problemId: pid,
        language,
        code,
      }),
    });

    const data = await res.json();

    // ===== Refresh user (XP + solved) =====
    try {
      const meRes = await fetch(`${BACKEND_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meData = await meRes.json();
      localStorage.setItem("user", JSON.stringify(meData));
    } catch (e) {
      console.log("Failed to refresh user:", e);
    }

    if (!data.results) {
      alert("Server did not return results. Check backend.");
      setLoading(false);
      return;
    }

    // Save result for submission page
    localStorage.setItem("last_results", JSON.stringify(data.results));
    localStorage.setItem("last_code", code);
    localStorage.setItem("last_lang", language);

    navigate(`/problem/${pid}/submission`);
  } catch (err) {
    alert("Error submitting code: " + err);
  } finally {
    setLoading(false);
  }
}


  if (!problem) {
    return <div className="p-6 text-center">Problem not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-200 p-6 transition">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Time Limit: {problem.timeLimit} · {problem.xp}XP
        </p>

        <section className="bg-white dark:bg-white/5 dark:border-white/10 border rounded-xl shadow p-6 mb-6 transition">
          <h2 className="text-lg font-semibold mb-2">Description</h2>

          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {problem.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold mb-1">Input</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {problem.input}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">Output</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {problem.output}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col">
              <h3 className="font-semibold mb-1">Example Input</h3>
              <pre className="bg-gray-100 dark:bg-white/10 p-3 rounded whitespace-pre-wrap flex-1">
                {problem.exampleInput}
              </pre>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold mb-1">Example Output</h3>
              <pre className="bg-gray-100 dark:bg-white/10 p-3 rounded whitespace-pre-wrap flex-1">
                {problem.exampleOutput}
              </pre>
            </div>
          </div>
              <div className="mt-2">
    <h3 className="font-semibold mb-1">Constraints</h3>

    <pre className="bg-gray-100 dark:bg-white/10 p-3 rounded whitespace-pre-wrap text-gray-800 dark:text-gray-200">
      {problem.constraints}
    </pre>
  </div>
                  </section>

        <section className="mb-3 flex items-center gap-3">
          <label className="text-sm font-medium">Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="border bg-white dark:bg-white/10 dark:border-white/20 dark:text-gray-200 px-3 py-2 rounded"
          >
            <option value="cpp">C++</option>
          </select>
        </section>

        <div className="border dark:border-white/10 rounded-xl overflow-hidden shadow">
          <Editor
            height="55vh"
            language={monacoLangId[language]}
            value={code}
            onChange={v => setCode(v ?? "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit"}
        </button>

        <button
          onClick={() => navigate(`/submissions/${pid}`)}
          className="ml-3 px-4 py-2 rounded bg-gray-700 dark:bg-gray-800 text-white"
        >
          My Submissions
        </button>

      </div>
    </div>
  );
}
