import api from './api'
import type { MarketplaceListing, MarketplaceFilter, PaginatedResponse, ApiResponse } from '@/types'

export const marketplaceService = {
  getAll: (params?: MarketplaceFilter) =>
    api.get<PaginatedResponse<MarketplaceListing>>('/api/marketplace', { params }),

  getById: (id: string) =>
    api.get<ApiResponse<MarketplaceListing>>(`/api/marketplace/${id}`),

  getFeatured: () =>
    api.get<ApiResponse<MarketplaceListing[]>>('/api/marketplace/featured'),

  getLatest: (limit = 6) =>
    api.get<ApiResponse<MarketplaceListing[]>>('/api/marketplace/latest', { params: { limit } }),

  create: (data: Partial<MarketplaceListing> | FormData) =>
    api.post<ApiResponse<MarketplaceListing>>('/api/marketplace', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  update: (id: string, data: Partial<MarketplaceListing> | FormData) =>
    api.patch<ApiResponse<MarketplaceListing>>(`/api/marketplace/${id}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/marketplace/${id}`),

  like: (id: string) =>
    api.post<ApiResponse<null>>(`/api/marketplace/${id}/like`),

  bookmark: (id: string) =>
    api.post<ApiResponse<null>>(`/api/marketplace/${id}/bookmark`),

  report: (id: string, reason: string) =>
    api.post<ApiResponse<null>>(`/api/marketplace/${id}/report`, { reason }),
}
