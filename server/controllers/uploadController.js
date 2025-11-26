import fs from "fs/promises";
import { isPdf, isImage } from "../utils/fileValidator.js";
import { extractTextFromPdf } from "../services/pdfService.js";
import { extractTextFromImage } from "../services/ocrService.js";
import { analyzeTextWithLangChain } from "../services/aiService.js";

export async function handleUpload(req, res, next) {
  try {
   
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    
    let text = "";
    let meta = { originalName: req.file.originalname, size: req.file.size };


    if (isPdf(req.file.mimetype, req.file.originalname)) {
      const { extractedText, pages } = await extractTextFromPdf(filePath);
      text = extractedText;
      meta.pages = pages;
    } else if (isImage(req.file.mimetype, req.file.originalname)) {
      text = await extractTextFromImage(filePath);
      meta.ocr = true;
    } else {
      await fs.unlink(filePath).catch(() => {});
      return res.status(400).json({ error: "Unsupported file type" });
    }
    
    await fs.unlink(filePath).catch(() => {});

    if (!text || text.trim().length === 0) {
      return res.status(200).json({ success: true, meta, extractedText: text, suggestions: null, message: "No text detected" });
    }
    const suggestions = await analyzeTextWithLangChain(text);
    return res.json({ success: true, meta, extractedText: text, suggestions });
  } catch (err) {
    next(err);
  }
}
