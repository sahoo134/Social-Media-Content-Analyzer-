# Social Media Content Analyzer - Backend

## Setup
1. Copy `.env.example` -> `.env` and fill GEMINI_API_KEY
2. Install dependencies: `npm install`
3. Start server: `npm run dev` (nodemon) or `npm start`

## Endpoints
POST /api/upload
- form-data key: `file` (PDF or Image)
- Response: { success, meta, extractedText, suggestions }

## Notes
- Uploaded files saved to `uploads/` and auto-deleted after extraction
- AI analysis via LangChain + ChatGoogleGenerativeAI (Gemini)
