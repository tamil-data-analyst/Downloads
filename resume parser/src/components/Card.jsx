// A reusable panel. Other components pass their content as children,
// and extra classes through className, so the look stays in one place.
export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 ${className}`}>
      {children}
    </div>
  );
}
