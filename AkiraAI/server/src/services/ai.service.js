import { ChatGoogle } from "@langchain/google";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const Google_API_KEY = process.env.GOOGLE_API_KEY;
const llm = new ChatGoogle({
  apiKey: Google_API_KEY,
  model: "gemini-2.5-flash",
});

// Create a function to handle the AI logic
export async function aiMsg(prompt) {
  llm
    .invoke([
      new SystemMessage(
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
      ),
      new HumanMessage(prompt),
    ])
    .then((res) => {
      console.log(res.text);
    })
    .catch((err) => {
      console.log(err);
    });
}
