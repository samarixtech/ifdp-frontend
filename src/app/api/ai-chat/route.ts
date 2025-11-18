import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(req: Request) {
  const { message } = await req.json();

//   const completion = await client.chat.completions.create({
//     model: "gpt-4o-mini", // Or gpt-4o, gpt-4.1
//     messages: [{ role: "user", content: message }],
//   });

//   const reply = completion.choices[0].message.content;

//   return NextResponse.json({ reply });
}
