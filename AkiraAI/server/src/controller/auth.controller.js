import { mailFormate, Project_Name } from "../lib/mailFormate.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

const JWT_Secret = process.env.JWT_SECRET;
const Base_Url = process.env.BASE_URL || "http://localhost:5000";
const cookie_secure = process.env.NODE_ENV === "production";

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_Secret, {
    expiresIn: "7d",
  });
};
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
    /**JWT */
    const emailVerificationToken = generateToken({ email: user.email });
    const link = `${Base_Url}/api/auth/verify-email?token=${emailVerificationToken}`;

    /**SEND EMAIL */
    await sendEmail({
      to: email,
      subject: `Welcome to ${Project_Name} 🎉`,
      html: mailFormate(username, email, link),
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
      error: error.message,
    });
  }
}

export async function login_controller(req, res) {
  try {
    const { password } = req.body;
    const loginInput =
      req.body.identifier || req.body.username || req.body.email;

    // 1. Find user by username or email
    const user = await UserModel.findOne({
      $or: [{ username: loginInput }, { email: loginInput }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    // 2. Check if email is verified
    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email address before logging in",
      });
    }

    // 3. Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    // 4. Generate JWT Token
    const token = generateToken({ id: user._id, email: user.email });

    // 5. Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: cookie_secure,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6. Return response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in login_controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function verifyEmailController(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
        success: false,
        err: "Token is required",
      });
    }
    const decodedToken = jwt.verify(token, JWT_Secret);

    const user = await UserModel.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    res.send(`
      <div>
        <h1>Email verified successfully</h1>
        <p>Your email has been verified successfully. You can now login to your account.</p>
        <a href="http://localhost:5000/dashboard">Login</a>
      </div>
    `);
  } catch (error) {
    console.error("Error in verifyEmailController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getMeController(req,res){
  
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({
        message:"User not found",
        success:false,
        err:"User not found",
      })
    }
    return res.status(200).json({
      success:true,
      message:"User fetched successfully",
      user: user,
    })
  } catch (error) {
    console.error("Error in getMeController:", error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message,
    })
  }
}