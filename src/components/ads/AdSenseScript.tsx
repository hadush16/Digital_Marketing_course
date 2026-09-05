import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ADSENSE_CONFIG, isMonetizableRoute } from '@/config/adsense'

const SCRIPT_PREFIX = 'google-adsense-script-'

/**
 * AdSenseScript Component
 *
 * Dynamically mounts the official Google AdSense scripts in `<head>`
 * strictly when navigating to eligible public monetizable routes.
 * Prevents loading and execution on excluded paths (admin, dashboard, auth).
 */
export default function AdSenseScript() {
  const { pathname } = useLocation()

  useEffect(() => {
    const isEligible = isMonetizableRoute(pathname)

    if (!isEligible) {
      // If user navigates to an excluded area, remove the scripts
      ADSENSE_CONFIG.publisherIds.forEach((id) => {
        const existingScript = document.getElementById(`${SCRIPT_PREFIX}${id}`)
        if (existingScript) {
          existingScript.remove()
        }
      })
      return
    }

    // Mount script for each configured publisher ID if not already present
    ADSENSE_CONFIG.publisherIds.forEach((id) => {
      const scriptId = `${SCRIPT_PREFIX}${id}`
      let script = document.getElementById(scriptId) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = scriptId
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`
        script.async = true
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)
      }
    })
  }, [pathname])

  return null
}
