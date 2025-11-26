import Tesseract from 'tesseract.js';

export async function extractTextFromImage(filePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      filePath, // no need for template literal
      'eng',
    );
    return text || '';
  } catch (err) {
    console.error('OCR Error:', err);
    return '';
  }
}
