import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiTrash, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiShieldCheck, HiUserCircle, HiAcademicCap } from 'react-icons/hi2'
import { adminService, type AdminUser } from '@/services/admin.service'
import toast from 'react-hot-toast'

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  ADMIN:      { label: 'Admin',      color: 'text-red-400 bg-red-500/10 border-red-500/30',       icon: HiShieldCheck },
  INSTRUCTOR: { label: 'Instructor', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', icon: HiAcademicCap },
  USER:       { label: 'User',       color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',     icon: HiUserCircle },
}

export default function UsersManagePage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [updatingRole, setUpdatingRole] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await adminService.getUsers(page, 10)
      setUsers(res.data.data)
      setTotalPages(res.data.pagination.pages)
      setTotal(res.data.pagination.total)
    } catch {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'INSTRUCTOR' | 'ADMIN') => {
    setUpdatingRole(userId)
    try {
      await adminService.updateUserRole(userId, newRole)
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      toast.success('Role updated successfully')
    } catch {
      toast.error('Failed to update role')
    } finally {
      setUpdatingRole(null)
    }
  }

  const handleDelete = async (userId: string) => {
    try {
      await adminService.deleteUser(userId)
      setUsers(prev => prev.filter(u => u.id !== userId))
      setTotal(t => t - 1)
      setConfirmDelete(null)
      toast.success('User deleted')
    } catch {
      toast.error('Failed to delete user')
      setConfirmDelete(null)
    }
  }

  const filtered = users.filter(u =>
    search === '' ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Users</h1>
          <p className="text-sm text-dark-muted mt-1">
            Manage all {total.toLocaleString()} registered platform accounts.
          </p>
        </div>
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-9 text-sm w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card-dark rounded-2xl border border-dark-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-secondary-500/30 border-t-secondary-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-dark-muted text-sm">
            {search ? 'No users match your search.' : 'No users found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider hidden md:table-cell">Joined</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Role</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {filtered.map((user, i) => {
                  const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.USER
                  const Icon = role.icon
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-white/3 transition-colors"
                    >
                      {/* User info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                            {user.avatar
                              ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                              : user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-dark-muted truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-dark-muted hidden md:table-cell">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>

                      {/* Role selector */}
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${role.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                          <select
                            value={user.role}
                            disabled={updatingRole === user.id}
                            onChange={e => handleRoleChange(user.id, e.target.value as 'USER' | 'INSTRUCTOR' | 'ADMIN')}
                            className="bg-transparent text-inherit font-bold focus:outline-none cursor-pointer disabled:opacity-50"
                          >
                            <option value="USER" className="bg-dark-surface text-white">User</option>
                            <option value="INSTRUCTOR" className="bg-dark-surface text-white">Instructor</option>
                            <option value="ADMIN" className="bg-dark-surface text-white">Admin</option>
                          </select>
                          {updatingRole === user.id && (
                            <div className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" />
                          )}
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="px-6 py-4 text-right">
                        {confirmDelete === user.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-dark-muted">Delete?</span>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-400 transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="px-2.5 py-1 rounded-lg bg-dark-border text-dark-muted text-xs font-bold hover:text-white transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(user.id)}
                            className="p-2 rounded-lg text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete user"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-dark-muted">
            Page {page} of {totalPages} · {total} users total
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-lg border border-dark-border text-dark-muted hover:text-white hover:border-dark-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-lg border border-dark-border text-dark-muted hover:text-white hover:border-dark-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
