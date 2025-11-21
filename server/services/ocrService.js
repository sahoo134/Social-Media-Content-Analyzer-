import { createWorker } from "tesseract.js";

export async function extractTextFromImage(filePath) {
  const worker = createWorker();

  try {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(filePath);
    await worker.terminate();
    return data?.text || "";
  } catch (e) {
    await worker.terminate().catch(() => {});
    throw e;
  }
}
