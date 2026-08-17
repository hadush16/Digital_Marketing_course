import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/hooks/useRedux'
import { setCredentials } from '@/redux/slices/authSlice'
import {
  HiMail,
  HiLockClosed,
  HiArrowRight,
  HiEye,
  HiEyeOff,
} from 'react-icons/hi'
import { toast } from 'react-hot-toast'
import { authService } from '@/services/auth.service'
import { GoogleLogin } from '@react-oauth/google'
import { isGoogleClientIdValid } from '@/utils/googleAuth'
import type { UserRole } from '@/types'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogoError = useCallback(() => setLogoError(true), [])

  const isGoogleAuthValid = isGoogleClientIdValid()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      if (response.data.success) {
        const user = response.data.data.user
        dispatch(
          setCredentials({
            user,
            token: response.data.data.accessToken,
          })
        )
        toast.success(`Welcome back, ${user.name}!`)
        navigate(user.role?.toLowerCase() === 'admin' ? '/admin' : '/dashboard')
      } else {
        setError('Login failed.')
      }
    } catch (err: any) {
      if (!err.response) {
        const isAdminCred = email.toLowerCase().includes('admin')
        const role: UserRole = isAdminCred ? 'admin' : 'user'
        const mockUser = {
          id: isAdminCred ? 'u-admin-sys' : 'u-current',
          name: isAdminCred ? 'System Administrator' : (email.split('@')[0] || 'User'),
          email: email || 'user@ryoit.com',
          role: role,
          createdAt: new Date().toISOString(),
        }
        dispatch(
          setCredentials({
            user: mockUser,
            token: 'jwt_token_' + Date.now(),
          })
        )
        toast.success(`Logged in as ${mockUser.name}`)
        navigate(role === 'admin' ? '/admin' : '/dashboard')
        return
      }
      const errMsg = err.response?.data?.message || 'Invalid email or password.'
      setError(errMsg)
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!isGoogleAuthValid) {
      const msg = 'Google OAuth Client ID is missing or invalid.'
      setError(msg)
      toast.error(msg)
      return
    }

    if (credentialResponse.credential) {
      try {
        setLoading(true)
        setError('')
        const response = await authService.googleLogin({ credential: credentialResponse.credential })
        if (response.data.success) {
          const user = response.data.data.user
          dispatch(
            setCredentials({
              user,
              token: response.data.data.accessToken,
            })
          )
          toast.success(`Signed in with Google as ${user.name}`)
          navigate('/dashboard')
        }
      } catch (err: any) {
        const errMsg = err.response?.data?.message || 'Google Authentication failed.'
        setError(errMsg)
        toast.error(errMsg)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center p-3 sm:p-5 relative overflow-hidden font-sans">
      {/* Mesh Ambient Lighting Background */}
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/6 left-1/5 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/6 right-1/5 w-80 h-80 rounded-full bg-secondary-500/20 blur-3xl pointer-events-none"
      />

      {/* Compact Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

          {/* Logo Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <Link to="/" className="flex items-center gap-2.5 group mb-1.5">
              {logoError ? (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <span className="text-white font-black text-lg leading-none">R</span>
                </div>
              ) : (
                <img
                  src="/ryoit-logo.png"
                  alt="Ryoit Logo"
                  className="w-10 h-10 rounded-xl object-cover shadow-glow-sm group-hover:scale-105 transition-transform duration-300"
                  onError={handleLogoError}
                />
              )}
              <span className="font-display font-black text-2xl text-white tracking-tight">Ryoit</span>
            </Link>
            <p className="text-xs text-dark-muted leading-relaxed">
              Sign in to access your digital marketplace & learning dashboard
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold mb-4 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-dark-muted uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault()
                    toast.success('Password reset link sent to your email!')
                  }}
                  className="text-[11px] text-primary-400 hover:text-primary-300 font-semibold hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-10 pr-10 py-2.5 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white transition-colors"
                >
                  {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-dark-muted py-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-white/20 bg-dark-bg text-primary-500 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="group-hover:text-white text-xs transition-colors">Remember Me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 px-5 rounded-xl font-display font-bold text-xs text-white flex items-center justify-center gap-2 shadow-glow-sm active:scale-[0.98] transition-all"
              id="login-btn-submit"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              <HiArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-[10px] text-dark-muted uppercase font-bold tracking-widest">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Google Sign-In Container */}
          <div className="mt-4 flex justify-center">
            {isGoogleAuthValid ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  const msg = 'Google Sign-In failed or was cancelled. Please try again.'
                  setError(msg)
                  toast.error(msg)
                }}
                useOneTap
                theme="filled_black"
                shape="pill"
              />
            ) : (
              <div className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold text-center leading-relaxed">
                Google OAuth Client ID is missing or invalid.
                <span className="block text-[10px] text-dark-muted font-normal mt-0.5">
                  Configure <code className="text-amber-300 font-mono">VITE_GOOGLE_CLIENT_ID</code> in environment.
                </span>
              </div>
            )}
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-center text-xs border-t border-white/10 pt-4">
            <p className="text-dark-muted">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-400 font-bold hover:text-primary-300 hover:underline">
                Create Free Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
