import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './useRedux'
import { setTheme } from '@/redux/slices/themeSlice'

export function useTheme() {
  const dispatch  = useAppDispatch()
  const mode      = useAppSelector((state) => state.theme.mode)
  const isDark    = mode === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggle = () => dispatch(setTheme(isDark ? 'light' : 'dark'))

  return { mode, isDark, toggle }
}
