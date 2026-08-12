import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { resume, jobDescription, tone } = body;

    if (!resume || typeof resume !== "string" || !resume.trim()) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    if (
      !jobDescription ||
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    const selectedTone =
      typeof tone === "string" && tone.trim()
        ? tone
        : "Professional";

    const prompt = `
You are an expert professional cover letter writer.

Create a personalized cover letter for the candidate using ONLY the information provided in their resume and the target job description.

IMPORTANT RULES:

- Do NOT invent experience.
- Do NOT invent projects.
- Do NOT invent skills.
- Do NOT invent education.
- Do NOT invent certifications.
- Do NOT invent achievements.
- Do NOT claim the candidate has experience that is not present in the resume.
- Connect the candidate's actual experience and skills to the target job where relevant.
- Make the letter specific to the job description.
- Avoid generic filler.
- Keep it natural and human-sounding.
- Do not mention that AI wrote the letter.
- Do not use markdown headings.
- Do not wrap the response in quotation marks.
- Return ONLY the final cover letter.

Preferred tone:
${selectedTone}

CANDIDATE RESUME:
${resume}

TARGET JOB DESCRIPTION:
${jobDescription}

Write a polished cover letter suitable for a job application.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text || !text.trim()) {
      throw new Error("Gemini returned an empty response.");
    }

    return NextResponse.json({
      success: true,
      result: text.trim(),
    });
  } catch (error) {
    console.error("COVER LETTER GENERATOR ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate cover letter.",
      },
      { status: 500 }
    );
  }
}