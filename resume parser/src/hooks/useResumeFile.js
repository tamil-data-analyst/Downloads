import { useState, useCallback } from "react";
import { readResume } from "../lib/readResume.js";

// Owns everything about the uploaded resume: its name, its text, and any error.
// Components only call loadFile and read the returned values.
export function useResumeFile() {
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "reading" | "ready" | "error"
  const [error, setError] = useState("");

  const loadFile = useCallback(async (file) => {
    setStatus("reading");
    setFileName(file.name);
    setError("");
    setText("");
    try {
      setText(await readResume(file));
      setStatus("ready");
    } catch (err) {
      setError(`Could not read that file. ${err.message}`);
      setFileName("");
      setStatus("error");
    }
  }, []);

  return { fileName, text, status, error, loadFile };
}
