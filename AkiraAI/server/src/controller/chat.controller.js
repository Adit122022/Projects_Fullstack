import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { aiMsg, genreateChatTitle } from "../services/ai.service.js";

export const send_message = async (req, res) => {
  try {
    const { message, chat: chat_id } = req.body;
    let currentChatId = chat_id;

    // 1. Create chat if it doesn't exist
    if (!currentChatId) {
      const newChat = await chatModel.create({
        title: "New Chat",
        user: req.user.id,
      });
      currentChatId = newChat._id;
    }

    // 2. Save the incoming user message FIRST
    const user_message = await messageModel.create({
      chat: currentChatId,
      content: message,
      role: "user",
    });

    // 3. Fetch all messages (now ending with the new user message)
    const history = await messageModel.find({ chat: currentChatId }).sort({ createdAt: 1 });

    // 4. Generate AI response
    const result = await aiMsg(history);

    // 5. Generate title if this was the first message
    let title = null;
    if (!chat_id) {
      title = await genreateChatTitle(message);
      await chatModel.findByIdAndUpdate(currentChatId, { title });
    }

    // 6. Save AI message
    const ai_message = await messageModel.create({
      chat: currentChatId,
      content: result,
      role: "ai",
    });

    return res.status(200).json({ 
      title, 
      chat_id: currentChatId, 
      user_message, 
      message: ai_message 
    });

  } catch (error) {
    console.error("Error in send_message:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const get_chats = async(req,res)=>{
  try {
    const user = req.user;
    const chats = await chatModel.find({user:user.id}).sort({createdAt:-1})
    res.status(200).json({message:"Chats retrieved successfully",chats})
  } catch (error) {
    console.error("Error in send_message:", error);
    return res.status(500).json({ message: error.message });
  }
}

export const get_messages = async(req,res)=>{
  try {
    const {chat_id} = req.params;
    if(!chat_id) {
      return res.status(400).json({message:"UnAuthorized access. Chat ID is required."})
    }
    const chat = await chatModel.findOne({ _id: chat_id, user: req.user.id });
    if (!chat) {
      return res.status(404).json({message:"Chat not found or access denied."});
    }
    const messages = await messageModel.find({chat:chat_id}).sort({createdAt:1});

    if(!messages || messages.length === 0) {
      return res.status(404).json({message:"No messages found for this chat."})
    } 
    res.status(200).json({message:"Messages retrieved successfully",messages})
  } catch (error) {
    console.error("Error in get_messages:", error);
    return res.status(500).json({ message: error.message });
  }
}


export const delete_chat = async(req,res)=>{
  try {
    const {chat_id} = req.params;
    if(!chat_id) {
      return res.status(400).json({message:"UnAuthorized access. Chat ID is required."})
    }
    const chat = await chatModel.findOne({ _id: chat_id, user: req.user.id });
    if (!chat) {
      return res.status(404).json({message:"Chat not found or access denied."});
    }
    await chatModel.findByIdAndDelete(chat_id);
    await messageModel.deleteMany({ chat: chat_id });
    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (error) {
      console.error("Error in delete_chat:", error);
      return res.status(500).json({ message: error.message });
    }
  }



export const update_message = async (req, res) => {
  try {
    const { message_id } = req.params;
    const { content } = req.body;

    if (!message_id || !content?.trim()) {
      return res.status(400).json({ message: "Message ID and valid content are required." });
    }

    // 1. Fetch target message & verify chat ownership in a SINGLE query via populate
    const targetMessage = await messageModel.findById(message_id);
    if (!targetMessage || targetMessage.role !== "user") {
      return res.status(404).json({ message: "User message not found." });
    }

    const chat = await chatModel.findOne({ _id: targetMessage.chat, user: req.user.id }).lean();
    if (!chat) {
      return res.status(403).json({ message: "Access denied." });
    }

    // 2. Fetch history BEFORE deletion to build prompt in memory (Optimized Query)
    const previousMessages = await messageModel.find({
      chat: chat._id,
      createdAt: { $lt: targetMessage.createdAt }
    }).sort({ createdAt: 1 }).lean();

    // Prepare updated history array in memory for the LLM call
    const updatedHistory = [
      ...previousMessages,
      { role: "user", content: content }
    ];

    // 3. Call AI service FIRST (If LLM fails, DB remains untouched!)
    const newAiContent = await aiMsg(updatedHistory);

    // 4. Perform DB Cleanup & Updates concurrently via Promise.all
    const [updatedUserMsg, newAiMsg] = await Promise.all([
      // Delete subsequent messages & update target in parallel
      messageModel.deleteMany({
        chat: chat._id,
        createdAt: { $gt: targetMessage.createdAt }
      }).then(() => 
        messageModel.findByIdAndUpdate(
          message_id, 
          { content }, 
          { new: true }
        )
      ),
      
      // Create new AI message
      messageModel.create({
        chat: chat._id,
        content: newAiContent,
        role: "ai",
      })
    ]);

    return res.status(200).json({
      message: "Message updated and regenerated successfully.",
      user_message: updatedUserMsg,
      ai_message: newAiMsg,
    });

  } catch (error) {
    console.error("Error in update_message:", error);
    return res.status(500).json({ message: error.message });
  }
};