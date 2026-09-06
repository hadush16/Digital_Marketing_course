/**
 * Google AdSense Central Configuration
 *
 * Official Publisher ID: ca-pub-1190706248323157
 * Official Ad Slot ID: 4047270762
 * Additional Publisher ID: ca-pub-5929508651136297
 *
 * Authorized ads.txt:
 * - google.com, pub-1190706248323157, DIRECT, f08c47fec0942fa0
 * - google.com, pub-5929508651136297, DIRECT, f08c47fec0942fa0
 */

export const ADSENSE_CONFIG = {
  /**
   * Primary Publisher ID
   */
  publisherId: (import.meta.env.VITE_ADSENSE_PUBLISHER_ID as string) || 'ca-pub-1190706248323157',

  /**
   * Default verified ad slot unit
   */
  defaultSlotId: '4047270762',

  /**
   * All active authorized Publisher IDs
   */
  publisherIds: ['ca-pub-1190706248323157', 'ca-pub-5929508651136297'],

  /**
   * Official ads.txt seller entries
   */
  adsTxtEntries: [
    'google.com, pub-1190706248323157, DIRECT, f08c47fec0942fa0',
    'google.com, pub-5929508651136297, DIRECT, f08c47fec0942fa0',
  ],

  /**
   * Global toggle for AdSense serving
   */
  isEnabled(): boolean {
    const envVal = import.meta.env.VITE_ADSENSE_ENABLED
    if (envVal !== undefined && envVal !== null) {
      return String(envVal).toLowerCase() === 'true'
    }
    return true
  },

  /**
   * Route patterns that must NEVER load or display Google AdSense ads.
   * Covers admin, dashboard, auth, checkout, internal tools, and sensitive screens.
   */
  excludedRoutePatterns: [
    /^\/admin(\/.*)?$/i,
    /^\/administrator(\/.*)?$/i,
    /^\/dashboard(\/.*)?$/i,
    /^\/manage(\/.*)?$/i,
    /^\/settings(\/.*)?$/i,
    /^\/account(\/.*)?$/i,
    /^\/profile(\/.*)?$/i,
    /^\/login$/i,
    /^\/register$/i,
    /^\/forgot-password$/i,
    /^\/reset-password$/i,
    /^\/checkout(\/.*)?$/i,
    /^\/payment(\/.*)?$/i,
    /^\/auth(\/.*)?$/i,
    /^\/api(\/.*)?$/i,
  ],

  /**
   * Public content route patterns that are eligible for AdSense Auto Ads and ad units.
   */
  eligiblePublicPrefixes: [
    '/',
    '/courses',
    '/mobile-solutions',
    '/marketplace',
    '/news',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/community',
    '/opportunities',
    '/social-media-services',
    '/services',
  ],
}

/**
 * Helper to check if current route belongs to admin/dashboard/auth areas.
 */
export function isAdminRoute(pathname: string): boolean {
  const normalized = (pathname || '/').trim()
  return ADSENSE_CONFIG.excludedRoutePatterns.some((pattern) => pattern.test(normalized))
}

/**
 * Determines whether a given route path is eligible for monetization.
 * Route-level architectural gate strictly preventing ads on admin/dashboard/auth pages.
 */
export function isMonetizableRoute(pathname: string): boolean {
  if (!ADSENSE_CONFIG.isEnabled()) {
    return false
  }

  const normalized = (pathname || '/').trim()

  // 1. Check against excluded patterns
  if (isAdminRoute(normalized)) {
    return false
  }

  // 2. Check if route is within public areas
  const isPublicRoute = ADSENSE_CONFIG.eligiblePublicPrefixes.some((prefix) => {
    if (prefix === '/') {
      return normalized === '/'
    }
    return normalized === prefix || normalized.startsWith(`${prefix}/`)
  })

  return isPublicRoute
}
