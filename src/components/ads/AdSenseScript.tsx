import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ADSENSE_CONFIG, isMonetizableRoute } from '@/config/adsense'

const SCRIPT_ID = 'google-adsense-script'

/**
 * AdSenseScript Component
 *
 * Dynamically mounts the official Google AdSense script in `<head>`
 * strictly when navigating to eligible public monetizable routes.
 * Prevents loading and execution on excluded paths (admin, dashboard, auth).
 */
export default function AdSenseScript() {
  const { pathname } = useLocation()

  useEffect(() => {
    const isEligible = isMonetizableRoute(pathname)

    if (!isEligible) {
      // If user navigates to an excluded area, ensure script element is removed
      const existingScript = document.getElementById(SCRIPT_ID)
      if (existingScript) {
        existingScript.remove()
      }
      return
    }

    // Check if the script is already present in document head
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = ADSENSE_CONFIG.scriptSrc
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }
  }, [pathname])

  return null
}
