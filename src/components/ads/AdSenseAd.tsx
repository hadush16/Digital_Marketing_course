import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ADSENSE_CONFIG, isMonetizableRoute, isAdminRoute } from '@/config/adsense'

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

export interface AdSenseAdProps {
  /**
   * AdSense ad slot ID (defaults to official unit 4047270762)
   */
  slotId?: string
  /**
   * Publisher client ID (defaults to ca-pub-1190706248323157)
   */
  client?: string
  /**
   * Ad format: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
   */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  /**
   * Whether the ad is full width responsive
   */
  responsive?: boolean
  /**
   * Optional custom CSS class for the wrapper container
   */
  className?: string
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties
  /**
   * Optional ad label/title for accessibility (e.g. 'Advertisement')
   */
  label?: string
}

/**
 * Production-Safe Google AdSense Ad Unit Component
 *
 * - Renders verified ad slot 4047270762 under publisher ca-pub-1190706248323157
 * - Strictly disabled on Admin (/admin/*), Dashboard (/dashboard/*), and Auth routes
 * - Prevents duplicate initialization in React StrictMode & re-renders
 * - Completely isolated from core app state (AdSense 403 / ad blocker will never crash React)
 */
export default function AdSenseAd({
  slotId = ADSENSE_CONFIG.defaultSlotId,
  client = ADSENSE_CONFIG.publisherId,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
  label = 'Advertisement',
}: AdSenseAdProps) {
  const { pathname } = useLocation()
  const insRef = useRef<HTMLModElement | null>(null)
  const isPushed = useRef(false)

  // Double-gate check: Admin and private routes must NEVER display or initialize ads
  const isEligible = !isAdminRoute(pathname) && isMonetizableRoute(pathname)

  useEffect(() => {
    if (!isEligible || isPushed.current) {
      return
    }

    // Check if element already processed by AdSense library
    if (insRef.current && insRef.current.getAttribute('data-adsbygoogle-status')) {
      isPushed.current = true
      return
    }

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        isPushed.current = true
      }
    } catch (err) {
      // Non-fatal notice: Ad blocker or pending approval will not disrupt page rendering
      console.debug('AdSense ad push notice:', err)
    }
  }, [isEligible, pathname])

  // If on admin, dashboard, auth, or low-value route, return null completely
  if (!isEligible) {
    return null
  }

  return (
    <aside
      className={`adsense-container my-6 w-full max-w-full flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
      aria-label={label}
    >
      <div className="w-full flex justify-center items-center">
        <ins
          ref={insRef}
          className="adsbygoogle block w-full text-center"
          style={{ display: 'block', minHeight: '90px', ...style }}
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  )
}
