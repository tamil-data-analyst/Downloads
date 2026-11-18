// Turns an uploaded PDF or Word file into plain text.
// Both libraries run entirely in the browser; the file is never uploaded.
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export const MAX_BYTES = 5 * 1024 * 1024;

async function readPdf(buffer) {
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    // Each item is one piece of text. Join them with spaces, and end each page with a line break.
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  return text;
}

async function readDocx(buffer) {
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

// Returns the text, or throws an Error with a message the user can read.
export async function readResume(file) {
  const name = file.name.toLowerCase();
  const isPdf = name.endsWith(".pdf");
  const isDocx = name.endsWith(".docx");

  if (!isPdf && !isDocx) {
    throw new Error("That file type is not supported. Please upload a PDF or .docx file.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("That file is larger than 5 MB.");
  }

  const buffer = await file.arrayBuffer();
  const text = isPdf ? await readPdf(buffer) : await readDocx(buffer);

  if (text.trim().length === 0) {
    throw new Error("No text found. If your PDF is a scanned image, use a text-based PDF.");
  }
  return text;
}
