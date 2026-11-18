// A reusable list of terms shown as coloured pills. The colour is passed in,
// so the same component shows matched and missing keywords.
const TONES = {
  good: "bg-emerald-500/15 text-emerald-300",
  bad: "bg-rose-500/15 text-rose-300",
};

export default function KeywordChips({ terms, tone, emptyText }) {
  if (terms.length === 0) {
    return <p className="text-sm text-slate-400">{emptyText}</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {terms.map((term) => (
        <span key={term} className={`rounded-full px-3 py-1 text-sm ${TONES[tone]}`}>
          {term}
        </span>
      ))}
    </div>
  );
}
