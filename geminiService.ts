
import { GoogleGenAI, Type } from "@google/genai";
import { UserHabits, PredictionResult } from "./types";

export const calculateLongevity = async (habits: UserHabits): Promise<PredictionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this mortal's earthly habits and predict when their soul will be "tapped" for the final descent.
    
    Mortal Ledger Entry:
    - Age: ${habits.age}
    - Form: ${habits.gender}
    - Smoking: ${habits.smokingFrequency} cigs/day
    - Alcohol: ${habits.alcoholFrequency} drinks/week
    - Sleep: ${habits.sleepHours} hours/night
    - Stress: ${habits.stressLevel}
    - Diet: ${habits.dietType}
    - Vitality Rituals (Exercise): ${habits.exerciseHours} hours/week
    - Mind Control (Yoga): ${habits.yogaMinutes} minutes/week
    - Sedentary Rot: ${habits.physicalInactivityHours} hours/day
    - Hydration (Water): ${habits.waterLiters} Liters/day
    - Sugar Sin: ${habits.sugarIntake}
    - Digital Trance (Screen Time): ${habits.screenTimeHours} hours/day
    - Soul Connection (Social): ${habits.socialHours} hours/week
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are the Head Scribe of the FinalTap Bureau. You analyze mortal data with dark, cynical accuracy. Your JSON response must be precise and follow the provided schema. The 'keyFactors' should specifically reference the impact of water, sugar, and screen time alongside traditional metrics.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedLifespan: { type: Type.NUMBER },
          estimatedDeathDate: { type: Type.STRING },
          healthScore: { type: Type.NUMBER },
          keyFactors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                factor: { type: Type.STRING },
                impact: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["factor", "impact", "description"]
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          scientificInsights: { type: Type.STRING }
        },
        required: ["estimatedLifespan", "estimatedDeathDate", "healthScore", "keyFactors", "recommendations", "scientificInsights"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("The Abyss remains silent.");
  }
  return JSON.parse(text);
};
