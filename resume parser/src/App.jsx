import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ResumeUpload from "./components/ResumeUpload.jsx";
import JobDescriptionForm from "./components/JobDescriptionForm.jsx";
import Scorecard from "./components/Scorecard.jsx";
import Footer from "./components/Footer.jsx";
import { useResumeFile } from "./hooks/useResumeFile.js";
import { useAnalysis } from "./hooks/useAnalysis.js";

// App wires the pieces together. The hooks hold the state; the components render it.
export default function App() {
  const resume = useResumeFile();
  const analysis = useAnalysis();
  const [jobText, setJobText] = useState("");

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="analyzer" className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-2">
          <ResumeUpload
            fileName={resume.fileName}
            status={resume.status}
            error={resume.error}
            onFile={resume.loadFile}
          />
          <JobDescriptionForm
            value={jobText}
            onChange={setJobText}
            error={analysis.error}
            onAnalyze={() => analysis.analyze(resume.text, jobText)}
          />
        </section>

        {analysis.result && <Scorecard result={analysis.result} />}
      </main>
      <Footer />
    </>
  );
}
