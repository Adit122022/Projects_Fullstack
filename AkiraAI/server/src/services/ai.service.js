import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogle } from "@langchain/google";

const Google_API_KEY = process.env.GOOGLE_API_KEY;
const Mistral_API_KEY = process.env.MISTRAL_API_KEY;

const gemini_llm = new ChatGoogle({
  apiKey: Google_API_KEY,
  model: "gemini-1.5-flash",
  modelName: "gemini-1.5-flash",
});

const mistral_llm = new ChatMistralAI({
  apiKey: Mistral_API_KEY,
  model: "mistral-small-2603",
});

export async function aiMsg(prompt) {
  try {
    const formattedMessages = prompt.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role === "ai" || msg.role === "assistant") {
        return new AIMessage(msg.content);
      } else if (msg.role === "system") {
        return new SystemMessage(msg.content);
      }
      return new HumanMessage(msg.content);
    });

    // Safeguard: Ensure the last message sent to Mistral is from the user
    const lastMsg = formattedMessages[formattedMessages.length - 1];
    if (lastMsg && lastMsg._getType() === "ai") {
      formattedMessages.pop(); // Remove trailing AI message if present
    }

    const response = await mistral_llm.invoke([
      new SystemMessage(
        "You are a helpful assistant that can answer questions based on the messages. The answer should be in the same language as the messages."
      ),
      ...formattedMessages,
    ]);

    return response.content;
  } catch (error) {
    console.error("Error in aiMsg:", error);
    throw error;
  }
}

export async function genreateChatTitle(messages) {
  try {
    const payload = typeof messages === "string" ? messages : JSON.stringify(messages);

    const response = await gemini_llm.invoke([
      new SystemMessage(
        "You are a helpful assistant that generates a concise title for a chat based on the initial message. The title should be 3 to 6 words in the same language."
      ),
      new HumanMessage(payload),
    ]);

    const titleText = typeof response.content === "string" ? response.content : response.text;
    return (titleText || "").replace(/^["']|["']$/g, '').trim() || "New Chat";
  } catch (error) {
    console.error("Error in genreateChatTitle:", error);
    throw error;
  }
}