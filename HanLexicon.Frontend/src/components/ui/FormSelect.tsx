import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  icon?: React.ReactNode;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <select
          ref={ref}
          className={cn(
            "w-full h-12 px-4 bg-brand-surface rounded-xl border border-transparent font-bold text-sm text-brand-ink outline-none transition-all appearance-none",
            "focus:border-brand-primary focus:bg-white focus:shadow-lg focus:shadow-brand-primary/5",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
          {icon || <ChevronDown className="w-4 h-4" />}
        </div>
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
