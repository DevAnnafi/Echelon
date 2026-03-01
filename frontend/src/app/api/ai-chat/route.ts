// FILE: app/api/ai-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const systemPrompts: Record<string, string> = {
  coach: "You are an inspiring life coach. Help users plan their day, set goals, and stay motivated. Be encouraging and positive.",
  planner: "You are a strategic task planner. Help users organize tasks, prioritize goals, and create actionable plans. Be practical and specific.",
  analyst: "You are a data analyst focused on productivity. Help users understand their habits, track progress, and optimize their routines. Use data-driven insights.",
};

export async function POST(req: NextRequest) {
  try {
    const { message, mode = "coach", conversationHistory = [] } = await req.json();

    if (!message || !OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing message or API key" },
        { status: 400 }
      );
    }

    const systemPrompt = systemPrompts[mode] || systemPrompts.coach;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to get AI response" },
        { status: response.status }
      );
    }

    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}