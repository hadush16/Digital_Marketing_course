import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FavoritesState } from '@/types'

const loadFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem('ryoit_favorites')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveToStorage = (ids: string[]) => {
  localStorage.setItem('ryoit_favorites', JSON.stringify(ids))
}

const initialState: FavoritesState = {
  items: loadFromStorage().map((id) => ({ listingId: id, savedAt: new Date().toISOString() })),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const listingId = action.payload
      const existingIndex = state.items.findIndex((f) => f.listingId === listingId)
      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1)
      } else {
        state.items.push({ listingId, savedAt: new Date().toISOString() })
      }
      saveToStorage(state.items.map((f) => f.listingId))
    },
    clearFavorites(state) {
      state.items = []
      localStorage.removeItem('ryoit_favorites')
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
