// Pure functions: text in, results out. No React here, so they are easy to test.

// Common English words that carry no meaning for a job match.
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have", "in",
  "is", "it", "its", "of", "on", "or", "that", "the", "their", "they", "this", "to",
  "was", "we", "will", "with", "you", "your", "our", "who", "what", "which", "can",
  "about", "all", "also", "any", "been", "but", "etc", "not", "other", "such", "than",
  "into", "more", "most", "new", "use", "using", "work", "working", "team", "role",
  "including", "experience", "years", "year", "strong", "good", "ability", "skills",
  "must", "should", "would", "may", "like", "way", "well", "make", "help",
]);

// Lowercase words, keeping characters used in tech names: c++, c#, node.js, ci/cd.
export function tokenize(text) {
  const matches = text.toLowerCase().match(/[a-z][a-z0-9+#.]*[a-z0-9+#]|[a-z]{2,}/g) || [];
  return matches
    .map((word) => word.replace(/\.+$/, ""))
    .filter((word) => word.length >= 2 && !STOP_WORDS.has(word));
}

// Count how often each term appears in the job description, then keep the most frequent.
export function extractKeywords(jobText, limit = 30) {
  const counts = new Map();
  for (const word of tokenize(jobText)) {
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term, count]) => ({ term, count }));
}

// Checks about the structure of the resume, not the job.
export function structureChecks(text) {
  const quantified = text.match(/\d+(\.\d+)?\s?%|\$\s?\d[\d,.]*|\b\d{2,}\+?\b/g) || [];
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return [
    { label: "Work experience section", pass: /experience|employment|work history/i.test(text) },
    { label: "Education section", pass: /education|degree|university|college/i.test(text) },
    { label: "Skills section", pass: /skills?|technologies|tools/i.test(text) },
    { label: "Projects section", pass: /projects?/i.test(text) },
    { label: "Email address", pass: /[\w.+-]+@[\w-]+\.[\w.]+/.test(text) },
    { label: "At least 3 numbers or metrics", pass: quantified.length >= 3, detail: `${quantified.length} found` },
    { label: "Length between 300 and 900 words", pass: wordCount >= 300 && wordCount <= 900, detail: `${wordCount} words` },
  ];
}

// Keyword match is weighted by how often each term appears in the job description.
export function scoreResume(resume, jobText) {
  const resumeWords = new Set(tokenize(resume));
  const keywords = extractKeywords(jobText);

  const totalWeight = keywords.reduce((sum, k) => sum + k.count, 0);
  const matched = keywords.filter((k) => resumeWords.has(k.term));
  const missing = keywords.filter((k) => !resumeWords.has(k.term));
  const matchedWeight = matched.reduce((sum, k) => sum + k.count, 0);

  const keywordScore = totalWeight ? Math.round((matchedWeight / totalWeight) * 100) : 0;

  const checks = structureChecks(resume);
  const structureScore = Math.round((checks.filter((c) => c.pass).length / checks.length) * 100);

  // Keywords count for 70% of the overall score, and structure for 30%.
  const overall = Math.round(keywordScore * 0.7 + structureScore * 0.3);

  return {
    overall,
    keywordScore,
    structureScore,
    matched,
    missing,
    checks,
    strengths: buildStrengths({ matched, keywordScore, checks }),
    weaknesses: buildWeaknesses({ missing, checks }),
  };
}

function buildStrengths({ matched, keywordScore, checks }) {
  const strengths = [];
  const topMatched = matched.slice(0, 5).map((k) => k.term);
  if (topMatched.length) {
    strengths.push(`Covers key terms from the job: ${topMatched.join(", ")}.`);
  }
  if (keywordScore >= 70) {
    strengths.push("Strong keyword overlap with the job description.");
  }
  const passed = checks.filter((c) => c.pass).map((c) => c.label.toLowerCase());
  if (passed.length) {
    strengths.push(`Good structure: ${passed.slice(0, 3).join(", ")}.`);
  }
  if (!strengths.length) strengths.push("No clear strengths found. Add more of the job's own terms.");
  return strengths;
}

function buildWeaknesses({ missing, checks }) {
  const weaknesses = [];
  const topMissing = missing.slice(0, 5).map((k) => k.term);
  if (topMissing.length) {
    weaknesses.push(`Missing terms that appear often in the job: ${topMissing.join(", ")}.`);
  }
  for (const check of checks.filter((c) => !c.pass)) {
    weaknesses.push(`Fix: ${check.label.toLowerCase()}${check.detail ? ` (${check.detail})` : ""}.`);
  }
  if (!weaknesses.length) weaknesses.push("No major weaknesses found.");
  return weaknesses;
}

export function scoreLabel(overall) {
  if (overall >= 75) return "Strong match";
  if (overall >= 50) return "Partial match";
  return "Weak match";
}
