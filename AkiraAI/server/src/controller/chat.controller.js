import { aiMsg } from "../services/ai.service.js";

export const send_message = async (req, res) => {
  try {
    const { message } = req.body;
    const result = await aiMsg(message);

    if (!result) {
      return res.status(400).json({ message: "Failed to send message" });
    }
    return res.status(200).json({ ai_message: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

