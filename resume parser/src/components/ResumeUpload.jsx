import Card from "./Card.jsx";
import DropZone from "./DropZone.jsx";

// Step 1 of the form. Shows the drop zone, then the file name or an error.
export default function ResumeUpload({ fileName, status, error, onFile }) {
  return (
    <Card className="flex flex-col">
      <h2 className="text-lg font-semibold">1. Your resume</h2>
      <p className="mt-1 text-sm text-slate-400">PDF or Word (.docx), up to 5 MB.</p>

      <DropZone onFile={onFile} />

      <p className="mt-3 text-sm text-slate-300" aria-live="polite">
        {status === "reading" ? `Reading ${fileName}...` : null}
        {status === "ready" ? `Loaded: ${fileName}` : null}
      </p>
      {status === "error" && (
        <p className="mt-1 text-sm text-rose-400" role="alert">{error}</p>
      )}
    </Card>
  );
}
