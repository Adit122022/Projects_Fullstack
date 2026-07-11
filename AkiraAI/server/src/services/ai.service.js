import { ChatGoogle } from "@langchain/google";
import { ChatMistral } from "@langchain/mistral";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const Google_API_KEY = process.env.GOOGLE_API_KEY;
const gemini_llm = new ChatGoogle({
  apiKey: Google_API_KEY,
  model: "gemini-2.5-flash",
});

const mistral_llm = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-2603",
});

export async function aiMsg(prompt) {
  try {
    const response = await mistral_llm
    .invoke([
      new SystemMessage(
        "You are an advanced AI chatbot designed to be the best of the best at helping users with questions and tasks. You must always prioritize safety and never generate, promote, or discuss sexual, explicit, or abusive content. Politely refuse any requests that are inappropriate or violate these guardrails. Remain professional, respectful, and helpful at all times.",
   
      ),
      new HumanMessage(prompt),
    ])
    return response.text;
  } catch (error) {
    return error;
  }
}

export async function genreateChatTitle(messages){
  try {
    const response = await mistral_llm
    .invoke([
      new SystemMessage(
        "You are a helpful assistant that can generate a title for a chat based on the messages.",
      ),
    ])
  } catch (error) {
    return error;
  }
}
