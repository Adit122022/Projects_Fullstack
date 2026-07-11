import axios from 'axios'
import type {
  AuthResponse,
  LoginInputs,
  RegisterInputs,
  ForgotPasswordInputs,
  ResetPasswordInputs,
} from '../types/auth.types'

// ─── Axios Instance ────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true, // send/receive HttpOnly cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Response Interceptor ──────────────────────────────────────────────────────
// Unwrap axios response so callers always get AuthResponse directly.
// On HTTP error, re-throw the backend JSON payload so callers can read .message / .errors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendData: AuthResponse | undefined = error.response?.data
    if (backendData) {
      return Promise.reject(backendData)
    }
    return Promise.reject({
      success: false,
      message: error.message || 'Network error — please check your connection.',
    } satisfies AuthResponse)
  },
)

// ─── Auth API Functions ────────────────────────────────────────────────────────

/**
 * POST /api/auth/login
 * Accepts username OR email via the `identifier` field.
 * On success the server sets an HttpOnly `token` cookie.
 */
export const login = async (data: LoginInputs): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/login', data)
  return res.data
}

/**
 * POST /api/auth/register
 * Registers a new user and sends a verification email.
 */
export const register = async (data: RegisterInputs): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/register', data)
  return res.data
}

/**
 * POST /api/auth/logout
 * Clears the auth cookie on the server side. Requires a valid session.
 */
export const logout = async (): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/logout')
  return res.data
}

/**
 * GET /api/auth/me
 * Returns the currently authenticated user. Requires a valid session cookie.
 */
export const getMe = async (): Promise<AuthResponse> => {
  const res = await api.get<AuthResponse>('/me')
  return res.data
}

/**
 * POST /api/auth/forgot-password
 * Sends a password reset link to the provided email address.
 * Always responds with success to prevent email enumeration.
 */
export const forgotPassword = async (data: ForgotPasswordInputs): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/forgot-password', data)
  return res.data
}

/**
 * POST /api/auth/reset-password
 * Resets the user's password using the token sent via email.
 * @param data - { token: string, newPassword: string, confirmPassword: string }
 */
export const resetPassword = async (data: ResetPasswordInputs): Promise<AuthResponse> => {
  // Only send token + newPassword to the server (confirmPassword is client-side only)
  const { token, newPassword } = data
  const res = await api.post<AuthResponse>('/reset-password', { token, newPassword })
  return res.data
}