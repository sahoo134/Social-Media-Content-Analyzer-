import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { RunnableParallel } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {geminiConfig} from "../config/geminiClient.js"



const model = new ChatGoogleGenerativeAI(geminiConfig);

const shortSummarySchema = z.object({
  short_summary: z.string(),
});

const hashtagsSchema = z.object({
  recommended_hashtags: z.array(z.string()).min(6).max(10),
});

const improvedPostSchema = z.object({
  improved_post: z.string(),
});

const ctaSchema = z.object({
  three_ctas: z.array(z.string()).length(3),
});

const readabilitySchema = z.object({
  readability_tips: z.array(z.string()),
});

// ------------------------
// 🌟 Structured Parsers
// ------------------------
const shortSummaryParser = StructuredOutputParser.fromZodSchema(shortSummarySchema);
const hashtagsParser = StructuredOutputParser.fromZodSchema(hashtagsSchema);
const improvedPostParser = StructuredOutputParser.fromZodSchema(improvedPostSchema);
const ctaParser = StructuredOutputParser.fromZodSchema(ctaSchema);
const readabilityParser = StructuredOutputParser.fromZodSchema(readabilitySchema);

// ------------------------
// 🌟 Prompt Builder
// ------------------------
const makePrompt = (parser) =>
  PromptTemplate.fromTemplate(`
You are a social media strategist.
Return ONLY valid JSON.

{format_instructions}

Analyze this post:

"{text}"
`);

// ------------------------
// 🌟 Function to run each parser/model
// ------------------------
async function runChain(parser, text) {
  const prompt = await makePrompt(parser);
  const chain = prompt.pipe(model).pipe(parser);

  return chain.invoke({
    text,
    format_instructions: parser.getFormatInstructions(),
  });
}

// ------------------------
// 🌟 Execute All Tasks in Parallel
// ------------------------
const parallelChain = new RunnableParallel({
  steps: {
    short_summary: (text) => runChain(shortSummaryParser, text),
    recommended_hashtags: (text) => runChain(hashtagsParser, text),
    improved_post: (text) => runChain(improvedPostParser, text),
    three_ctas: (text) => runChain(ctaParser, text),
    readability_tips: (text) => runChain(readabilityParser, text),
  }
});

// ------------------------
// 🌟 Final Combined Function
// ------------------------
export async function analyzeTextWithLangChain(text) {
  try {
    const result = await parallelChain.invoke(text);
    return {
      ...result.short_summary,
      ...result.recommended_hashtags,
      ...result.improved_post,
      ...result.three_ctas,
      ...result.readability_tips,
    };
  } catch (err) {
    console.error("❌ Structured Gemini AI Error:", err);
    throw new Error("Gemini structured output failed");
  }
}
