
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateDiagnosisStream = async (
  userInput: string,
  history: { role: 'user' | 'model', content: string }[],
  onChunk: (text: string) => void,
  imageData?: string
): Promise<void> => {
  const ai = getAIClient();
  const maxRetries = 3;
  let retryCount = 0;

  const contents = history.map(h => ({
    role: h.role === 'model' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  const currentParts: any[] = [{ text: userInput }];
  
  if (imageData) {
    currentParts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageData.split(',')[1]
      }
    });
  }

  contents.push({ role: 'user', parts: currentParts });

  const executeRequest = async () => {
    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
          topP: 0.95,
          topK: 40,
        },
      });

      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        if (chunkText) {
          onChunk(chunkText);
        }
      }
    } catch (error: any) {
      const status = error.status || "";
      const message = error.message || "";
      
      // Check for transient errors (503 Overloaded or 429 Rate Limit)
      const isTransient = 
        message.includes('503') || 
        message.includes('UNAVAILABLE') || 
        message.includes('429') || 
        message.includes('RESOURCE_EXHAUSTED');

      if (isTransient && retryCount < maxRetries) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s
        console.warn(`FixPro AI: Model overloaded/rate-limited. Retrying in ${delay}ms... (Attempt ${retryCount}/${maxRetries})`);
        await sleep(delay);
        return executeRequest(); // Recursive retry
      }

      console.error("FixPro AI Streaming Error:", error);
      
      if (message.includes('RESOURCE_EXHAUSTED') || message.includes('429')) {
        throw new Error('QUOTA_EXCEEDED');
      }
      throw error;
    }
  };

  return executeRequest();
};
