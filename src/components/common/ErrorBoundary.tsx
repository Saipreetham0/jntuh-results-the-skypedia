'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log HMR-related errors in development
    if (process.env.NODE_ENV === 'development') {
      const isHMRError = error.message?.includes('module factory') ||
                         error.message?.includes('HMR');

      if (isHMRError) {
        console.log('HMR Error detected - page will auto-reload');
        // Auto-reload the page after HMR error
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        console.error('Error caught by boundary:', error, errorInfo);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Reloading...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Detected development update. Refreshing page...
            </p>
            <div className="mt-4 animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
