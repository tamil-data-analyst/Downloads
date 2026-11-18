import Card from "./Card.jsx";
import ScoreRing from "./ScoreRing.jsx";
import KeywordChips from "./KeywordChips.jsx";
import BulletList from "./BulletList.jsx";
import ChecklistPanel from "./ChecklistPanel.jsx";
import { scoreLabel } from "../lib/analysis.js";

// Shows a finished analysis. It only displays the result it is given.
export default function Scorecard({ result }) {
  const matchedTerms = result.matched.map((k) => k.term);
  const missingTerms = result.missing.map((k) => k.term);

  return (
    <section id="scorecard" className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="text-2xl font-bold">Your scorecard</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center">
          <ScoreRing score={result.overall} />
          <p className="mt-4 text-sm text-slate-400">Overall match</p>
          <p className="mt-1 font-semibold">{scoreLabel(result.overall)}</p>

          <dl className="mt-6 w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Keyword match</dt>
              <dd className="font-semibold">{result.keywordScore}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Resume structure</dt>
              <dd className="font-semibold">{result.structureScore}%</dd>
            </div>
          </dl>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Keywords from the job description</h3>

          <p className="mt-4 text-sm font-medium text-emerald-400">Found in your resume</p>
          <div className="mt-2">
            <KeywordChips terms={matchedTerms} tone="good" emptyText="None of the job's keywords were found." />
          </div>

          <p className="mt-6 text-sm font-medium text-rose-400">Missing from your resume</p>
          <div className="mt-2">
            <KeywordChips terms={missingTerms} tone="bad" emptyText="Nothing missing. Well done." />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-emerald-400">Strengths</h3>
          <BulletList items={result.strengths} />
        </Card>

        <Card>
          <h3 className="font-semibold text-rose-400">Weaknesses</h3>
          <BulletList items={result.weaknesses} />
        </Card>

        <Card>
          <h3 className="font-semibold">Resume checklist</h3>
          <ChecklistPanel checks={result.checks} />
        </Card>
      </div>
    </section>
  );
}
