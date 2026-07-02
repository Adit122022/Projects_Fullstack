import { z } from "zod";

// ─── Entity Types ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  username: string;
  email: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ─── API Response Types ─────────────────────────────────────────────────────────

/** Validation error returned by express-validator on the backend */
export interface ValidationError {
  type?: string;
  value?: string;
  msg: string;
  path: string;
  location?: string;
}

/** Standard API response envelope from the backend */
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  err?: string;
  errors?: ValidationError[];
}

// ─── Zod Schemas ───────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Username or Email is required"),
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z.object({
  username: z.string()
    .trim()
    .min(3, "Username must be between 3 and 30 characters")
    .max(30, "Username must be between 3 and 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .trim()
    .min(1, "E-mail is required")
    .email("Please provide a valid E-mail"),
  password: z.string()
    .min(6, "Password must be at least 6 characters"),
})

export const forgotPasswordSchema = z.object({
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid E-mail"),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string()
    .min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

// ─── Inferred Input Types ───────────────────────────────────────────────────────

export type LoginInputs = z.infer<typeof loginSchema>
export type RegisterInputs = z.infer<typeof registerSchema>
export type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>
