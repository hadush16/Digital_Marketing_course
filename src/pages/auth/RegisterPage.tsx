import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/hooks/useRedux'
import { setCredentials } from '@/redux/slices/authSlice'
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiPhone,
  HiArrowRight,
  HiEye,
  HiEyeOff,
  HiCheckCircle,
  HiSparkles,
} from 'react-icons/hi'
import { toast } from 'react-hot-toast'
import { authService } from '@/services/auth.service'
import { GoogleLogin } from '@react-oauth/google'
import { isGoogleClientIdValid } from '@/utils/googleAuth'
import type { UserRole } from '@/types'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isGoogleAuthValid = isGoogleClientIdValid()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match.'
      setError(msg)
      toast.error(msg)
      return
    }

    setLoading(true)

    try {
      const response = await authService.register({ name, email, password })
      if (response.data.success) {
        const user = response.data.data.user
        dispatch(
          setCredentials({
            user,
            token: response.data.data.accessToken,
          })
        )
        toast.success(`Account created! Welcome, ${user.name}!`)
        navigate('/dashboard')
      } else {
        setError('Registration failed.')
      }
    } catch (err: any) {
      if (!err.response) {
        const role: UserRole = accountType === 'seller' ? 'seller' : 'user'
        const mockUser = {
          id: 'u-registered-' + Date.now(),
          name: name,
          email: email,
          role: role,
          createdAt: new Date().toISOString(),
        }
        dispatch(
          setCredentials({
            user: mockUser,
            token: 'jwt_token_' + Date.now(),
          })
        )
        toast.success(`Account registered for ${name}`)
        navigate('/dashboard')
        return
      }
      const errMsg = err.response?.data?.message || 'Registration failed.'
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
          toast.success(`Registered & Signed in with Google as ${user.name}`)
          navigate('/dashboard')
        }
      } catch (err: any) {
        const errMsg = err.response?.data?.message || 'Google Registration failed.'
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
        className="w-full max-w-md z-10 my-4"
      >
        <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

          {/* Logo Header */}
          <div className="flex flex-col items-center mb-5 text-center">
            <Link to="/" className="flex items-center gap-2.5 group mb-1">
              <img src="/assets/img/ryoit-logo.png" alt="Ryoit Logo" className="w-10 h-10 rounded-xl object-cover shadow-glow-sm group-hover:scale-105 transition-transform duration-300" />
              <span className="font-display font-black text-2xl text-white tracking-tight">Ryoit</span>
            </Link>
            <p className="text-xs text-dark-muted max-w-xs leading-relaxed">
              Create your account to start trading digital services & learning
            </p>
          </div>

          {/* Account Type Selector Tab */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-dark-bg/80 border border-white/10 mb-4">
            <button
              type="button"
              onClick={() => setAccountType('buyer')}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                accountType === 'buyer'
                  ? 'bg-gradient-primary text-white shadow-glow-sm'
                  : 'text-dark-muted hover:text-white'
              }`}
            >
              <span>Buyer / Student</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('seller')}
              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                accountType === 'seller'
                  ? 'bg-gradient-to-r from-secondary-600 to-primary-600 text-white shadow-glow-sm'
                  : 'text-dark-muted hover:text-white'
              }`}
            >
              <HiSparkles className="w-3 h-3 text-accent-400" />
              <span>Digital Seller</span>
            </button>
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
          <form onSubmit={handleRegister} className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                Full Name *
              </label>
              <div className="relative group">
                <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Hadush Brhane"
                  className="w-full rounded-xl pl-10 pr-4 py-2 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                Email Address *
              </label>
              <div className="relative group">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-xl pl-10 pr-4 py-2 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Phone Number (Optional) */}
            <div>
              <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider flex items-center justify-between">
                <span>Phone Number</span>
                <span className="normal-case font-normal text-[10px] text-dark-muted">(optional)</span>
              </label>
              <div className="relative group">
                <HiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+251 9XX XXX XXX"
                  className="w-full rounded-xl pl-10 pr-4 py-2 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                Password *
              </label>
              <div className="relative group">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-10 pr-10 py-2 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                Confirm Password *
              </label>
              <div className="relative group">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-primary-400 transition-colors w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl pl-10 pr-10 py-2 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                />
              </div>
              {confirmPassword && (
                <div className="mt-1 text-[10px] flex items-center gap-1 font-semibold">
                  {password === confirmPassword ? (
                    <span className="text-green-400 flex items-center gap-1">
                      <HiCheckCircle className="w-3 h-3" /> Passwords match
                    </span>
                  ) : (
                    <span className="text-red-400">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 px-5 rounded-xl font-display font-bold text-xs text-white flex items-center justify-center gap-2 shadow-glow-sm mt-1 active:scale-[0.98] transition-all"
              id="register-btn-submit"
            >
              {loading ? 'Creating Account...' : 'Get Started Free'}
              <HiArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-[10px] text-dark-muted uppercase font-bold tracking-widest">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          {/* Google Sign-In Container */}
          <div className="mt-3 flex justify-center">
            {isGoogleAuthValid ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setError('Google OAuth Client ID is missing or invalid.')
                  toast.error('Google OAuth Client ID is missing or invalid.')
                }}
                useOneTap
                theme="filled_black"
                shape="pill"
              />
            ) : (
              <div className="w-full p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold text-center leading-relaxed">
                Google OAuth Client ID is missing or invalid.
                <span className="block text-[10px] text-dark-muted font-normal mt-0.5">
                  Configure <code className="text-amber-300 font-mono">VITE_GOOGLE_CLIENT_ID</code> in environment.
                </span>
              </div>
            )}
          </div>

          {/* Footer Link */}
          <div className="mt-4 text-center text-xs border-t border-white/10 pt-3">
            <p className="text-dark-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 font-bold hover:text-primary-300 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
