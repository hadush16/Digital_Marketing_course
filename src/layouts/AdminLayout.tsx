import { Navigate, Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { Suspense } from 'react'
import PageLoader from '@/components/ui/PageLoader'
import { HiHome, HiBookOpen, HiCpuChip, HiShoppingBag, HiNewspaper, HiCog, HiUserGroup, HiEnvelope } from 'react-icons/hi2'
import { HiLogout } from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/hooks/useRedux'
import { logout } from '@/redux/slices/authSlice'
import { cn } from '@/utils'

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Guard access
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
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
      <aside className="w-64 border-r border-dark-border bg-dark-surface p-6 flex flex-col shrink-0">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-display font-black text-sm">
            R
          </div>
          <span className="font-display font-black text-lg text-white">Ryoit Admin</span>
        </Link>

        <nav className="flex-1 space-y-1.5">
          {navs.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-secondary-500/20 text-secondary-400 border border-secondary-500/30'
                    : 'text-dark-muted hover:bg-dark-border/40 hover:text-white'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors mt-auto"
        >
          <HiLogout className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-dark-border bg-dark-surface px-8 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-white">Admin Console</h2>
          <span className="badge bg-secondary-500/20 text-secondary-400 border border-secondary-500/30 font-bold text-xs">
            Administrator
          </span>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
