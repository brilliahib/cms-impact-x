import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt && !context) {
      return NextResponse.json(
        { error: "Prompt or context is required" },
        { status: 400 },
      );
    }

    const finalPrompt = context
      ? `${prompt}\n\nSaya tertarik pada bidang karir berikut: ${context.join(
          ", ",
        )}. Tolong berikan rekomendasi jalur karir, skill yang dibutuhkan, dan langkah awal yang bisa saya ambil.`
      : prompt;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
