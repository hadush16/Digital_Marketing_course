import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GoogleOAuthWrapper from './components/auth/GoogleOAuthWrapper'
import { auditGoogleOAuth } from './utils/googleAuth'

// Perform immediate Google OAuth diagnostic audit
auditGoogleOAuth()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthWrapper>
      <App />
    </GoogleOAuthWrapper>
  </React.StrictMode>
)
