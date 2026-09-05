import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('ryoit_cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ryoit_cookie_consent', 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('ryoit_cookie_consent', 'rejected')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-dark-card/95 backdrop-blur-md border border-dark-border rounded-2xl shadow-glow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-white font-display font-semibold text-lg mb-2">We value your privacy</h3>
              <p className="text-dark-muted text-sm leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                Read our <Link to="/privacy" className="text-primary-400 hover:underline">Privacy Policy</Link> for more details.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="btn-outline flex-1 md:flex-none whitespace-nowrap"
                id="cookie-reject-btn"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="btn-primary flex-1 md:flex-none whitespace-nowrap"
                id="cookie-accept-btn"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
