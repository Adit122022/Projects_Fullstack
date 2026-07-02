import { mailFormate, Project_Name } from "../lib/mailFormate.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

const JWT_Secret = process.env.JWT_SECRET;
const Base_Url = process.env.BASE_URL || "http://localhost:5000";
const frontend_URL = process.env.FRONTEND_URL || "http://localhost:5173";
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
        <a href="${frontend_URL}/login">Login</a>
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

export async function getMeController(req, res) {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        err: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error in getMeController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @route POST /api/auth/logout
 * @desc Clear the auth cookie to log the user out
 * @access Private
 */
export async function logout_controller(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: cookie_secure,
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout_controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @route POST /api/auth/forgot-password
 * @desc Send a password reset link to the user's email
 * @access Public
 * @body { email }
 */
export async function forgotPassword_controller(req, res) {
  try {
    const { email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });

    // Always respond with success to avoid email enumeration attacks
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a password reset link has been sent.",
      });
    }

    const resetToken = generateToken({ id: user._id, email: user.email, purpose: "reset" });
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: email,
      subject: `${Project_Name} – Password Reset Request`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:40px;background:#f4f4f7;border-radius:12px;">
          <h2 style="color:#4A4A4A;">Password Reset</h2>
          <p style="color:#4B5563;">We received a request to reset the password for your <strong>${Project_Name}</strong> account.</p>
          <p style="color:#4B5563;">Click the button below to reset your password. This link will expire in <strong>1 hour</strong>.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetLink}" style="background:#6D8196;color:#FFFFE3;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;">Reset Password</a>
          </div>
          <p style="color:#6B7280;font-size:14px;">Or copy and paste this link:<br><a href="${resetLink}" style="color:#6D8196;word-break:break-all;">${resetLink}</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
          <p style="color:#9CA3AF;font-size:12px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "If that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Error in forgotPassword_controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @route POST /api/auth/reset-password
 * @desc Verify reset token and update the user's password
 * @access Public
 * @body { token, newPassword }
 */
export async function resetPassword_controller(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_Secret);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    if (decoded.purpose !== "reset") {
      return res.status(400).json({
        success: false,
        message: "Invalid token purpose",
      });
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = newPassword; // pre-save hook will bcrypt this
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error in resetPassword_controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}