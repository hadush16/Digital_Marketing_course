import api from './api'
import type { MobileSolution, PaginatedResponse, ApiResponse } from '@/types'

export const mobileSolutionsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<MobileSolution>>('/api/mobile-solutions', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<MobileSolution>>(`/api/mobile-solutions/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<MobileSolution[]>>('/api/mobile-solutions/featured'),

  getByCategory: (category: string) =>
    api.get<ApiResponse<MobileSolution[]>>(`/api/mobile-solutions/category/${category}`),

  create: (data: Partial<MobileSolution> | FormData) =>
    api.post<ApiResponse<MobileSolution>>('/api/mobile-solutions', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  update: (id: string, data: Partial<MobileSolution> | FormData) =>
    api.patch<ApiResponse<MobileSolution>>(`/api/mobile-solutions/${id}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/mobile-solutions/${id}`),
}
