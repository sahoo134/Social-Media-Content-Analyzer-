import dotenv from "dotenv";
dotenv.config();

// Currently no separate client needed for ChatGoogleGenerativeAI
export const geminiConfig = {
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  temperature: 0.4,
  maxOutputTokens: 800
};
