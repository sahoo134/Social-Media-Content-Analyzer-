import fs from "fs/promises";
import { isPdf, isImage } from "../utils/fileValidator.js";
import { extractTextFromPdf } from "../services/pdfService.js";
import { extractTextFromImage } from "../services/ocrService.js";
import { analyzeTextWithLangChain } from "../services/aiService.js";

export async function handleUpload(req, res, next) {
  try {
    console.log("come")
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    console.log("go to path: ", filePath);
    
    let text = "";
    let meta = { originalName: req.file.originalname, size: req.file.size };


    if (isPdf(req.file.mimetype, req.file.originalname)) {
      const { extractedText, pages } = await extractTextFromPdf(filePath);
      text = extractedText;
      meta.pages = pages;
    } else if (isImage(req.file.mimetype, req.file.originalname)) {
      text = await extractTextFromImage(filePath);
      meta.ocr = true;
      console.log('text: 0', text);
    } else {
      await fs.unlink(filePath).catch(() => {});
      return res.status(400).json({ error: "Unsupported file type" });
    }
    
    console.log('text: 0.1', text);
    await fs.unlink(filePath).catch(() => {});

    if (!text || text.trim().length === 0) {
      return res.status(200).json({ success: true, meta, extractedText: text, suggestions: null, message: "No text detected" });
    }
    console.log('text: 1', text);
    const suggestions = await analyzeTextWithLangChain(text);
    console.log("suggestion:", suggestions);
    return res.json({ success: true, meta, extractedText: text, suggestions });
  } catch (err) {
    next(err);
  }
}
