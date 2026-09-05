/**
 * Google AdSense Central Configuration
 *
 * Primary Publisher ID: ca-pub-1190706248323157
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
   * All active authorized Publisher IDs (supports multiple approved/pending AdSense accounts)
   */
  publisherIds: ['ca-pub-1190706248323157', 'ca-pub-5929508651136297'],

  /**
   * Script URLs for all configured publishers
   */
  get scriptSources(): string[] {
    return this.publisherIds.map(
      (id) => `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`
    )
  },

  /**
   * Primary script source URL
   */
  get scriptSrc(): string {
    return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.publisherId}`
  },

  /**
   * Official ads.txt seller entries
   */
  adsTxtEntries: [
    'google.com, pub-1190706248323157, DIRECT, f08c47fec0942fa0',
    'google.com, pub-5929508651136297, DIRECT, f08c47fec0942fa0',
  ],

  /**
   * Global toggle for AdSense serving (can be disabled in staging/local development via .env)
   */
  isEnabled(): boolean {
    const envVal = import.meta.env.VITE_ADSENSE_ENABLED
    if (envVal !== undefined && envVal !== null) {
      return String(envVal).toLowerCase() === 'true'
    }
    // Default to enabled in production, or if no explicit false is set
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
 * Determines whether a given route path is eligible for monetization.
 * Route-level architectural gate to strictly prevent ads on admin/dashboard/auth pages.
 */
export function isMonetizableRoute(pathname: string): boolean {
  if (!ADSENSE_CONFIG.isEnabled()) {
    return false
  }

  const normalized = (pathname || '/').trim()

  // 1. Check against excluded patterns
  for (const pattern of ADSENSE_CONFIG.excludedRoutePatterns) {
    if (pattern.test(normalized)) {
      return false
    }
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
