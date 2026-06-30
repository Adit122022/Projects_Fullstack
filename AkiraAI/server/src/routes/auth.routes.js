import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validators.js";
import {
  getMeController,
    login_controller,
  register_controller,
  verifyEmailController,
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
export default AuthRouter;
