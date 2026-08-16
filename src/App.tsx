import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { store } from './redux/store'
import { router } from './routes'
import CookieConsentBanner from '@/components/ui/CookieConsentBanner'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'dark:bg-dark-card dark:text-dark-text border dark:border-dark-border',
              duration: 4000,
            }}
          />
          <CookieConsentBanner />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  )
}
