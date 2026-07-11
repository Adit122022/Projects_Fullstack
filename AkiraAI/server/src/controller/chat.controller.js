import messageModel from "../models/message.model.js";
import { aiMsg, genreateChatTitle } from "../services/ai.service.js";

export const send_message = async (req, res) => {
  try {
    const { message } = req.body;
    const title = await genreateChatTitle(result);
    const result = await aiMsg(message);

    if (!title) {
      return res.status(400).json({ message: "Failed to generate title" });
    }
    if (!result) {
      return res.status(400).json({ message: "Failed to send message" });
    }
const chat = await chatModel.create({
  title: title,
  user: req.user._id,
 
});
const message_id = await messageModel.create({
  chat: chat._id,
  content: result,
  role: "ai",
});
    return res.status(200).json({ title:title,chat: chat, message: message_id });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

