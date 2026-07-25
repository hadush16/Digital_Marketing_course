import api from './api'
import type { ApiResponse, User } from '@/types'

interface AuthPayload {
  name?: string
  email: string
  password: string
}

interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

interface MeResponse {
  id: string
  name: string
  email: string
  role: string
  avatar?: string | null
  createdAt: string
  updatedAt: string
}

export const authService = {
  register: (data: AuthPayload) =>
    api.post<ApiResponse<AuthResponse>>('/api/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<AuthResponse>>('/api/auth/login', data),

  googleLogin: (data: { credential: string }) =>
    api.post<ApiResponse<AuthResponse>>('/api/auth/google', data),

  refresh: (refreshToken: string) =>
    api.post<ApiResponse<{ accessToken: string }>>('/api/auth/refresh', { refreshToken }),

  logout: () =>
    api.post<ApiResponse<null>>('/api/auth/logout'),

  me: () =>
    api.get<ApiResponse<MeResponse>>('/api/auth/me'),
}
