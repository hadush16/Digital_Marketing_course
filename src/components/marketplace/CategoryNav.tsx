import { useState } from 'react'
import { MARKETPLACE_CATEGORIES } from '@/data/mockDatabase'
import { cn } from '@/utils'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'

interface CategoryNavProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'social-accounts': true,
    'digital-marketing': true,
    'creative': true,
    'development': true,
  })

  const toggleExpand = (val: string) => {
    setExpanded((prev) => ({ ...prev, [val]: !prev[val] }))
  }

  return (
    <div className="glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border max-h-[85vh] overflow-y-auto sticky top-24">
      <h3 className="font-display font-bold text-xs text-light-text dark:text-dark-text mb-4 uppercase tracking-wider flex items-center justify-between">
        <span>Categories</span>
        <button
          onClick={() => onSelectCategory('all')}
          className="text-primary-500 hover:underline normal-case text-xs font-semibold"
        >
          Reset All
        </button>
      </h3>

      <div className="space-y-1">
        {MARKETPLACE_CATEGORIES.map((cat) => {
          const isAll = cat.value === 'all'
          const hasSub = cat.subcategories && cat.subcategories.length > 0
          const isExpanded = expanded[cat.value]
          const isMainSelected = selectedCategory === cat.value

          if (isAll) {
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory('all')}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2.5',
                  selectedCategory === 'all'
                    ? 'bg-primary-500/10 text-primary-500 font-bold'
                    : 'text-light-text dark:text-dark-text hover:bg-light-border/40 dark:hover:bg-dark-border/40'
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          }

          return (
            <div key={cat.value} className="space-y-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (hasSub) toggleExpand(cat.value)
                    else onSelectCategory(cat.value)
                  }}
                  className={cn(
                    'flex-1 text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between',
                    isMainSelected
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  {hasSub && (
                    <span className="p-1">
                      {isExpanded ? (
                        <HiChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <HiChevronRight className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </button>
              </div>

              {/* Subcategories */}
              {hasSub && isExpanded && (
                <div className="pl-6 space-y-1 border-l-2 border-light-border/60 dark:border-dark-border/60 ml-3">
                  {cat.subcategories.map((sub) => {
                    const isSubSelected = selectedCategory === sub.value
                    return (
                      <button
                        key={sub.value}
                        onClick={() => onSelectCategory(sub.value)}
                        className={cn(
                          'w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors block truncate',
                          isSubSelected
                            ? 'bg-secondary-500/15 text-secondary-500 font-bold'
                            : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                        )}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
