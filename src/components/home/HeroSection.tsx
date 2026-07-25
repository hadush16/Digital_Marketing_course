import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight, HiPlay, HiStar } from 'react-icons/hi'
import { FaShieldAlt, FaUsers, FaMobileAlt } from 'react-icons/fa'

const stats = [
  { value: '50+',   label: 'Courses',        icon: FaMobileAlt  },
  { value: '200+',  label: 'Mobile Solutions',icon: FaShieldAlt  },
  { value: '5K+',   label: 'Community Members',icon: FaUsers     },
  { value: '4.9',   label: 'Platform Rating', icon: HiStar       },
]

const badges = [
  '✦ Digital Marketing',
  '✦ Mobile Repair',
  '✦ GSM Tools',
  '✦ Marketplace',
  '✦ Phone Flashing',
  '✦ IMEI Repair',
]

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y      = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity= useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-bg"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mesh-bg" />
        {/* Animated orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-primary-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-secondary-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-500/5 blur-3xl"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 container-custom pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">

          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-slow" />
            Ethiopia's #1 Digital Learning & Repair Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight mb-6"
          >
            Learn.{' '}
            <span className="gradient-text">Repair.</span>
            <br />
            Market.{' '}
            <span className="gradient-text-accent">Succeed.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-dark-muted text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Master Digital Marketing, Mobile Hardware & Software Repair, GSM Tools, and grow your business — all in one premium platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              to="/courses"
              id="hero-explore-courses"
              className="btn-primary btn-lg group w-full sm:w-auto"
            >
              Explore Courses
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/mobile-solutions"
              id="hero-mobile-solutions"
              className="btn-outline btn-lg w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/40 focus:ring-white/30"
            >
              <HiPlay className="w-5 h-5" />
              Mobile Solutions
            </Link>
          </motion.div>

          {/* Scrolling badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {badges.map((badge, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-dark-card border border-dark-border text-xs font-medium text-dark-muted"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass-card-dark rounded-2xl p-6 text-center group hover:border-primary-500/30 transition-all duration-300"
              >
                <Icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                <div className="font-display font-black text-3xl text-white mb-1">{value}</div>
                <div className="text-xs text-dark-muted font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 53.3C672 58.7 768 69.3 864 69.3C960 69.3 1056 58.7 1152 53.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
            className="fill-light-bg dark:fill-dark-bg"
          />
        </svg>
      </div>
    </section>
  )
}
