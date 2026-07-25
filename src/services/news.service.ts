import api from './api'
import type { NewsArticle, PaginatedResponse, ApiResponse } from '@/types'

export const newsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<NewsArticle>>('/api/news', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<NewsArticle>>(`/api/news/${slug}`),

  getLatest: (limit = 6) =>
    api.get<ApiResponse<NewsArticle[]>>('/api/news/latest', { params: { limit } }),

  getFeatured: () =>
    api.get<ApiResponse<NewsArticle[]>>('/api/news/featured'),

  getByCategory: (category: string) =>
    api.get<ApiResponse<NewsArticle[]>>(`/api/news/category/${category}`),

  create: (data: Partial<NewsArticle> | FormData) =>
    api.post<ApiResponse<NewsArticle>>('/api/news', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  update: (id: string, data: Partial<NewsArticle> | FormData) =>
    api.patch<ApiResponse<NewsArticle>>(`/api/news/${id}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/news/${id}`),
}
