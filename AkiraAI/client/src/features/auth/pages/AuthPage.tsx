import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import {
  User as UserIcon, Mail, Lock, Eye, EyeOff,
  CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import type { LoginInputs, RegisterInputs } from '../types/auth.types'
import { loginSchema, registerSchema } from '../types/auth.types'
import { login, register as registerUser } from '../services/auth.api'
import loginVisual from '../../../assets/login_visual.png'
import registerVisual from '../../../assets/register_visual.png'

interface AuthPageProps {
  mode: 'login' | 'register'
}

// ─── Framer Motion Variants ────────────────────────────────────────────────────

/** The dark visual side-panel slides in/out from left/right */
const panelVariants = {
  loginPos: { x: '0%' },
  registerPos: { x: '100%' },
}

/** Form sheets slide + fade in from opposite direction */
const formVariants = {
  hiddenLeft:  { opacity: 0, x: -40, scale: 0.97 },
  hiddenRight: { opacity: 0, x:  40, scale: 0.97 },
  visible:     { opacity: 1, x:   0, scale: 1 },
}

const spring = { type: 'spring', stiffness: 320, damping: 32 }
const easeOut = { duration: 0.45, ease: [0.25, 1, 0.5, 1] as const }

// ─── Google Icon ───────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

// ─── Reusable Divider ──────────────────────────────────────────────────────────
const OrDivider = ({ label }: { label: string }) => (
  <div className="relative my-4">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-[#CBCBCB]/60" />
    </div>
    <div className="relative flex justify-center">
      <span
        className="bg-[#FFFFE3] px-2.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: '#6D8196', fontFamily: "'Geist', sans-serif" }}
      >
        {label}
      </span>
    </div>
  </div>
)

// ─── Main Component ────────────────────────────────────────────────────────────
const AuthPage = ({ mode }: AuthPageProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [errorMsg, setErrorMsg]         = useState<string | null>(null)
  const [successMsg, setSuccessMsg]     = useState<string | null>(null)
  const prevMode                        = useRef(mode)

  useEffect(() => {
    setErrorMsg(null)
    setSuccessMsg(null)
    setShowPassword(false)
    prevMode.current = mode
  }, [mode])

  // ─── Login Form ─────────────────────────────────────────────────────────────
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  })

  // ─── Register Form ───────────────────────────────────────────────────────────
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    setError: setSignUpError,
    formState: { errors: signUpErrors },
    reset: resetSignUpForm,
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '' },
  })

  const onLoginSubmit = async (data: LoginInputs) => {
    setLoading(true); setErrorMsg(null)
    try {
      const res = await login(data)
      setSuccessMsg(`Welcome back, ${res.user?.username || 'User'}! 🎉`)
      resetLoginForm()
    } catch (err: unknown) {
      setErrorMsg((err as { message?: string })?.message ?? 'Failed to authenticate.')
    } finally { setLoading(false) }
  }

  const onSignUpSubmit = async (data: RegisterInputs) => {
    setLoading(true); setErrorMsg(null)
    try {
      const res = await registerUser(data)
      setSuccessMsg(res.message ?? 'Check your email to verify your account.')
      resetSignUpForm()
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: { path: string; msg: string }[] }
      e?.errors?.forEach(({ path, msg }) => {
        if (path === 'username' || path === 'email' || path === 'password') {
          setSignUpError(path, { message: msg })
        }
      })
      setErrorMsg(e?.message ?? 'Failed to register account.')
    } finally { setLoading(false) }
  }

  const isLogin = mode === 'login'

  // Determine slide direction based on mode change
  const comingFromLeft = isLogin  // login enters from left, register from right

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex"
      style={{ background: '#FFFFE3', fontFamily: "'Geist', ui-sans-serif, sans-serif" }}
    >
      {/* ── Soft ambient glows ─────────────────────────────────────── */}
      <div className="absolute top-[-20%] left-[-20%] w-[55%] h-[55%] rounded-full pointer-events-none"
        style={{ background: '#6D8196', opacity: 0.07, filter: 'blur(130px)' }} />
      <div className="absolute bottom-[-20%] right-[-20%] w-[55%] h-[55%] rounded-full pointer-events-none"
        style={{ background: '#4A4A4A', opacity: 0.05, filter: 'blur(130px)' }} />

      {/* ══════════════════════════════════════════════════════════════
          1.  DARK VISUAL PANEL  — slides left ↔ right via spring
          ══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 bottom-0 w-1/2 hidden md:flex flex-col justify-between overflow-hidden z-20 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #4A4A4A 0%, #2D2D2D 100%)' }}
        variants={panelVariants}
        animate={isLogin ? 'loginPos' : 'registerPos'}
        transition={spring}
      >
        {/* Logo */}
        <div className="p-10 pb-0 flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6D8196] to-white flex items-center justify-center font-black text-lg text-[#4A4A4A]"
            style={{ fontFamily: "'GeistPixel', monospace" }}>
            A
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: '#FFFFE3' }}>AkiraAI</span>
        </div>

        {/* Animated inner content */}
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login-visual"
                className="absolute inset-0 px-10 py-8 flex flex-col justify-center items-center text-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={easeOut}
              >
                <div className="w-60 h-60 lg:w-68 lg:h-68 rounded-2xl overflow-hidden shadow-2xl mb-7 border border-white/10">
                  <img src={loginVisual} alt="Login Visual" className="w-full h-full object-cover" />
                </div>
                <h2
                  className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2"
                  style={{ color: '#FFFFE3', fontFamily: "'GeistPixel', monospace" }}
                >
                  Manage your AI Agents
                </h2>
                <p className="text-sm leading-relaxed max-w-xs px-2" style={{ color: '#CBCBCB' }}>
                  Connect and coordinate multi-agent workflows inside AkiraAI.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register-visual"
                className="absolute inset-0 px-10 py-8 flex flex-col justify-center items-center text-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={easeOut}
              >
                <div className="w-60 h-60 lg:w-68 lg:h-68 rounded-2xl overflow-hidden shadow-2xl mb-7 border border-white/10">
                  <img src={registerVisual} alt="Register Visual" className="w-full h-full object-cover" />
                </div>
                <h2
                  className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2"
                  style={{ color: '#FFFFE3', fontFamily: "'GeistPixel', monospace" }}
                >
                  Unlock Agent Workforces
                </h2>
                <p className="text-sm leading-relaxed max-w-xs px-2" style={{ color: '#CBCBCB' }}>
                  Deploy custom AI subagents to automate your daily operations.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-10 pt-0 text-xs relative z-10" style={{ color: 'rgba(203,203,203,0.6)' }}>
          © 2026 AkiraAI Inc. All rights reserved.
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          2.  FORM PANEL  — slides in opposite direction
          ══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-0 bottom-0 w-full md:w-1/2 flex flex-col justify-center overflow-hidden z-10"
        style={{ background: '#FFFFE3' }}
        variants={{
          loginPos:    { x: '100%' },
          registerPos: { x: '0%' },
        }}
        animate={isLogin ? 'loginPos' : 'registerPos'}
        transition={spring}
      >
        {/* Top bar: logo (mobile) + toggle button */}
        <div className="absolute top-7 left-7 right-7 flex items-center justify-between z-30">
          <span
            className="md:hidden font-extrabold text-xl tracking-tight"
            style={{ color: '#4A4A4A', fontFamily: "'GeistPixel', monospace" }}
          >
            AkiraAI
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-medium hidden sm:inline" style={{ color: 'rgba(74,74,74,0.65)' }}>
              {isLogin ? 'New user?' : 'Already registered?'}
            </span>
            <Link to={isLogin ? '/register' : '/login'}>
              <Button
                variant="outline"
                className="border-[#6D8196]/80 hover:bg-[#6D8196]/10 h-8 px-3 text-xs font-semibold rounded-full flex items-center gap-1 active:scale-95 cursor-pointer"
                style={{ color: '#4A4A4A' }}
              >
                {isLogin ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Forms wrapper — AnimatePresence handles cross-fade + slide ── */}
        <div className="relative w-full h-[85%] px-6 sm:px-12 md:px-16 lg:px-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              /* ─────────────── LOGIN FORM ─────────────────────────── */
              <motion.div
                key="login-form"
                className="w-full max-w-sm flex flex-col justify-center"
                initial={comingFromLeft ? formVariants.hiddenLeft : formVariants.hiddenRight}
                animate={formVariants.visible}
                exit={comingFromLeft ? formVariants.hiddenRight : formVariants.hiddenLeft}
                transition={easeOut}
              >
                {/* Heading */}
                <div className="mb-6">
                  <h3
                    className="text-3xl font-extrabold tracking-tight"
                    style={{ color: '#4A4A4A', fontFamily: "'GeistPixel', monospace" }}
                  >
                    Sign In
                  </h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: '#6D8196' }}>
                    Enter your credentials to continue
                  </p>
                </div>

                {successMsg ? (
                  <div className="space-y-4 py-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-1"
                      style={{ background: 'rgba(109,129,150,0.1)', color: '#6D8196' }}>
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#4A4A4A', fontFamily: "'GeistPixel', monospace" }}>
                      Success!
                    </h4>
                    <p className="text-sm" style={{ color: '#4A4A4A' }}>{successMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
                    {errorMsg && (
                      <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="login-identifier"
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                      >
                        Email or Username
                      </Label>
                      <Input
                        id="login-identifier"
                        type="text"
                        placeholder="you@example.com"
                        icon={<Mail className="w-4 h-4" style={{ color: '#6D8196' }} />}
                        error={loginErrors.identifier?.message}
                        className="border-[#CBCBCB] hover:border-[#6D8196]/70 focus-visible:ring-[#6D8196] bg-white h-10 rounded-xl"
                        style={{ color: '#2D2D2D', fontFamily: "'Geist', sans-serif" }}
                        {...registerLogin('identifier')}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="login-password"
                          className="text-[11px] font-bold uppercase tracking-widest"
                          style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                        >
                          Password
                        </Label>
                        <a href="#" className="text-[11px] font-semibold hover:underline" style={{ color: '#6D8196' }}>
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          icon={<Lock className="w-4 h-4" style={{ color: '#6D8196' }} />}
                          error={loginErrors.password?.message}
                          className="border-[#CBCBCB] hover:border-[#6D8196]/70 focus-visible:ring-[#6D8196] bg-white pr-10 h-10 rounded-xl"
                          style={{ color: '#2D2D2D', fontFamily: "'Geist', sans-serif" }}
                          {...registerLogin('password')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(p => !p)}
                          className="absolute right-3 top-[10px] transition-colors focus:outline-none cursor-pointer"
                          style={{ color: '#6D8196' }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      loading={loading}
                      className="w-full shadow-md active:scale-[0.98] rounded-full h-10 mt-1 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all"
                      style={{
                        background: '#6D8196',
                        color: '#FFFFE3',
                        fontFamily: "'Geist', sans-serif"
                      }}
                    >
                      Sign In
                    </Button>
                  </form>
                )}

                {!successMsg && (
                  <>
                    <OrDivider label="Or continue with" />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-[#CBCBCB] hover:bg-[#CBCBCB]/15 rounded-full h-10 flex items-center justify-center font-semibold text-xs cursor-pointer active:scale-[0.98] transition-all"
                      style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                    >
                      <GoogleIcon />
                      Google Workspace
                    </Button>
                  </>
                )}
              </motion.div>
            ) : (
              /* ─────────────── REGISTER FORM ──────────────────────── */
              <motion.div
                key="register-form"
                className="w-full max-w-sm flex flex-col justify-center"
                initial={formVariants.hiddenRight}
                animate={formVariants.visible}
                exit={formVariants.hiddenLeft}
                transition={easeOut}
              >
                {/* Heading */}
                <div className="mb-4">
                  <h3
                    className="text-3xl font-extrabold tracking-tight"
                    style={{ color: '#4A4A4A', fontFamily: "'GeistPixel', monospace" }}
                  >
                    Create Account
                  </h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: '#6D8196' }}>
                    Register your developer account to begin
                  </p>
                </div>

                {successMsg ? (
                  <div className="space-y-4 py-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-1"
                      style={{ background: 'rgba(109,129,150,0.1)', color: '#6D8196' }}>
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#4A4A4A', fontFamily: "'GeistPixel', monospace" }}>
                      Account Created!
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>{successMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSignUpSubmit(onSignUpSubmit)} className="space-y-3">
                    {errorMsg && (
                      <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <div className="space-y-1">
                      <Label
                        htmlFor="register-username"
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                      >
                        Username
                      </Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="johndoe"
                        icon={<UserIcon className="w-4 h-4" style={{ color: '#6D8196' }} />}
                        error={signUpErrors.username?.message}
                        className="border-[#CBCBCB] hover:border-[#6D8196]/70 focus-visible:ring-[#6D8196] bg-white h-10 rounded-xl"
                        style={{ color: '#2D2D2D', fontFamily: "'Geist', sans-serif" }}
                        {...registerSignUp('username')}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="register-email"
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                      >
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="name@example.com"
                        icon={<Mail className="w-4 h-4" style={{ color: '#6D8196' }} />}
                        error={signUpErrors.email?.message}
                        className="border-[#CBCBCB] hover:border-[#6D8196]/70 focus-visible:ring-[#6D8196] bg-white h-10 rounded-xl"
                        style={{ color: '#2D2D2D', fontFamily: "'Geist', sans-serif" }}
                        {...registerSignUp('email')}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="register-password"
                        className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          icon={<Lock className="w-4 h-4" style={{ color: '#6D8196' }} />}
                          error={signUpErrors.password?.message}
                          className="border-[#CBCBCB] hover:border-[#6D8196]/70 focus-visible:ring-[#6D8196] bg-white pr-10 h-10 rounded-xl"
                          style={{ color: '#2D2D2D', fontFamily: "'Geist', sans-serif" }}
                          {...registerSignUp('password')}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(p => !p)}
                          className="absolute right-3 top-[10px] transition-colors focus:outline-none cursor-pointer"
                          style={{ color: '#6D8196' }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      loading={loading}
                      className="w-full shadow-md active:scale-[0.98] rounded-full h-10 mt-1 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all"
                      style={{
                        background: '#6D8196',
                        color: '#FFFFE3',
                        fontFamily: "'Geist', sans-serif"
                      }}
                    >
                      Create Account
                    </Button>
                  </form>
                )}

                {!successMsg && (
                  <>
                    <OrDivider label="Or register with" />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-[#CBCBCB] hover:bg-[#CBCBCB]/15 rounded-full h-10 flex items-center justify-center font-semibold text-xs cursor-pointer active:scale-[0.98] transition-all"
                      style={{ color: '#4A4A4A', fontFamily: "'Geist', sans-serif" }}
                    >
                      <GoogleIcon />
                      Google Workspace
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthPage
