'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-todo-accent disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' &&
          'bg-todo-accent text-white hover:bg-todo-accent-dark focus:ring-offset-todo-800',
        variant === 'secondary' &&
          'bg-todo-700 text-todo-100 hover:bg-todo-600 focus:ring-offset-todo-800',
        variant === 'danger' &&
          'bg-todo-danger text-white hover:bg-opacity-90 focus:ring-offset-todo-800',
        variant === 'ghost' &&
          'text-todo-300 hover:text-todo-100 hover:bg-todo-800 focus:ring-offset-todo-800',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
