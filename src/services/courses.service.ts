import api from './api'
import type { Course, CoursesFilter, PaginatedResponse, ApiResponse } from '@/types'

export const coursesService = {
  getAll: (params?: CoursesFilter) =>
    api.get<PaginatedResponse<Course>>('/api/courses', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Course>>(`/api/courses/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<Course[]>>('/api/courses/featured'),

  getLatest: (limit = 6) =>
    api.get<ApiResponse<Course[]>>('/api/courses/latest', { params: { limit } }),

  getByCategory: (category: string, params?: CoursesFilter) =>
    api.get<PaginatedResponse<Course>>(`/api/courses/category/${category}`, { params }),

  create: (data: Partial<Course> | FormData) =>
    api.post<ApiResponse<Course>>('/api/courses', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  update: (id: string, data: Partial<Course> | FormData) =>
    api.patch<ApiResponse<Course>>(`/api/courses/${id}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
    }),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/api/courses/${id}`),

  enroll: (courseId: string) =>
    api.post<ApiResponse<null>>(`/api/courses/${courseId}/enroll`),
}
