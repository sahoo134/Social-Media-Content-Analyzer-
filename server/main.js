import { extractTextFromImage } from './services/ocrService.js';

async function main() {
  const text = await extractTextFromImage('./image.png'); // relative to main.js
  console.log('Extracted Text:\n', text);
}

main();
