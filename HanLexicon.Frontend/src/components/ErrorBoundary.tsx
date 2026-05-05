import React, { ErrorInfo, ReactNode } from 'react';
import { logger } from '@/src/utils/logger';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onCatch?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

import { AlertCircle, RotateCcw, Home, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

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
    logger.error('Uncaught error inside ErrorBoundary', error);
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
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden theme-app">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500 rounded-full -ml-48 -mt-48 blur-3xl opacity-10"></div>
          
          <div className="max-w-md w-full relative z-10 text-center space-y-8 animate-in fade-in zoom-in duration-500">
             <div className="relative inline-block">
                <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl border-4 border-white rotate-3">
                   <AlertCircle className="w-12 h-12" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-brand-accent animate-pulse" />
             </div>

             <div className="space-y-2">
                <h1 className="text-3xl font-black text-brand-ink uppercase italic">Hệ thống gặp sự cố</h1>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                   Đừng lo lắng, chúng tôi đã ghi nhận lỗi này. Bạn có thể thử tải lại trang hoặc quay về trang chủ.
                </p>
             </div>

             {process.env.NODE_ENV === 'development' && (
                <div className="p-4 bg-white border-2 border-rose-100 rounded-2xl text-left overflow-hidden">
                   <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Debug Info</p>
                   <code className="text-xs text-rose-600 font-bold break-all block">
                      {this.state.error?.message}
                   </code>
                </div>
             )}

             <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => window.location.reload()}
                  className="h-16 bg-brand-ink text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-5 h-5 text-brand-primary" /> Tải lại trang ngay
                </button>
                <a 
                  href="/"
                  className="h-16 bg-white border-2 border-brand-border text-brand-secondary rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-brand-highlight transition-all"
                >
                  <Home className="w-5 h-5" /> Về trang chủ
                </a>
             </div>
             
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">HanLexicon Rescue System</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
