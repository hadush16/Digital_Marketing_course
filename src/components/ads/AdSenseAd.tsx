import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ADSENSE_CONFIG, isMonetizableRoute } from '@/config/adsense'

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

interface AdSenseAdProps {
  /**
   * AdSense ad slot ID (if assigned in AdSense dashboard for fixed manual units)
   */
  slotId?: string
  /**
   * Ad format: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
   * Defaults to 'auto'
   */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  /**
   * Whether the ad is full width responsive (data-full-width-responsive)
   */
  responsive?: boolean
  /**
   * Optional custom CSS class for the wrapper container
   */
  className?: string
  /**
   * Inline style overrides for the wrapper or ins tag
   */
  style?: React.CSSProperties
}

/**
 * AdSenseAd Component
 *
 * Safe, responsive Google AdSense ad slot component.
 * Automatically respects route monetization rules and avoids double-initialization.
 */
export default function AdSenseAd({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  style = {},
}: AdSenseAdProps) {
  const { pathname } = useLocation()
  const adRef = useRef<HTMLModElement | null>(null)
  const isPushed = useRef(false)

  const isEligible = isMonetizableRoute(pathname)

  useEffect(() => {
    if (!isEligible || isPushed.current) {
      return
    }

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        isPushed.current = true
      }
    } catch (err) {
      // Catch duplicate push or script initialization errors cleanly
      console.debug('AdSense initialization notice:', err)
    }
  }, [isEligible, pathname])

  if (!isEligible) {
    return null
  }

  return (
    <div
      className={`adsense-wrapper my-6 flex justify-center items-center overflow-hidden min-h-[90px] ${className}`}
      aria-label="Advertisement"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        {...(slotId ? { 'data-ad-slot': slotId } : {})}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
