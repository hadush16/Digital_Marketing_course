import { HiPlay } from 'react-icons/hi'

export default function MyCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text">My Enrolled Courses</h1>
        <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
          Continue your study sessions and review flashing/repair procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-4 border border-light-border dark:border-dark-border shadow-sm flex flex-col sm:flex-row gap-4">
          <div className="aspect-video w-full sm:w-36 rounded-xl overflow-hidden shrink-0">
            <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&q=80" alt="FB" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text">Facebook Marketing Mastery</h3>
              <p className="text-xs text-light-muted mt-1">45 Lessons • 12 Hours</p>
            </div>
            <div className="flex items-center justify-between gap-4 mt-4 sm:mt-0">
              <span className="text-xs font-semibold text-light-muted">35% Done</span>
              <button className="btn-primary btn-sm flex items-center gap-1">
                <HiPlay /> Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
