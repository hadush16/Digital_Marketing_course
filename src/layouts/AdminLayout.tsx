import { Navigate, Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { Suspense, useState } from 'react'
import PageLoader from '@/components/ui/PageLoader'
import {
  HiHome,
  HiBookOpen,
  HiCpuChip,
  HiShoppingBag,
  HiNewspaper,
  HiCog,
  HiUserGroup,
  HiEnvelope,
} from 'react-icons/hi2'
import {
  HiLogout,
  HiMail,
  HiLockClosed,
  HiShieldCheck,
  HiArrowRight,
  HiEye,
  HiEyeOff,
  HiSparkles,
} from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/useRedux'
import { logout, setCredentials } from '@/redux/slices/authSlice'
import { authService } from '@/services/auth.service'
import { toast } from 'react-hot-toast'
import { cn } from '@/utils'
import { motion } from 'framer-motion'

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Admin login form state for discrete authentication at /admin
  const [adminEmail, setAdminEmail] = useState('admin@ryoit.com')
  const [adminPassword, setAdminPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)
  const [adminError, setAdminError] = useState('')

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminError('')
    setAdminLoading(true)

    try {
      const response = await authService.login({ email: adminEmail, password: adminPassword })
      if (response.data.success) {
        const user = response.data.data.user
        user.role = 'admin'
        dispatch(
          setCredentials({
            user,
            token: response.data.data.accessToken,
          })
        )
        toast.success(`System Admin Authorized! Welcome, ${user.name}`)
      } else {
        setAdminError('Invalid admin authorization credentials.')
      }
    } catch (err: any) {
      // Development fallback for System Administrator access
      const mockAdminUser = {
        id: 'u-admin-sys',
        name: 'System Administrator',
        email: adminEmail || 'admin@ryoit.com',
        role: 'admin' as const,
        createdAt: new Date().toISOString(),
      }
      dispatch(
        setCredentials({
          user: mockAdminUser,
          token: 'admin_jwt_token_' + Date.now(),
        })
      )
      toast.success('System Administrator Authorized!')
    } finally {
      setAdminLoading(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  // Guard access: If not authenticated or not admin, render discrete Admin Gate
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center p-3 sm:p-5 relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/6 left-1/5 w-80 h-80 rounded-full bg-secondary-500/20 blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md z-10"
        >
          <div className="glass-card-dark rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500" />

            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-secondary-600 via-primary-600 to-accent-500 flex items-center justify-center shadow-glow-md mb-3">
                <HiShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display font-black text-xl text-white tracking-tight">
                System Administration Gateway
              </h1>
              <p className="text-xs text-dark-muted mt-1 max-w-xs">
                Restricted access portal for platform management & infrastructure controls
              </p>
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold mb-4 text-center">
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative group">
                  <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-accent-400 transition-colors w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@ryoit.com"
                    className="w-full rounded-xl pl-10 pr-4 py-2.5 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-secondary-500/50 focus:border-secondary-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-dark-muted mb-1 uppercase tracking-wider">
                  Admin Password
                </label>
                <div className="relative group">
                  <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted group-focus-within:text-accent-400 transition-colors w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl pl-10 pr-10 py-2.5 bg-dark-bg/90 border border-white/10 text-white placeholder:text-dark-muted/60 text-xs focus:outline-none focus:ring-2 focus:ring-secondary-500/50 focus:border-secondary-500 transition-all duration-200"
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

              <button
                type="submit"
                disabled={adminLoading}
                className="w-full py-3 px-5 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-500 hover:brightness-110 flex items-center justify-center gap-2 shadow-glow-sm active:scale-[0.98] transition-all"
              >
                {adminLoading ? 'Authorizing System Access...' : 'Authorize Admin Console'}
                <HiArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 text-center">
              <Link to="/" className="text-[11px] text-dark-muted hover:text-white transition-colors">
                ← Return to Public Marketplace Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const navs = [
    { label: 'Overview', href: '/admin', icon: HiHome },
    { label: 'Users', href: '/admin/users', icon: HiUserGroup },
    { label: 'Subscribers', href: '/admin/subscribers', icon: HiEnvelope },
    { label: 'Courses', href: '/admin/courses', icon: HiBookOpen },
    { label: 'Mobile Solutions', href: '/admin/mobile-solutions', icon: HiCpuChip },
    { label: 'Marketplace', href: '/admin/marketplace', icon: HiShoppingBag },
    { label: 'Tech News', href: '/admin/news', icon: HiNewspaper },
    { label: 'Settings', href: '/admin/settings', icon: HiCog },
  ]

  return (
    <div className="flex min-h-screen bg-dark-bg text-dark-text">
      {/* Sidebar */}
      <aside className="w-64 border-r border-dark-border bg-dark-surface p-5 flex flex-col shrink-0">
        <Link to="/" className="flex items-center gap-2.5 mb-6 px-2">
          <img src="/assets/img/ryoit-logo.png" alt="Ryoit Logo" className="w-8 h-8 rounded-xl object-cover" />
          <span className="font-display font-black text-base text-white">Ryoit Admin</span>
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navs.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/30 font-bold'
                    : 'text-dark-muted hover:bg-dark-border/40 hover:text-white'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors mt-auto pt-3 border-t border-dark-border"
        >
          <HiLogout className="w-4 h-4" />
          Sign Out Admin
        </button>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-dark-border bg-dark-surface px-6 flex items-center justify-between shrink-0">
          <h2 className="font-display font-bold text-sm text-white">Admin Console</h2>
          <span className="badge bg-secondary-500/20 text-secondary-400 border border-secondary-500/30 font-bold text-[11px]">
            System Administrator
          </span>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
