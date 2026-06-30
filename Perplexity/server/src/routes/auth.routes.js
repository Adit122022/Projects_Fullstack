import {Router} from 'express'
import { register_controller } from '../controller/auth.controller.js';
import { registerValidator } from '../../validators/auth.validators.js';

const AuthRouter = Router()
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username , email , password }
 */
AuthRouter.post("/register",registerValidator, register_controller)


export default AuthRouter