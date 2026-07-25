import { createSlice } from '@reduxjs/toolkit'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('ryoit_theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeState {
  mode: Theme
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('ryoit_theme', state.mode)
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
    setTheme(state, action) {
      state.mode = action.payload
      localStorage.setItem('ryoit_theme', state.mode)
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
