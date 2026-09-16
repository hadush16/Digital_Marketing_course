import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { HiChevronDown, HiChevronUp, HiQuestionMarkCircle } from 'react-icons/hi'

const FAQS = [
  {
    id: '1',
    category: 'Payments & Enrollment',
    question: 'What payment options are supported for enrolling in courses?',
    answer:
      'We support direct local Ethiopian bank transfers (Commercial Bank of Ethiopia - CBE, Telebirr, Awash Bank, Bank of Abyssinia) as well as international digital payment methods. Once you submit an enrollment request, exact account details and automated confirmation instructions are sent immediately.',
  },
  {
    id: '2',
    category: 'Mobile Repair & Flashing',
    question: 'How do I download and verify GSM tools from the Mobile Solutions section?',
    answer:
      'Every technical solution entry includes verified mirror links (Google Drive, Mega, Mediafire) containing official flashing suites (Samsung Odin, Xiaomi Mi Flash, MediaTek SP Flash Tool, UnlockTool, Miracle Box) and clean stock firmware ROMs. All links are tested against SHA-256 checksums to prevent malware.',
  },
  {
    id: '3',
    category: 'Course Languages & Format',
    question: 'Are the course video tutorials taught in Amharic or English?',
    answer:
      'The majority of our foundational courses — including Meta & Facebook Advertising, TikTok Ads, YouTube Monetization, and Smartphone Hardware Diagnostics — are taught in Amharic with clear on-screen technical terminology in English so learners can master practical implementation immediately.',
  },
  {
    id: '4',
    category: 'Marketplace & Listings',
    question: 'How does the Ryoit Marketplace work for digital properties and freelance services?',
    answer:
      'Users can register an account and list verified digital assets (such as established YouTube channels, Telegram channels, and Facebook business pages) or creative digital services (Canva graphic design, video editing, social media management). All listings undergo manual compliance review before appearing publicly.',
  },
  {
    id: '5',
    category: 'Mobile Repair & Flashing',
    question: 'What is Factory Reset Protection (FRP) and how do your guides address it?',
    answer:
      'FRP is an Android security feature that locks a device to its previous Google Account after an untrusted factory reset. Our technical solutions provide legitimate recovery workflows for technicians working with authorized device owners, detailing test-point (EDL) methods, ADB/Fastboot commands, and official flashing procedures.',
  },
  {
    id: '6',
    category: 'Advertising & Monetization',
    question: 'What advertising technologies and policies does Ryoit adhere to?',
    answer:
      'Ryoit participates in the Google AdSense publisher network to support free, open-access technical documentation and guides. We adhere strictly to Google Publisher Policies, ensuring ads do not interfere with navigation, user experience, or student learning workflows.',
  },
  {
    id: '7',
    category: 'Hardware Safety',
    question: 'What precautions should I take before flashing a smartphone firmware?',
    answer:
      'Always ensure the battery is charged to at least 60%, back up essential calibration partitions (EFS, SEC_EFS, QCN, NVRAM) to preserve cellular IMEI/baseband data, install vendor-specific signed USB drivers (Samsung Mobile USB, Qualcomm HS-USB QDLoader 9008), and match exact binary/bit levels (e.g. U1, U2, U3) on Samsung firmware.',
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('1')

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions (FAQ) — Ryoit Knowledge Base</title>
        <meta
          name="description"
          content="Find answers to common questions about Ryoit digital marketing classes, mobile flashing tutorials, GSM tool setups, payments, and marketplace guidelines."
        />
        <link rel="canonical" href="https://ryoit.com/faq" />
        <meta property="og:title" content="Frequently Asked Questions (FAQ) — Ryoit Knowledge Base" />
        <meta
          property="og:description"
          content="Find answers to common questions about Ryoit digital marketing classes, mobile flashing tutorials, GSM tool setups, payments, and marketplace guidelines."
        />
        <meta property="og:url" content="https://ryoit.com/faq" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-primary badge mb-4"
            >
              Knowledge Base
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6 text-light-text dark:text-dark-text"
            >
              Frequently Asked <span className="gradient-text">Questions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Comprehensive answers covering course enrollment, smartphone firmware flashing, GSM tool downloads, and digital marketplace policies.
            </motion.p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
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
                    <span className="flex items-center gap-3">
                      <HiQuestionMarkCircle className="w-5 h-5 text-primary-500 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <HiChevronUp className="w-5 h-5 text-primary-500 shrink-0 ml-2" />
                    ) : (
                      <HiChevronDown className="w-5 h-5 text-light-muted shrink-0 ml-2" />
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
                        <div className="px-6 pb-6 text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed border-t border-light-border/40 dark:border-dark-border/40 pt-4">
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
    </>
  )
}
