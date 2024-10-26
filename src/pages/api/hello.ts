import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.body === null) {
    return new Error("request body nullish");
  }

  const { prompt } = await req.json();
  const messages: Array<Message> = [
    { id: new Date().toString(), role: "user", content: prompt },
  ];

  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(buildGoogleGenAIPrompt(messages));
  const stream = GoogleGenerativeAIStream(geminiStream);

  return new StreamingTextResponse(stream);
}
