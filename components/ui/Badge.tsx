import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-todo-700 text-todo-100',
        variant === 'success' && 'bg-todo-success/20 text-todo-success',
        variant === 'warning' && 'bg-todo-warning/20 text-todo-warning',
        variant === 'danger' && 'bg-todo-danger/20 text-todo-danger',
        className
      )}
    >
      {children}
    </span>
  );
}
