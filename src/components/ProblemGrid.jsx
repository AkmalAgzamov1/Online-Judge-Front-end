import { problems } from "../data/problems";
import ProblemCard from "./ProblemCard";

export default function ProblemGrid() {
  return (
    <div className="oj-grid">
      {problems.map((p) => (
        <ProblemCard key={p.id} {...p} />
      ))}
    </div>
  );
}
