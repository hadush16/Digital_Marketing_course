import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User, AuthState } from '@/types'

const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem('ryoit_user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const initialState: AuthState = {
  user:            getInitialUser(),
  token:           localStorage.getItem('ryoit_token'),
  isAuthenticated: !!localStorage.getItem('ryoit_token'),
  isLoading:       false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user            = action.payload.user
      state.token           = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('ryoit_token', action.payload.token)
      localStorage.setItem('ryoit_user', JSON.stringify(action.payload.user))
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('ryoit_user', JSON.stringify(state.user))
      }
    },
    logout(state) {
      state.user            = null
      state.token           = null
      state.isAuthenticated = false
      localStorage.removeItem('ryoit_token')
      localStorage.removeItem('ryoit_user')
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const { setCredentials, updateUser, logout, setLoading } = authSlice.actions
export default authSlice.reducer
