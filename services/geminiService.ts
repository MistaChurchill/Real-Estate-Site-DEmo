import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRealEstateResponse = async (
  userMessage: string, 
  history: { role: string; parts: { text: string }[] }[]
) => {
  if (!apiKey) {
    return "I'm sorry, my connection to the server is currently limited (API Key missing). Please contact support.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are "Lux", an expert real estate concierge for LuxeEstate. 
    Your tone is professional, warm, and sophisticated. 
    You assist users in finding properties, understanding mortgage rates, and learning about neighborhoods.
    Keep answers concise (under 100 words) unless asked for details.
    
    Current Listings available to mention if relevant:
    1. Modern Loft in Downtown ($850,000) - 2 Bed, 2 Bath.
    2. Seaside Villa ($2,400,000) - 4 Bed, 3 Bath, Ocean View.
    3. Suburban Family Home ($650,000) - 3 Bed, 2.5 Bath, Large Garden.
    4. Mountain Retreat ($1,200,000) - 3 Bed, 3 Bath, Panoramic Views.
    5. Minimalist Studio ($450,000) - 1 Bed, 1 Bath, City Center.
    6. Historic Brownstone ($3,100,000) - 5 Bed, 4 Bath, Luxury Renovation.
    
    If a user asks to schedule a viewing, politely ask for their preferred date and email address.`;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history,
    });

    const response = await chat.sendMessageStream({ message: userMessage });
    return response;

  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};