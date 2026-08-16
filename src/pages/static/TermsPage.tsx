import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  HiDocumentText,
  HiShoppingBag,
  HiBookOpen,
  HiPhone,
  HiUserGroup,
  HiBan,
  HiScale,
  HiMail,
} from 'react-icons/hi'

const sections = [
  {
    icon: HiDocumentText,
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Ryoit platform (website, mobile app, or API), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.

These terms apply to all visitors, users, and others who access or use the service.`,
  },
  {
    icon: HiPhone,
    title: '2. Mobile Solutions & Flashing Disclaimer',
    content: `Ryoit provides educational guides on smartphone software repair, firmware flashing, IMEI services, FRP bypass, and GSM tools. By accessing this content:

• You acknowledge that mobile flashing and repair carry inherent device risks
• Ryoit is not liable for bricked devices, IMEI damage, data loss, or hardware malfunction resulting from following our guides
• You confirm you are the legal owner of any device you modify
• Illegal IMEI modification is strictly prohibited and violates our terms`,
  },
  {
    icon: HiShoppingBag,
    title: '3. Marketplace Rules & Seller Conduct',
    content: `When listing items or services on the Ryoit Marketplace:

• You warrant that you are the lawful owner of any digital asset listed
• Fraudulent listings, fake reviews, or misleading descriptions are prohibited
• Spam, bot-generated engagement, or false metrics on YouTube/Facebook assets are prohibited
• Violations will result in immediate listing removal and account suspension
• Ryoit reserves the right to remove any listing without prior notice
• Transactions are between buyers and sellers; Ryoit is not a party to the sale`,
  },
  {
    icon: HiBookOpen,
    title: '4. Course Enrollment & Intellectual Property',
    content: `When you enroll in a Ryoit course:

• Access is personal, individual, and non-transferable
• Sharing login credentials or redistributing course materials is strictly prohibited
• Leaked or pirated course content will result in immediate account termination
• All course content, videos, and materials remain the intellectual property of Ryoit and respective instructors
• You may not reproduce, distribute, or create derivative works without written permission`,
  },
  {
    icon: HiUserGroup,
    title: '5. User Accounts & Responsibilities',
    content: `When creating a Ryoit account, you agree to:

• Provide accurate and truthful registration information
• Maintain the confidentiality of your login credentials
• Notify us immediately of any unauthorized use of your account
• Not create accounts using automated methods or for malicious purposes
• Be responsible for all activities that occur under your account`,
  },
  {
    icon: HiBan,
    title: '6. Prohibited Activities',
    content: `You may not use the Ryoit platform to:

• Violate any applicable local, national, or international laws or regulations
• Transmit malware, viruses, or any other malicious code
• Harvest or collect user data without consent
• Impersonate any person or entity
• Engage in any activity that disrupts or interferes with the platform
• Attempt unauthorized access to any part of the platform or its systems`,
  },
  {
    icon: HiScale,
    title: '7. Limitation of Liability',
    content: `To the maximum extent permitted by law:

• Ryoit provides the platform on an "as is" and "as available" basis
• We do not warrant that the platform will be uninterrupted or error-free
• Ryoit shall not be liable for any indirect, incidental, or consequential damages
• Our total liability shall not exceed the amount you paid us in the 12 months prior to the claim
• We are not responsible for third-party content or external links`,
  },
  {
    icon: HiMail,
    title: '8. Contact & Disputes',
    content: `For any questions regarding these Terms of Service:

• Email: hadushmobilesoftware@gmail.com
• Phone: +251 714 224 955
• Location: Ethiopia

These terms are governed by the laws of Ethiopia. Any disputes shall be resolved through good-faith negotiation. These terms were last updated in August 2026.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — Ryoit</title>
        <meta
          name="description"
          content="Read Ryoit's Terms of Service covering courses, marketplace, mobile solutions, and platform usage rules and regulations."
        />
      </Helmet>

      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-semibold mb-6">
              <HiDocumentText className="w-4 h-4" />
              Legal Document
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-dark-text mb-4">
              Terms of Service
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-lg">
              Last updated: <strong>August 2026</strong>
            </p>
            <p className="text-light-muted dark:text-dark-muted mt-4 max-w-2xl mx-auto">
              Please read these terms carefully before using Ryoit. By using our platform, 
              you agree to all the terms and conditions listed below.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-light-text dark:text-dark-text">
                    {section.title}
                  </h2>
                </div>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
