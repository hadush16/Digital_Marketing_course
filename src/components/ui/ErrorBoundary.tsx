import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4">
          <div className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-dark-border text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops, something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
