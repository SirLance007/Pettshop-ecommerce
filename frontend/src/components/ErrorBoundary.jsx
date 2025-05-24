import React from 'react';
import { announce } from '../utils/accessibility';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Announce error to screen readers
    announce('An error has occurred. Please try refreshing the page.', 'assertive');

    // Log error to your error tracking service
    console.error('Error caught by boundary:', error, errorInfo);
    // Example: Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert"
          className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
        >
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Oops! Something went wrong
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                           hover:bg-blue-700 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Refresh Page
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg
                           hover:bg-gray-300 focus:outline-none focus:ring-2
                           focus:ring-gray-500 focus:ring-offset-2 transition-colors
                           dark:bg-gray-700 dark:text-gray-200"
                >
                  Go Back
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="mt-6 text-left">
                  <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
                    Technical Details
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-auto text-xs">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 