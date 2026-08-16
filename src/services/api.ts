import axios from 'axios'
import { store } from '@/redux/store'
import { logout } from '@/redux/slices/authSlice'

// VITE_API_URL should be the root origin, e.g. http://localhost:5000
// All service calls already include /api/* paths, so do NOT add /api here.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ryoit-api.onrender.com'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.includes('/api/auth/')
    const isLoginPage = window.location.pathname === '/login' || window.location.pathname === '/register'
    
    if (error.response?.status === 401 && !isAuthRoute && !isLoginPage) {
      store.dispatch(logout())
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
