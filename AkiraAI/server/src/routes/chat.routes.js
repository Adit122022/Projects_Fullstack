import { Router } from "express";
import { delete_chat, get_chats, get_messages, send_message, update_message } from "../controller/chat.controller.js";
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
 *  "message": "Hello, how are you?", ?"chat": "<CHAT_ID>"
 * }
 */
ChatRouter.post("/message",authUser, send_message);
/**
 * @route GET /api/chat/
 * @desc Get all chats for the authenticated user
 * @access Private
 * @returns {Object} - The list of chats
 * @example
 * {
 *  "chats": [...]
 * }
 */
ChatRouter.get("/",authUser, get_chats);
/**
 * @route GET /api/chat/:chat_id
 * @desc Get messages for a specific chat
 * @access Private
 * @param {string} chat_id - The ID of the chat
 * @returns {Object} - The list of messages
 * @example
 * {
 *  "messages": [...]
 * }
 */
ChatRouter.get("/:chat_id",authUser, get_messages);
/**
 * @route DELETE /api/chat/:chat_id
 * @desc Delete a specific chat and its messages
 * @access Private
 * @param {string} chat_id - The ID of the chat
 * @returns {Object} - Success message
 * @example
 */
ChatRouter.delete("/:chat_id",authUser, delete_chat);

/**
 * @route PATCH /api/chat/:message_id
 * @desc Update a specific message
 * @access Private
 * @param {string} message_id - The ID of the message
 * @body {content}
 * @returns {Object} - Success message
 * @example
 */
ChatRouter.patch("/:message_id",authUser, update_message);




export default ChatRouter;