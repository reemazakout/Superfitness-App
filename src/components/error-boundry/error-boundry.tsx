import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";

// Props
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // log the error to an external service here
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  // User-friendly error messages
  getUserFriendlyMessage = (error: Error): string => {
    const message = error.message.toLowerCase();

    if (message.includes("network") || message.includes("fetch")) {
      return "Check your internet connection and try again.";
    }
    if (message.includes("chunkloaderror") || message.includes("loading chunk")) {
      return "Please refresh the page to load the latest version.";
    }
    if (message.includes("timeout")) {
      return "The request took too long. Please try again.";
    }
    if (message.includes("permission") || message.includes("unauthorized")) {
      return "You may not have permission to access this resource.";
    }
    return "An unexpected error occurred. Our team has been notified.";
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="h-screen flex items-center justify-center bg-surface px-4">
            <div className="max-w-md w-full bg-gray-950 rounded-lg shadow-lg border  p-8 text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <TriangleAlert className="w-8 h-8 text-red-500" />
                </div>
              </div>

              {/* Error Content */}
              <h2 className="text-xl font-semibold text-white mb-3">Oops! Something went wrong</h2>
              <p className="text-white mb-6 leading-relaxed">
                We encountered an unexpected error. Don't worry, this happens sometimes. You can try
                refreshing the page or go back and try again.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant={"flame"}
                  onClick={this.handleRefresh}
                  className="px-6 py-2.5 mx-auto font-medium rounded-lg"
                >
                  Refresh Page
                </Button>
              </div>

              {/* Error Details (only in development mode) */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-white font-medium">
                    Error Details
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-xs text-gray-700 font-mono overflow-auto">
                    <pre>{this.state.error.stack}</pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
