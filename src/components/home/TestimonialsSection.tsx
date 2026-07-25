import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const TESTIMONIALS = [
  {
    id: '1', quote: 'Ryoit\'s Facebook Marketing course changed my business completely. I went from 0 to 50,000 followers in 3 months. The step-by-step Amharic instructions made everything clear.',
    author: 'Dawit Tesfaye', role: 'Digital Marketer, Addis Ababa', rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2', quote: 'As a mobile technician, the IMEI repair and FRP bypass guides saved my business. The download links work perfectly and the video tutorials are very clear.',
    author: 'Meron Alemu', role: 'Mobile Repair Technician, Hawassa', rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '3', quote: 'I sold my Facebook page through Ryoit Marketplace in just 2 days. The platform is professional and the payment process was smooth.',
    author: 'Samuel Bekele', role: 'Social Media Entrepreneur', rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4', quote: 'The TikTok ads course helped me grow my dropshipping business. I\'m now making consistent income from my online store thanks to Ryoit.',
    author: 'Hana Girma', role: 'E-commerce Seller, Dire Dawa', rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '5', quote: 'Ryoit is the only platform that combines digital marketing education with mobile repair guides in one place. Very unique and very helpful.',
    author: 'Yonas Tadesse', role: 'Tech Entrepreneur, Mekelle', rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))
  const next = () => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))

  const t = TESTIMONIALS[active]

  return (
    <section className="section bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge-warning badge mb-4 mx-auto">⭐ Testimonials</div>
          <h2 className="section-title mb-3">
            Loved by Thousands of{' '}
            <span className="gradient-text">Ryoit Users</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Real results from real people across Ethiopia and beyond.
          </p>
        </motion.div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-3xl p-8 lg:p-12 text-center mb-8"
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <HiStar key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-display text-xl lg:text-2xl text-light-text dark:text-dark-text leading-relaxed mb-8 font-medium">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-500/30"
              />
              <div className="text-left">
                <p className="font-display font-bold text-light-text dark:text-dark-text">{t.author}</p>
                <p className="text-sm text-light-muted dark:text-dark-muted">{t.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              id="testimonials-prev"
              className="w-10 h-10 rounded-full border border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-500 hover:text-white text-light-muted dark:text-dark-muted flex items-center justify-center transition-all duration-200"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 bg-primary-500'
                      : 'w-2 bg-light-border dark:bg-dark-border hover:bg-primary-500/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              id="testimonials-next"
              className="w-10 h-10 rounded-full border border-light-border dark:border-dark-border hover:border-primary-500 hover:bg-primary-500 hover:text-white text-light-muted dark:text-dark-muted flex items-center justify-center transition-all duration-200"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {TESTIMONIALS.filter((_, i) => i !== active).slice(0, 3).map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActive(TESTIMONIALS.indexOf(t))}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-4 text-left hover:border-primary-500/30 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-light-text dark:text-dark-text">{t.author}</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2">"{t.quote}"</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
