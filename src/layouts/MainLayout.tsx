import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, Suspense } from 'react'
import PageLoader from '@/components/ui/PageLoader'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function MainLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
