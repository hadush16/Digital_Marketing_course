import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiBell, HiCheck, HiCheckCircle } from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import api from '@/services/api'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) return
    fetchNotifications()
  }, [isAuthenticated])

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications')
      setNotifications(res.data?.data ?? [])
    } catch {
      // Fallback to empty state gracefully
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
    } catch {
      // Silently fail
    }
  }

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead)
    await Promise.allSettled(unread.map((n) => api.patch(`/notifications/${n.id}/read`)))
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const typeColors: Record<string, string> = {
    SYSTEM: 'bg-blue-500/10 text-blue-500',
    COURSE: 'bg-green-500/10 text-green-500',
    CHAT: 'bg-purple-500/10 text-purple-500',
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <>
      <Helmet>
        <title>Notifications — Ryoit</title>
        <meta name="description" content="View your Ryoit platform notifications for courses, messages, and system updates." />
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-light-text dark:text-dark-text flex items-center gap-3">
                <HiBell className="w-8 h-8 text-primary-500" />
                Notifications
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-500 text-white text-sm font-bold">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-light-muted dark:text-dark-muted mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                id="mark-all-notifications-read"
                className="btn-outline btn-sm flex items-center gap-2"
              >
                <HiCheckCircle className="w-4 h-4" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-light-border dark:bg-dark-border rounded w-1/3 mb-3" />
                  <div className="h-3 bg-light-border dark:bg-dark-border rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 glass-card rounded-3xl"
            >
              <HiBell className="w-16 h-16 text-light-muted dark:text-dark-muted mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-display font-semibold text-light-text dark:text-dark-text mb-2">
                No notifications yet
              </h3>
              <p className="text-light-muted dark:text-dark-muted text-sm">
                You're all caught up! Notifications will appear here when you receive them.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-card rounded-2xl p-6 flex items-start gap-4 transition-all ${
                    !notif.isRead ? 'border-primary-500/30 bg-primary-500/5' : ''
                  }`}
                >
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeColors[notif.type] || 'bg-gray-500/10 text-gray-500'}`}>
                        {notif.type}
                      </span>
                      <span className="text-xs text-light-muted dark:text-dark-muted">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-semibold text-light-text dark:text-dark-text text-sm">
                      {notif.title}
                    </p>
                    <p className="text-light-muted dark:text-dark-muted text-sm mt-1">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      id={`notif-read-${notif.id}`}
                      className="p-1.5 rounded-lg text-light-muted hover:text-primary-500 hover:bg-primary-500/10 transition-colors shrink-0"
                      title="Mark as read"
                    >
                      <HiCheck className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
