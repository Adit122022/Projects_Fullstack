import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validators.js";
import {
  getMeController,
  login_controller,
  logout_controller,
  register_controller,
  verifyEmailController,
  forgotPassword_controller,
  resetPassword_controller,
} from "../controller/auth.controller.js";
import {authUser} from "../middlewares/auth.middleware.js";
const AuthRouter = Router();
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username , email , password }
 */
AuthRouter.post("/register", registerValidator, register_controller);

/**
 * @route POST /api/auth/login
 * @desc Login a exisiting User
 * @access Public
 * @body {username or email , password}
 */
AuthRouter.post('/login',loginValidator,login_controller)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify email
 * @access Public
 * @query {token}
 */
AuthRouter.get("/verify-email", verifyEmailController);

/**
 * @route GET /api/auth/me
 * @desc Get current logged in  user
 * @access Private
 */
AuthRouter.get("/me", authUser, getMeController);

/**
 * @route POST /api/auth/logout
 * @desc Logout the current user by clearing the auth cookie
 * @access Private
 */
AuthRouter.post("/logout", authUser, logout_controller);

/**
 * @route POST /api/auth/forgot-password
 * @desc Send a password reset link to the provided email
 * @access Public
 * @body { email }
 */
AuthRouter.post("/forgot-password", forgotPassword_controller);

/**
 * @route POST /api/auth/reset-password
 * @desc Reset user password using the reset token from the email link
 * @access Public
 * @body { token, newPassword }
 */
AuthRouter.post("/reset-password", resetPassword_controller);

export default AuthRouter;
