import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

export const generateIRCFromAudio = async (file: File): Promise<string> => {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Please add it in Settings.");
  }

  // Convert file to base64
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  const imagePart = {
    inlineData: {
      data: base64Data.split(',')[1],
      mimeType: file.type
    }
  };

  const prompt = `Transcribe this audio precisely. 
Output it in .irc (LRC style) format with timestamps [mm:ss.xx].
Break lines every 5-6 words to ensure they are short and readable.
Return ONLY the format content, no extra text.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: [imagePart, { text: prompt }] }
  });

  return response.text?.replace(/```irc|```lrc|```|irc|lrc/g, '').trim() || "";
};
