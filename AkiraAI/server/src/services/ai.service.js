import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
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
        "You are a helpful assistant that can generate a title for a chat based on the messages. User will give you a list of messages and you need to generate a title for the chat based on the messages. The title should be a single word or phrase that captures the essence of the chat. The title should be in the same language as the messages. The title should be no more than 10 words. The title should be no less than 3 words. The title should be no more than 30 characters. The title should be no less than 3 characters.",
      ),
      new HumanMessage(messages),
    ])
    return response.text;
  } catch (error) {
    return error;
  }
}
