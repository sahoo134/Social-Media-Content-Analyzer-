import dotenv from "dotenv";
dotenv.config();

// Currently no separate client needed for ChatGoogleGenerativeAI
export const geminiConfig = {
    model: "models/gemini-2.5-flash",
    maxOutputTokens: 2048,
    temperature: 0.7,
    apiKey:  process.env.GEMINI_API_KEY,
};
