import { useAppSelector } from './useRedux'

export function useAuth() {
  const auth = useAppSelector((state) => state.auth)
  return {
    user:            auth.user,
    token:           auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading:       auth.isLoading,
    isAdmin:         auth.user?.role?.toLowerCase() === 'admin',
    isInstructor:    auth.user?.role?.toLowerCase() === 'instructor' || auth.user?.role?.toLowerCase() === 'admin',
  }
}
