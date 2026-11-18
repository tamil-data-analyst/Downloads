// Shows each structure check with a tick or a cross.
export default function ChecklistPanel({ checks }) {
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {checks.map((check) => (
        <li key={check.label} className="flex items-center gap-2">
          <span className={check.pass ? "text-emerald-400" : "text-rose-400"} aria-hidden="true">
            {check.pass ? "✓" : "✗"}
          </span>
          <span>
            {check.label}
            {check.detail ? ` (${check.detail})` : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}
