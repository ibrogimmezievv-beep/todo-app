'use client';

import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          'w-full bg-todo-800 border border-todo-700 rounded-lg px-4 py-2 text-todo-100 placeholder-todo-500 focus:outline-none focus:ring-2 focus:ring-todo-accent focus:border-transparent transition-all',
          error && 'border-todo-danger focus:ring-todo-danger',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-todo-danger">{error}</p>}
    </div>
  );
}
