import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onCatch?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * A generic React Error Boundary to prevent crashes in the component tree.
 * Can be wrapped around the entire App or specific fragile features (like dynamic content).
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside ErrorBoundary:', error, errorInfo);
    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-6 m-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-3xl">
            ⚠️
          </div>
          <div>
            <h2 className="text-lg font-bold text-rose-800">Đã xảy ra lỗi không mong muốn</h2>
            <p className="text-sm text-rose-600 mt-1 max-w-sm">
              {this.state.error?.message || 'Có lỗi xảy ra khi tải nội dung này. Vui lòng thử tải lại trang.'}
            </p>
          </div>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-6 py-2 bg-rose-600 text-white font-bold rounded-xl shadow-sm hover:bg-rose-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
