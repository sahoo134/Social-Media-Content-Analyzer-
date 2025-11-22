import Tesseract from 'tesseract.js';

export async function extractTextFromImage(filePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      filePath, // no need for template literal
      'eng',
      {
        logger: m => console.log('OCR Progress:', m) // progress logs
      }
    );
    console.log('text: ', text)
    return text || '';
  } catch (err) {
    console.error('OCR Error:', err);
    return '';
  }
}
