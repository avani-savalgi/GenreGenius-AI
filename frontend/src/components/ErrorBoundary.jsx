import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-white">
          <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/50 max-w-2xl w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-500 p-3 rounded-lg">
                <AlertTriangle size={32} />
              </div>
              <h1 className="text-2xl font-bold text-red-400">Something went wrong.</h1>
            </div>
            
            <p className="text-slate-300 mb-6">
              The application encountered an unexpected error. This is usually caused by a missing file import or a data formatting issue.
            </p>

            <div className="bg-slate-900 p-4 rounded-lg overflow-auto max-h-64 border border-slate-800">
              <p className="text-red-400 font-mono text-sm mb-2">
                {this.state.error && this.state.error.toString()}
              </p>
              <pre className="text-xs text-slate-500 font-mono">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors w-full"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;