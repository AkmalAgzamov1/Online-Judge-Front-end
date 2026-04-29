import { Link } from "react-router-dom";
import { useRef } from "react";

export default function ProblemCard({ id, title, topic, difficulty, status }) {
  const cardRef = useRef(null);

  // 3D TILT
  function handleMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 8;
    const rotateX = -((y - midY) / midY) * 8;

    card.style.setProperty("--rx", rotateX + "deg");
    card.style.setProperty("--ry", rotateY + "deg");
  }

  function resetTilt() {
    const card = cardRef.current;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  const difficultyColor =
    difficulty === "Easy"
      ? "text-green-400"
      : difficulty === "Medium"
      ? "text-yellow-400"
      : "text-red-400";

 let cardClasses = `
  relative block p-5 rounded-xl transition 
  bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm
  border border-black/10 hover:border-black/20
  dark:border-white/5 dark:hover:border-white/15
  shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
  dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]
  card-3d
`;



  if (status === "solved") {
    cardClasses = `
      relative block p-5 rounded-xl shadow transition hover:shadow-md
      border-2 border-green-500 bg-green-50 dark:bg-green-900/20
      card-3d
    `;
  }

  if (status === "attempted") {
    cardClasses = `
      relative block p-5 rounded-xl shadow transition hover:shadow-md
      border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20
      card-3d
    `;
  }

  return (
    <div className="card-wrapper">
      <Link
        to={`/problem/${id}`}
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className={cardClasses}
      >
        {status === "solved" && (
          <span className="absolute top-3 right-3 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm px-2 py-1 rounded-md font-medium">
            ✔ Solved
          </span>
        )}

        {status === "attempted" && (
          <span className="absolute top-3 right-3 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 text-sm px-2 py-1 rounded-md font-medium">
            ⚠ Attempted
          </span>
        )}

        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
          Topic: {topic}
        </p>

        <p className={`${difficultyColor} font-medium`}>{difficulty}</p>
      </Link>
    </div>
  );
}
