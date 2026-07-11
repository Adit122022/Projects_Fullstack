import { Router } from "express";
import { send_message } from "../controller/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const ChatRouter = Router();

/**
 * @route POST /api/chat/message
 * @desc Send a message to the chatbot
 * @access Private
 * @body {message}
 * @returns {Object} - The response from the chatbot
 * @example
 * {
 *  "message": "Hello, how are you?"
 * }
 */
ChatRouter.post("/send-message",authUser, send_message);

export default ChatRouter;