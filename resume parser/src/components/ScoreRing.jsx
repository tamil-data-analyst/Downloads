// A circular gauge. The score sets how much of the ring is filled.
const CIRCUMFERENCE = 2 * Math.PI * 54; // radius 54, same as the circle below

export default function ScoreRing({ score }) {
  // dashoffset hides part of the stroke: 0 means a full ring, the full length means empty.
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-800" />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          className="text-indigo-400 transition-all duration-700"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold">{score}</p>
    </div>
  );
}
