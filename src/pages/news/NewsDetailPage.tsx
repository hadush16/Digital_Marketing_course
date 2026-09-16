import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  HiClock,
  HiEye,
  HiArrowLeft,
  HiCheckCircle,
  HiInformationCircle,
  HiExclamation,
  HiSparkles,
  HiChevronRight,
  HiQuestionMarkCircle,
  HiShare,
} from 'react-icons/hi'
import { NEWS_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const article = NEWS_DATA.find((n) => n.slug === slug)

  if (!article) {
    return (
      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Article Not Found</h2>
          <p className="text-light-muted dark:text-dark-muted mb-6">The technical guide or article you are looking for does not exist or has been moved.</p>
          <Link to="/news" className="btn-primary btn-md">
            <HiArrowLeft className="w-4 h-4 mr-2" /> Back to News Hub
          </Link>
        </div>
      </div>
    )
  }

  const relatedArticles = NEWS_DATA.filter((n) => n.id !== article.id).slice(0, 3)

  // JSON-LD Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.thumbnail,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ryoit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ryoit.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ryoit.com/news/${article.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ryoit.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'News & Technical Guides',
        item: 'https://ryoit.com/news',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://ryoit.com/news/${article.slug}`,
      },
    ],
  }

  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  } : null

  return (
    <>
      <Helmet>
        <title>{`${article.title} | Ryoit Tech Hub`}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://ryoit.com/news/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ryoit.com/news/${article.slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-5xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted mb-6">
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <HiChevronRight className="w-3.5 h-3.5" />
            <Link to="/news" className="hover:text-primary-500 transition-colors">News & Guides</Link>
            <HiChevronRight className="w-3.5 h-3.5" />
            <span className="text-light-text dark:text-dark-text font-medium truncate max-w-[240px] sm:max-w-md">
              {article.title}
            </span>
          </div>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-primary badge capitalize">
                {article.category.replace(/-/g, ' ')}
              </span>
              <span className="badge bg-light-border dark:bg-dark-border text-light-muted text-xs font-semibold">
                Verified Technical Guide
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-light-text dark:text-dark-text leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted leading-relaxed font-normal">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-light-border dark:border-dark-border/60 text-xs text-light-muted dark:text-dark-muted">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-light-text dark:text-dark-text">
                  <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 font-bold flex items-center justify-center text-xs">
                    {article.author.name[0]}
                  </span>
                  {article.author.name} ({article.author.role})
                </span>
                <span className="flex items-center gap-1.5">
                  <HiClock className="text-primary-500" /> {article.readTime} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <HiEye /> {article.views.toLocaleString()} views
                </span>
              </div>
              <span className="text-xs">
                Published on {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Featured Hero Media */}
          <div className="glass-card rounded-3xl overflow-hidden border border-light-border dark:border-dark-border p-2 mb-10 shadow-lg">
            <div className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden relative">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-10 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-transparent border border-primary-500/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-primary-500 text-white flex items-center justify-center shrink-0">
                  <HiSparkles className="w-5 h-5" />
                </div>
                <h2 className="font-display font-bold text-lg sm:text-xl text-light-text dark:text-dark-text">
                  Key Takeaways & Diagnostic Highlights
                </h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {article.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-light-text dark:text-dark-text">
                    <HiCheckCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Grid: Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Table of Contents & Quick Meta (Desktop) */}
            <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              {/* Quick TOC */}
              {article.sections && article.sections.length > 0 && (
                <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border sticky top-24">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
                    In This Guide
                  </h3>
                  <nav className="space-y-2 text-xs">
                    {article.sections.map((sec, i) => (
                      <a
                        key={i}
                        href={`#section-${i}`}
                        className="block text-light-muted dark:text-dark-muted hover:text-primary-500 dark:hover:text-primary-400 py-1 transition-colors leading-normal border-l-2 border-transparent hover:border-primary-500 pl-2"
                      >
                        {sec.heading}
                      </a>
                    ))}
                    {article.faqs && article.faqs.length > 0 && (
                      <a
                        href="#faqs"
                        className="block text-light-muted dark:text-dark-muted hover:text-primary-500 dark:hover:text-primary-400 py-1 transition-colors leading-normal border-l-2 border-transparent hover:border-primary-500 pl-2"
                      >
                        Frequently Asked Questions
                      </a>
                    )}
                  </nav>

                  {/* Author Card in Sidebar */}
                  <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border/60">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-light-muted dark:text-dark-muted mb-3">
                      Author & Technical Reviewer
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold font-display shrink-0">
                        {article.author.name[0]}
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-sm text-light-text dark:text-dark-text">
                          {article.author.name}
                        </h5>
                        <p className="text-[11px] text-light-muted dark:text-dark-muted">
                          {article.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sidebar AdSense Placement */}
              <div className="glass-card rounded-2xl p-4 border border-light-border dark:border-dark-border">
                <span className="text-[10px] uppercase font-bold tracking-wider text-light-muted block mb-2 text-center">
                  Advertisement
                </span>
                <AdSenseAd slotId="4047270762" />
              </div>
            </aside>

            {/* Article Body */}
            <article className="lg:col-span-8 space-y-8 order-1 lg:order-2">
              {/* Main Content Paragraphs if raw content exists */}
              {article.content && (
                <div className="prose-ryoit">
                  <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                    {article.content}
                  </p>
                </div>
              )}

              {/* Structured Rich Sections */}
              {article.sections && article.sections.map((sec, sIdx) => (
                <section key={sIdx} id={`section-${sIdx}`} className="space-y-4 pt-4">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border/60 pb-2">
                    {sec.heading}
                  </h2>

                  {sec.subheading && (
                    <h3 className="font-display font-semibold text-lg text-primary-500 dark:text-primary-400">
                      {sec.subheading}
                    </h3>
                  )}

                  <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                    {sec.body}
                  </p>

                  {/* Bullet points if present */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <div className="bg-light-surface dark:bg-dark-surface/50 rounded-2xl p-5 border border-light-border dark:border-dark-border/60">
                      <ul className="space-y-2.5">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-sm text-light-text dark:text-dark-text">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-2" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Callout Box if present */}
                  {sec.callout && (
                    <div className="rounded-2xl p-5 border bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3.5">
                      <HiExclamation className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-sm leading-relaxed">
                        <strong className="block font-bold mb-1">
                          {sec.callout.type ? `${sec.callout.type.toUpperCase()} Advisory:` : 'Technical Recommendation:'}
                        </strong>
                        {sec.callout.text}
                      </div>
                    </div>
                  )}

                  {/* Diagnostic Table if present */}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-2xl border border-light-border dark:border-dark-border shadow-sm my-6">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border text-xs uppercase tracking-wider text-light-text dark:text-dark-text font-bold">
                          <tr>
                            {sec.table.headers.map((th, hIdx) => (
                              <th key={hIdx} className="px-4 py-3.5">
                                {th}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-light-border dark:divide-dark-border/50">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 text-xs sm:text-sm text-light-muted dark:text-dark-muted font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Mid-article Ad Slot after 2nd section */}
                  {sIdx === 1 && (
                    <div className="my-8 py-4 border-y border-light-border dark:border-dark-border/40">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-light-muted block mb-2 text-center">
                        Sponsored Information
                      </span>
                      <AdSenseAd slotId="4047270762" />
                    </div>
                  )}
                </section>
              ))}

              {/* FAQs Section */}
              {article.faqs && article.faqs.length > 0 && (
                <section id="faqs" className="pt-8 border-t border-light-border dark:border-dark-border/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-xl bg-accent-500/10 text-accent-500 flex items-center justify-center">
                      <HiQuestionMarkCircle className="w-5 h-5" />
                    </div>
                    <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {article.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border"
                      >
                        <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom In-content Ad Slot */}
              <div className="mt-10">
                <AdSenseAd slotId="4047270762" />
              </div>
            </article>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-light-border dark:border-dark-border/60">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-display font-bold text-2xl text-light-text dark:text-dark-text">
                    Related Guides & Analysis
                  </h3>
                  <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted">
                    Explore more expert engineering breakdowns and digital growth strategies
                  </p>
                </div>
                <Link to="/news" className="text-sm font-semibold text-primary-500 hover:underline flex items-center gap-1">
                  View All <HiChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/news/${rel.slug}`}
                    className="card-hover flex flex-col group rounded-2xl overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <span className="badge-primary badge text-[10px] uppercase tracking-wider mb-2 self-start">
                        {rel.category.replace(/-/g, ' ')}
                      </span>
                      <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-4 flex-1">
                        {rel.excerpt}
                      </p>
                      <div className="text-[11px] text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border/40 pt-3 flex items-center justify-between">
                        <span>{rel.readTime} min read</span>
                        <span>{new Date(rel.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
