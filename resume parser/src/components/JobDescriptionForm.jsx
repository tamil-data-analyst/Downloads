import Card from "./Card.jsx";

// Step 2 of the form. The text is controlled by the parent, which owns the value.
export default function JobDescriptionForm({ value, onChange, onAnalyze, error }) {
  return (
    <Card className="flex flex-col">
      <h2 className="text-lg font-semibold">2. Job description</h2>
      <p className="mt-1 text-sm text-slate-400">Paste the full posting. The more detail, the better the match.</p>

      <label htmlFor="jd-input" className="sr-only">Job description</label>
      <textarea
        id="jd-input"
        rows={12}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here..."
        className="mt-4 w-full flex-1 resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />

      <button
        type="button"
        onClick={onAnalyze}
        className="mt-4 rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
      >
        Analyze my resume
      </button>
      {error && <p className="mt-2 text-sm text-rose-400" role="alert">{error}</p>}
    </Card>
  );
}
