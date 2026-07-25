import api from './api'
import type { ApiResponse } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  avatar: string | null
  createdAt: string
}

export interface Subscriber {
  id: string
  email: string
  name: string | null
  subscribedAt: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}

export interface PaginatedResult<T> {
  success: boolean
  data: T[]
  pagination: PaginationMeta
}

export interface AdminStats {
  totalUsers: number
  totalSubscribers: number
  totalCourses: number
  totalListings: number
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const adminService = {
  // Fetch paginated user list (admin only)
  getUsers: (page = 1, limit = 10) =>
    api.get<PaginatedResult<AdminUser>>(`/api/users?page=${page}&limit=${limit}`),

  // Update user role
  updateUserRole: (userId: string, role: 'USER' | 'INSTRUCTOR' | 'ADMIN') =>
    api.patch<ApiResponse<AdminUser>>(`/api/users/${userId}`, { role }),

  // Delete a user
  deleteUser: (userId: string) =>
    api.delete<ApiResponse<null>>(`/api/users/${userId}`),

  // ─── Subscribers ─────────────────────────────────────────────────────────

  getSubscribers: (page = 1, limit = 20) =>
    api.get<PaginatedResult<Subscriber>>(`/api/subscribers?page=${page}&limit=${limit}`),

  deleteSubscriber: (email: string) =>
    api.delete<ApiResponse<null>>(`/api/subscribers/${encodeURIComponent(email)}`),

  // ─── Stats ───────────────────────────────────────────────────────────────

  // Fetch aggregate stats for admin overview
  getStats: async (): Promise<AdminStats> => {
    const [usersRes, subscribersRes] = await Promise.allSettled([
      api.get<PaginatedResult<AdminUser>>('/api/users?limit=1'),
      api.get<PaginatedResult<Subscriber>>('/api/subscribers?limit=1'),
    ])

    return {
      totalUsers:
        usersRes.status === 'fulfilled' ? usersRes.value.data.pagination.total : 0,
      totalSubscribers:
        subscribersRes.status === 'fulfilled' ? subscribersRes.value.data.pagination.total : 0,
      totalCourses: 0,    // extend when course API count is added
      totalListings: 0,   // extend when marketplace API count is added
    }
  },

  // ─── User self-update (for user dashboard profile page) ──────────────────

  updateProfile: (userId: string, data: { name?: string }) =>
    api.patch<ApiResponse<AdminUser>>(`/api/users/${userId}`, data),
}
