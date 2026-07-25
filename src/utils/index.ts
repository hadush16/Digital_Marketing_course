import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format price with currency */
export function formatPrice(amount: number, currency = 'ETB'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }
  return `${currency} ${amount.toLocaleString()}`
}

/** Format number with abbreviation (1200 → 1.2K) */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000)     return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

/** Format relative time (e.g. "2 hours ago") */
export function formatRelativeTime(dateStr: string): string {
  const date  = new Date(dateStr)
  const now   = new Date()
  const diff  = now.getTime() - date.getTime()
  const secs  = Math.floor(diff / 1000)
  const mins  = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)
  const days  = Math.floor(hours / 24)

  if (days > 30)  return date.toLocaleDateString()
  if (days > 0)   return `${days}d ago`
  if (hours > 0)  return `${hours}h ago`
  if (mins > 0)   return `${mins}m ago`
  return 'just now'
}

/** Format date to readable string */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/** Truncate text to specified length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/** Calculate discount percentage */
export function calcDiscount(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100)
}

/** Generate slug from string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Get initials from name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

/** Estimate read time in minutes */
export function estimateReadTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

/** Get level color class */
export function getLevelColor(level: string): string {
  switch (level) {
    case 'beginner':     return 'badge-success'
    case 'intermediate': return 'badge-warning'
    case 'advanced':     return 'badge-danger'
    default:             return 'badge-muted'
  }
}

/** Get status color class */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'published': return 'badge-success'
    case 'draft':     return 'badge-warning'
    case 'archived':  return 'badge-muted'
    default:          return 'badge-muted'
  }
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/** Check if running on mobile */
export function isMobile(): boolean {
  return window.innerWidth < 768
}

/** Scroll to element */
export function scrollTo(elementId: string): void {
  document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
}
