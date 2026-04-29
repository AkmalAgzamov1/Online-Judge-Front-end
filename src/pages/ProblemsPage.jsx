import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemCard from "../components/ProblemCard";
import { problems } from "../data/problems";
import { AuthContext } from "../context/AuthContext";

export default function ProblemsPage() {
  const { user, token } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("all");
  const [sort, setSort] = useState("none");
  const [statusFilter, setStatusFilter] = useState("all");

  const [attemptedProblems, setAttemptedProblems] = useState([]);

  // ============= PAGINATION =====================
  const problemsPerPage = 12;
  const [page, setPage] = useState(1);
  // =================================================

  useEffect(() => {
    async function load() {
      if (!token) return;

      const res = await fetch("http://localhost:3000/my/submissions", {
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        const ids = [...new Set(data.map((s) => s.problemId))];
        setAttemptedProblems(ids);
      }
    }

    load();
  }, [token]);

  const topics = [...new Set(problems.map((p) => p.topic))];

  // ============================
  // FILTERING
  // ============================
  let filtered = problems
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (topic === "all" ? true : p.topic === topic))
    .filter((p) => {
      const solved = user?.solvedProblems?.includes(p.id);
      const attempted = attemptedProblems.includes(p.id);

      let finalStatus = "none";
      if (solved) finalStatus = "solved";
      else if (attempted) finalStatus = "attempted";

      if (statusFilter === "all") return true;
      if (statusFilter === "solved") return finalStatus === "solved";
      if (statusFilter === "attempted") return finalStatus === "attempted";
      if (statusFilter === "none") return finalStatus === "none";

      return true;
    })
    .sort((a, b) => {
      const rank = { Easy: 1, Medium: 2, Hard: 3 };
      if (sort === "easy-first") return rank[a.difficulty] - rank[b.difficulty];
      if (sort === "hard-first") return rank[b.difficulty] - rank[a.difficulty];
      return 0;
    });

  // RESET PAGE WHEN FILTERS CHANGE
  useEffect(() => {
    setPage(1);
  }, [search, topic, sort, statusFilter]);

  // ============================
  // APPLY PAGINATION
  // ============================
  const totalPages = Math.ceil(filtered.length / problemsPerPage);

  const startIndex = (page - 1) * problemsPerPage;
  const visibleProblems = filtered.slice(startIndex, startIndex + problemsPerPage);

  // ============================
  // RENDER
  // ============================
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* STAR BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="parallax-layer layer-1"></div>
        <div className="parallax-layer layer-2"></div>
        <div className="parallax-layer layer-3"></div>
      </div>

      <div className="relative z-10 p-6">

        {/* HEADER */}
        <header className="flex justify-between items-center max-w-6xl mx-auto mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Problem List</h1>

          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to Home
          </Link>
        </header>

        {/* FILTERS */}
        <div className="max-w-6xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search problems..."
            className="
              border border-gray-300 dark:border-white/10 
              bg-white/20 dark:bg-white/5 backdrop-blur-sm
              text-gray-900 dark:text-white
              rounded px-3 py-2 shadow-sm
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="
              border border-gray-300 dark:border-white/10
              bg-white/20 dark:bg-white/5 backdrop-blur-sm
              text-gray-900 dark:text-white
              rounded px-3 py-2 shadow-sm
            "
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="all">All Topics</option>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            className="
              border border-gray-300 dark:border-white/10
              bg-white/20 dark:bg-white/5 backdrop-blur-sm
              text-gray-900 dark:text-white
              rounded px-3 py-2 shadow-sm
            "
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">Sort: Default</option>
            <option value="easy-first">Easy → Hard</option>
            <option value="hard-first">Hard → Easy</option>
          </select>

          <select
            className="
              border border-gray-300 dark:border-white/10
              bg-white/20 dark:bg-white/5 backdrop-blur-sm
              text-gray-900 dark:text-white
              rounded px-3 py-2 shadow-sm
            "
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="solved">Solved 🟩</option>
            <option value="attempted">Attempted 🟨</option>
            <option value="none">Unattempted ⬜</option>
          </select>
        </div>

        {/* GRID OF PROBLEMS */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleProblems.map((p) => {
            const solved = user?.solvedProblems?.includes(p.id);
            const attempted = attemptedProblems.includes(p.id);

            let finalStatus = "none";
            if (solved) finalStatus = "solved";
            else if (attempted) finalStatus = "attempted";

            return (
              <ProblemCard
                key={p.id}
                id={p.id}
                title={p.title}
                topic={p.topic}
                difficulty={p.difficulty}
                status={finalStatus}
              />
            );
          })}

          {visibleProblems.length === 0 && (
            <p className="text-gray-400 col-span-full text-center">No problems found.</p>
          )}
        </div>
        {/* PAGINATION */}
<div className="flex justify-center mt-10 gap-2">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className={`pagination-btn ${page === 1 ? "disabled" : ""}`}
  >
    ← Prev
  </button>

  {[...Array(totalPages)].map((_, idx) => (
    <button
      key={idx}
      onClick={() => setPage(idx + 1)}
      className={`pagination-btn ${page === idx + 1 ? "active" : ""}`}
    >
      {idx + 1}
    </button>
  ))}

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className={`pagination-btn ${page === totalPages ? "disabled" : ""}`}
  >
    Next →
  </button>

</div>
 
      </div>
    </div>
  );
}
