import api from './api'
import type { ApiResponse } from '@/types'

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar?: string | null
  bio?: string | null
  phone?: string | null
  location?: string | null
}

export const usersService = {
  getProfile: () =>
    api.get<ApiResponse<UserProfile>>('/api/users/me'),

  updateProfile: (data: Partial<UserProfile>) =>
    api.patch<ApiResponse<UserProfile>>('/api/users/me', data),

  updateAvatar: (formData: FormData) =>
    api.patch<ApiResponse<{ avatar: string }>>('/api/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch<ApiResponse<null>>('/api/users/me/password', data),

  getMyCourses: () =>
    api.get<ApiResponse<unknown[]>>('/api/users/me/courses'),

  getMyListings: () =>
    api.get<ApiResponse<unknown[]>>('/api/users/me/listings'),

  // Admin only
  getAll: (params?: Record<string, string | number>) =>
    api.get<ApiResponse<UserProfile[]>>('/api/users', { params }),

  getById: (id: string) =>
    api.get<ApiResponse<UserProfile>>(`/api/users/${id}`),

  deleteUser: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/users/${id}`),
}
