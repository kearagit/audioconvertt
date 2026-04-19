import { GoogleGenAI } from "@google/genai";
import { fileToBase64 } from "../utils/fileHelpers";

const API_KEY = process.env.API_KEY || '';

export const generateIRCFromAudio = async (
  file: File, 
  wordsPerLine: number = 6
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const base64Data = await fileToBase64(file);

  const modelName = 'gemini-flash-latest'; 
  
  const prompt = `
    Task: Transcribe the provided audio file and format it as a standard LRC file (which will be saved as .irc).
    
    CRITICAL RULES:
    1. Break the transcription into small segments.
    2. Each segment MUST contain approximately ${wordsPerLine} words (between ${Math.max(3, wordsPerLine - 2)} and ${wordsPerLine + 1} words).
    3. Provide accurate timestamps for each segment in [mm:ss.xx] format.
    4. Return ONLY the content of the file. Do not include markdown code blocks (like \`\`\`lrc), headers, or explanations.
    5. Ensure the timestamps flow logically and correspond to the audio.
    6. If the audio is in a language other than English (e.g., Khmer, as suggested by context), transcribe it in that language accurately.

    Output Format Example:
    [00:00.00] Word one word two word three
    [00:02.15] Word four word five word six
    [00:04.50] Word seven word eight
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No transcription generated.");
    }

    // Clean up any potential markdown formatting if the model disobeys
    const cleanText = text.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '').trim();
    return cleanText;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to process audio.");
  }
};