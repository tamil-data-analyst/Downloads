import { useState, useCallback } from "react";
import { scoreResume } from "../lib/analysis.js";

const MIN_JD_WORDS = 20;

// Runs the match and keeps the result. Returns a function the button can call,
// plus an error message if the inputs are not ready.
export function useAnalysis() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyze = useCallback((resumeText, jobText) => {
    setError("");
    if (!resumeText) {
      setError("Upload your resume first.");
      setResult(null);
      return;
    }
    if (jobText.trim().split(/\s+/).filter(Boolean).length < MIN_JD_WORDS) {
      setError(`Paste a fuller job description (at least about ${MIN_JD_WORDS} words).`);
      setResult(null);
      return;
    }
    setResult(scoreResume(resumeText, jobText));
  }, []);

  return { result, error, analyze };
}
