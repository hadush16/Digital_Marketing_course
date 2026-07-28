import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { getGoogleClientId, isGoogleClientIdValid } from '@/utils/googleAuth'

interface GoogleOAuthWrapperProps {
  children: React.ReactNode
}

export default function GoogleOAuthWrapper({ children }: GoogleOAuthWrapperProps) {
  const clientId = getGoogleClientId()
  const isValid = isGoogleClientIdValid()

  // Only wrap with GoogleOAuthProvider if a valid, non-placeholder Client ID is configured.
  // Passing dummy placeholder strings like 'placeholder_client_id' to GoogleOAuthProvider
  // causes Google GSI script to send HTTP 401 invalid_client requests to Google servers.
  if (isValid && clientId) {
    return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  }

  return <>{children}</>
}
