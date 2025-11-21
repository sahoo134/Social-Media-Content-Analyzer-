import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { geminiConfig } from "../config/geminiClient.js";

export async function analyzeTextWithLangChain(text) {
  const model = new ChatGoogleGenerativeAI(geminiConfig);

  const prompt = PromptTemplate.fromTemplate(`
You are a social media strategist. Return ONLY valid JSON with these keys:

- short_summary: string
- recommended_hashtags: array of 6-10 strings (include #)
- improved_post: string (optimized <280 chars)
- three_ctas: array of 3 strings
- readability_tips: array of short tips

Text:
""" 
{post}
"""

Return ONLY JSON. No explanation.
`);

  const chain = prompt
    .pipe(model)
    .pipe(new StringOutputParser());

  try {
    const raw = await chain.invoke({ post: text });
    const first = raw.indexOf("{");
    const cleaned = raw.slice(first).trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("LLM JSON parse error, returning fallback:", e);
    return fallbackAnalysis(text);
  }
}

function fallbackAnalysis(text) {
  const preview = text.split(" ").slice(0, 20).join(" ");
  return {
    short_summary: preview,
    recommended_hashtags: ["#socialmedia", "#engagement"],
    improved_post: preview + "...",
    three_ctas: ["Follow us", "Share this", "Comment"],
    readability_tips: ["Use short sentences", "Add line breaks", "Include a CTA"]
  };
}
