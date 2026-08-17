/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend API base URL (no trailing slash) */
  readonly VITE_API_URL: string
  /** Google OAuth 2.0 Client ID from https://console.cloud.google.com/ */
  readonly VITE_GOOGLE_CLIENT_ID: string
  /** Optional debug flag — set to 'true' to enable verbose console logs */
  readonly VITE_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
