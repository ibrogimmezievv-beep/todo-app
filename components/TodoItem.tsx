'use client';

import { Todo } from '@/lib/types/todo';
import { useTodoStore } from '@/lib/store/todo-store';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import {
  categoryEmojis,
  categoryLabels,
  formatDate,
  isOverdue,
  isToday,
  priorityColors,
  priorityLabels,
} from '@/lib/utils/todo-utils';
import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { deleteTodo, toggleTodo } = useTodoStore();
  const isCompleted = todo.status === 'completed';
  const isDue = todo.dueDate && isOverdue(todo.dueDate) && !isCompleted;
  const isToday_ = todo.dueDate && isToday(todo.dueDate);

  return (
    <div
      className={cn(
        'bg-todo-800 border border-todo-700 rounded-lg p-4 transition-all hover:border-todo-accent/50 animate-slide-up',
        isCompleted && 'opacity-60',
        isDue && 'border-l-4 border-l-todo-danger'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className="flex-shrink-0 mt-1 text-todo-400 hover:text-todo-accent transition-colors"
          aria-label="Toggle todo"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-todo-success" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <div className="flex-1">
              <h3
                className={cn(
                  'font-medium text-todo-100 break-words',
                  isCompleted && 'line-through text-todo-500'
                )}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p className={cn('text-sm text-todo-400 mt-1', isCompleted && 'line-through')}>
                  {todo.description}
                </p>
              )}
            </div>
            <span className="text-xl flex-shrink-0">
              {categoryEmojis[todo.category]}
            </span>
          </div>

          {/* Tags */}
          {todo.tags && todo.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-2">
              {todo.tags.map((tag) => (
                <Badge key={tag} variant="default" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <Badge
              variant="default"
              className={cn('text-xs', priorityColors[todo.priority])}
            >
              {priorityLabels[todo.priority]}
            </Badge>
            <Badge variant="default" className="text-xs">
              {categoryLabels[todo.category]}
            </Badge>
            {todo.dueDate && (
              <Badge
                variant={isDue ? 'danger' : isToday_ ? 'warning' : 'default'}
                className="text-xs"
              >
                {formatDate(todo.dueDate)}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(todo)}
            aria-label="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4 text-todo-danger" />
          </Button>
        </div>
      </div>
    </div>
  );
}
