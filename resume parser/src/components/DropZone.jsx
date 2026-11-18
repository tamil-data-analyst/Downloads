import { useState } from "react";

// A file picker you can also drop a file onto. It only reports the chosen file
// through onFile; it knows nothing about reading or scoring.
export default function DropZone({ onFile, accept = ".pdf,.docx" }) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(event) {
    // Without preventDefault the browser opens the dropped file in a new tab.
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) onFile(file);
  }

  function handleChange(event) {
    const file = event.target.files[0];
    if (file) onFile(file);
    // Reset so choosing the same file again still fires onChange.
    event.target.value = "";
  }

  const base =
    "mt-4 flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition";
  const state = isDragging
    ? "border-indigo-400 bg-slate-800/50"
    : "border-slate-700 hover:border-indigo-400 hover:bg-slate-800/50";

  return (
    <label
      className={`${base} ${state}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span className="text-4xl" aria-hidden="true">📄</span>
      <span className="font-medium">Drag and drop your resume here</span>
      <span className="text-sm text-slate-400">
        or <span className="text-indigo-400 underline">browse your files</span>
      </span>
      <input type="file" accept={accept} onChange={handleChange} className="sr-only" />
    </label>
  );
}
