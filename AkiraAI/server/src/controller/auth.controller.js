
import { mailFormate, Project_Name } from "../lib/mailFormate.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register_controller(req, res) {
  try {
    const { username, email, password } = req.body;
    const isUserExists = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserExists) {
      return res.status(400).json({
        message: "User with this email or username already exists",
        success: false,
        err: "User already exisits",
      });
    }
    const user = await UserModel.create({ username, email, password });
    /**SEND EMAIL */
    await sendEmail({
      to: email,
      subject: `Welcome to ${Project_Name} 🎉`,
      html: mailFormate(username, email, "link"),
    });
    res.json({
      message: "User Register Successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in register_controller:", error);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
  }
}
