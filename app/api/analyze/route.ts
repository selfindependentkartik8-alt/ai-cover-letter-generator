import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { input } = body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return NextResponse.json(
        { error: "Input is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert AI assistant.

Analyze the user's input carefully and provide a useful, accurate response.

USER INPUT:
${input}

Return ONLY valid JSON using exactly this structure:

{
  "title": "",
  "summary": "",
  "keyPoints": [],
  "suggestions": [],
  "finalAnswer": ""
}

Rules:
- Keep the response practical and easy to understand.
- keyPoints must contain useful points from the user's input.
- suggestions must contain actionable suggestions when appropriate.
- Do not invent facts that are not supported by the input.
- finalAnswer should be concise but useful.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      const cleaned = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      result = JSON.parse(cleaned);
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI TOOL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate AI response.",
      },
      { status: 500 }
    );
  }
}