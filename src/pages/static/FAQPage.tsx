import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

const FAQS = [
  {
    id: '1',
    question: 'What are the payment options for courses?',
    answer: 'We support local bank transfers (CBE, Telebirr, Awash, etc.) for users based in Ethiopia, as well as digital wallets. Instructions are sent instantly to your registered email when you sign up for enrollment.',
  },
  {
    id: '2',
    question: 'How do I download the GSM tools listed on the Mobile Solutions page?',
    answer: 'Every mobile software repair entry contains verified, malware-free mirror links (Mega, Google Drive, Mediafire) containing driver setups, unlocking software (Unlock Tool, Miracle Box, SP Flash Tool, etc.), or stock firmwares.',
  },
  {
    id: '3',
    question: 'Are the video tutorials in Amharic?',
    answer: 'Yes! Most of our courses, including Facebook Marketing, TikTok Ads, YouTube Monetization, and Mobile Unlocking/Hardware diagnostics are explained clearly in Amharic with easy-to-follow practical demonstrations.',
  },
  {
    id: '4',
    question: 'Can I advertise my YouTube Channel or Telegram Group on the Marketplace?',
    answer: 'Absolutely! Users can sign up, list digital properties (YouTube channels, Telegram groups, active pages) or design/video editing services, set their custom prices, and receive direct inquiries from prospective buyers.',
  },
  {
    id: '5',
    question: 'How does FRP Bypass work?',
    answer: 'Factory Reset Protection (FRP) is a security feature on Android. Our mobile solutions list step-by-step instructions for Android security patches, including utilizing Odin, ADB/Fastboot commands, and diagnostic keys.',
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-primary badge mb-4"
          >
            FAQ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Find quick answers to common queries regarding mobile software repair guides, marketing classes, and digital service exchange.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl overflow-hidden border border-light-border dark:border-dark-border shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-display font-bold text-base text-light-text dark:text-dark-text hover:text-primary-500 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <HiChevronUp className="w-5 h-5 text-primary-500 shrink-0" />
                  ) : (
                    <HiChevronDown className="w-5 h-5 text-light-muted shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-light-muted dark:text-dark-muted leading-relaxed border-t border-light-border/40 dark:border-dark-border/40 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
