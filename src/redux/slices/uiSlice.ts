import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  mobileMenuOpen: boolean
  searchOpen: boolean
  activeModal: string | null
}

const initialState: UIState = {
  mobileMenuOpen: false,
  searchOpen:     false,
  activeModal:    null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false
    },
    toggleSearch(state) {
      state.searchOpen = !state.searchOpen
    },
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload
    },
    closeModal(state) {
      state.activeModal = null
    },
  },
})

export const {
  toggleMobileMenu, closeMobileMenu,
  toggleSearch, openModal, closeModal,
} = uiSlice.actions
export default uiSlice.reducer
