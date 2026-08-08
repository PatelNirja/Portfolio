import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught Error in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0b0f19] text-center">
          <div className="max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-rose-600 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              An unhandled rendering error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-sky-600 text-white font-medium rounded-xl text-sm hover:bg-sky-500 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
