import { Doctor } from "@prisma/client";
import openai from "../config/openAi/openai.config";
import extractJsonFromMessage from "../utils/extractJsonFromMessage";

export default async function openRouter(
  payload: { symptoms: string },
  doctors: Doctor[],
) {
  const prompt = `
    You are a medical assistant AI. Based on the patient's symptoms, suggest the top 3 most suitable doctors. Each doctor has specialties and years of experience.

    Only suggest doctors who are relevant to the given symptoms.

    Symptoms: ${payload.symptoms}

    Here is the doctor list (in JSON): ${JSON.stringify(doctors, null, 2)}

    Return your response in JSON format with full individual doctor data.
    `;

  const completion = await openai.chat.completions.create({
    // model: "openai/gpt-4o",
    model: "z-ai/glm-4.5-air:free",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI medical assistant that provides doctor suggestion",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return extractJsonFromMessage(completion.choices[0]?.message);
}

//
