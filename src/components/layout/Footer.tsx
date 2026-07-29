import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaFacebook, FaInstagram, FaTiktok, FaYoutube,
  FaTelegram, FaTwitter, FaLinkedin,
} from 'react-icons/fa'
import {
  HiMail, HiPhone, HiLocationMarker,
  HiArrowRight,
} from 'react-icons/hi'

const footerLinks = {
  platform: [
    { label: 'Courses',          href: '/courses' },
    { label: 'Mobile Solutions', href: '/mobile-solutions' },
    { label: 'Marketplace',      href: '/marketplace' },
    { label: 'Tech News',        href: '/news' },
    { label: 'Community',        href: '/community' },
  ],
  categories: [
    { label: 'Digital Marketing',  href: '/courses?category=seo' },
    { label: 'Social Media',       href: '/courses?category=facebook-marketing' },
    { label: 'Phone Flashing',     href: '/mobile-solutions?category=phone-flashing' },
    { label: 'IMEI Repair',        href: '/mobile-solutions?category=imei-repair' },
    { label: 'GSM Tools',          href: '/mobile-solutions?category=gsm-tools' },
    { label: 'FRP Bypass',         href: '/mobile-solutions?category=frp-bypass' },
  ],
  company: [
    { label: 'About',           href: '/about' },
    { label: 'Contact',         href: '/contact' },
    { label: 'FAQ',             href: '/faq' },
    { label: 'Privacy Policy',  href: '/privacy' },
    { label: 'Terms of Service',href: '/terms' },
    { label: 'Marketing Opps',  href: '/opportunities' },
  ],
}

const socials = [
  { icon: FaFacebook,  href: 'https://web.facebook.com/new.light.14224094', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/hadush130',         label: 'Instagram' },
  { icon: FaTiktok,    href: 'https://t.me/HadushB12',                       label: 'TikTok' },
  { icon: FaYoutube,   href: '#',                                            label: 'YouTube' },
  { icon: FaTelegram,  href: 'https://t.me/HadushB12',                       label: 'Telegram' },
  { icon: FaTwitter,   href: 'https://x.com/belay341035',                    label: 'Twitter / X' },
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/hadushmobile',     label: 'LinkedIn' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-bg border-t border-dark-border">

      {/* Newsletter Banner */}
      <div className="border-b border-dark-border">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Stay updated with Ryoit
              </h3>
              <p className="text-dark-muted">
                Get the latest courses, tools, and digital opportunities delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full max-w-md gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                type="submit"
                className="btn-primary btn-md whitespace-nowrap"
                id="footer-newsletter-btn"
              >
                Subscribe <HiArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <img src="/assets/img/ryoit-logo.png" alt="Ryoit Logo" className="w-10 h-10 rounded-xl object-cover shadow-glow-sm" />
              <span className="font-display font-black text-2xl text-white">Ryoit</span>
            </Link>
            <p className="text-dark-muted text-sm leading-relaxed mb-6 max-w-xs">
              Premium platform for Digital Marketing education, Mobile Repair solutions, GSM Tools, and a marketplace for digital services — all in one place.
            </p>
            <div className="space-y-3">
              <a href="mailto:hadushmobilesoftware@gmail.com" className="flex items-center gap-3 text-sm text-dark-muted hover:text-primary-400 transition-colors">
                <HiMail className="w-4 h-4 shrink-0 text-primary-500" />
                hadushmobilesoftware@gmail.com
              </a>
              <a href="tel:+251714224955" className="flex items-center gap-3 text-sm text-dark-muted hover:text-primary-400 transition-colors">
                <HiPhone className="w-4 h-4 shrink-0 text-primary-500" />
                +251 714 224 955
              </a>
              <p className="flex items-center gap-3 text-sm text-dark-muted">
                <HiLocationMarker className="w-4 h-4 shrink-0 text-primary-500" />
                Ethiopia
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-dark-muted hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-dark-muted hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-dark-muted hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-dark-border mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-dark-muted hover:text-primary-400 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-dark-muted">
              © {currentYear} Ryoit. Designed by{' '}
              <a
                href="https://t.me/HadushB12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                Hadush Brhane
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
