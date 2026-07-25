import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppDispatch } from '@/hooks/useRedux'
import { setCredentials } from '@/redux/slices/authSlice'
import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi'
import { authService } from '@/services/auth.service'
import { GoogleLogin } from '@react-oauth/google'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      if (response.data.success) {
        dispatch(
          setCredentials({
            user: response.data.data.user,
            token: response.data.data.accessToken,
          })
        )
        navigate('/')
      } else {
        setError('Login failed.')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        setLoading(true)
        const response = await authService.googleLogin({ credential: credentialResponse.credential })
        if (response.data.success) {
          dispatch(
            setCredentials({
              user: response.data.data.user,
              token: response.data.data.accessToken,
            })
          )
          navigate('/')
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Google login failed.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-secondary-500/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 border border-white/10 dark:border-dark-border shadow-2xl relative overflow-hidden">
          {/* Logo brand */}
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-display font-black text-base">R</span>
              </div>
              <span className="font-display font-black text-2xl text-white">Ryoit</span>
            </Link>
            <p className="text-xs text-dark-muted mt-2">Sign in to access your platform dashboard</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-11"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-md w-full"
              id="login-btn-submit"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              <HiArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs text-dark-muted uppercase font-bold">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Login Failed')}
              useOneTap
              theme="filled_black"
              shape="pill"
            />
          </div>

          {/* Footer info links */}
          <div className="mt-8 text-center text-xs space-y-2 border-t border-white/5 pt-6">
            <p className="text-dark-muted">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-400 font-bold hover:underline">
                Create Account
              </Link>
            </p>
            <p className="text-[10px] text-dark-muted">
              Use demo credentials: <span className="font-bold text-accent-400">admin@ryoit.com</span> / <span className="font-bold text-accent-400">admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
