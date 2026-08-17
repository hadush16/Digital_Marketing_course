// ============================================
// RYOIT PLATFORM — GOOGLE OAUTH AUDIT & UTILITY
// ============================================

export interface GoogleAuthAuditResult {
  rawClientId: string
  sanitizedClientId: string
  isValid: boolean
  isPlaceholder: boolean
  envMode: string
  apiUrl: string
  errorMessage: string | null
}

/**
 * Hardcoded fallback Web OAuth Client ID.
 * Used when VITE_GOOGLE_CLIENT_ID is not defined in the environment
 * (e.g. a host environment without the variable configured).
 * The env variable always takes priority over this value.
 */
const FALLBACK_GOOGLE_CLIENT_ID =
  '853536644056-goqjj7s2olijf7ffrqbb4nkrg04nq744.apps.googleusercontent.com'

const PLACEHOLDER_PATTERNS = [
  'placeholder_client_id',
  'your-google-client-id-here',
  'your_google_client_id',
  'your-client-id',
  'xxx',
  'undefined',
  'null',
]

/**
 * Retrieves and sanitizes the configured Google OAuth Client ID.
 * Falls back to the hardcoded FALLBACK_GOOGLE_CLIENT_ID when the
 * VITE_GOOGLE_CLIENT_ID environment variable is absent or empty.
 */
export function getGoogleClientId(): string {
  const envVal = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const raw = (envVal && typeof envVal === 'string' ? envVal : '') || FALLBACK_GOOGLE_CLIENT_ID

  // Trim surrounding quotes and whitespace
  const cleaned = raw.trim().replace(/^["']|["']$/g, '')
  return cleaned
}

/**
 * Validates whether the configured Google Client ID is valid and non-placeholder
 */
export function isGoogleClientIdValid(): boolean {
  const clientId = getGoogleClientId()
  if (!clientId) return false

  const lower = clientId.toLowerCase()
  const isPlaceholder = PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern))
  if (isPlaceholder) return false

  // Google OAuth client IDs typically end with .apps.googleusercontent.com
  // and are at least 25 characters long.
  const hasValidFormat = clientId.includes('.apps.googleusercontent.com') || clientId.length >= 25
  return hasValidFormat
}

/**
 * Gets developer-friendly error message if Client ID is invalid
 */
export function getGoogleClientIdError(): string {
  if (isGoogleClientIdValid()) return ''
  
  const raw = getGoogleClientId()
  if (!raw) {
    return 'Google OAuth Client ID is missing or invalid.'
  }
  return `Google OAuth Client ID is missing or invalid. (Current value: "${raw.slice(0, 15)}...")`
}

/**
 * Performs a complete diagnostic audit of Google OAuth configuration
 */
export function auditGoogleOAuth(): GoogleAuthAuditResult {
  const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || `(fallback) ${FALLBACK_GOOGLE_CLIENT_ID}`
  const sanitized = getGoogleClientId()
  const isValid = isGoogleClientIdValid()
  const lower = sanitized.toLowerCase()
  const isPlaceholder = PLACEHOLDER_PATTERNS.some((p) => lower.includes(p))
  const envMode = import.meta.env.MODE || 'unknown'
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  let errorMessage: string | null = null
  if (!sanitized) {
    errorMessage = 'VITE_GOOGLE_CLIENT_ID is empty or missing in environment variables.'
  } else if (isPlaceholder) {
    errorMessage = `VITE_GOOGLE_CLIENT_ID contains placeholder value ("${sanitized}").`
  } else if (!isValid) {
    errorMessage = 'VITE_GOOGLE_CLIENT_ID does not appear to be a valid Google OAuth Client ID.'
  }

  // Developer console logging in development or debug mode
  if (import.meta.env.DEV || import.meta.env.VITE_DEBUG === 'true') {
    console.group('🔍 [Google OAuth Configuration Audit]')
    console.log('Environment Mode:', envMode)
    console.log('API Base URL:', apiUrl)
    console.log(
      'VITE_GOOGLE_CLIENT_ID (env):',
      import.meta.env.VITE_GOOGLE_CLIENT_ID
        ? `"${import.meta.env.VITE_GOOGLE_CLIENT_ID.slice(0, 12)}..."`
        : '(not set — using hardcoded fallback)',
    )
    console.log('Resolved Client ID:', `${sanitized.slice(0, 20)}...apps.googleusercontent.com`)
    console.log('Is Valid Client ID:', isValid ? '✅ YES' : '❌ NO')
    console.log('Is Placeholder:', isPlaceholder ? '⚠️ YES' : '✅ NO')
    console.log('Auth SDK:', '@react-oauth/google (Google Identity Services GSI)')
    
    if (!isValid) {
      console.warn('⚠️ Google OAuth Warning:', errorMessage)
      console.warn(
        '👉 FIX: Set a valid VITE_GOOGLE_CLIENT_ID in .env or your host environment (Netlify / Vercel / Render).',
      )
      console.warn('👉 Google Console: https://console.cloud.google.com/apis/credentials')
    } else {
      console.log('✨ Google OAuth initialized successfully.')
    }
    console.groupEnd()
  }

  return {
    rawClientId,
    sanitizedClientId: sanitized,
    isValid,
    isPlaceholder,
    envMode,
    apiUrl,
    errorMessage,
  }
}
