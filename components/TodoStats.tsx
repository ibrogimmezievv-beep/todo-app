'use client';

import { useTodoStore } from '@/lib/store/todo-store';
import { cn } from '@/lib/utils/cn';
import { BarChart3 } from 'lucide-react';

export function TodoStats() {
  const { todos } = useTodoStore();

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.status === 'completed').length;
  const pendingTodos = todos.filter((t) => t.status === 'pending').length;
  const highPriorityTodos = todos.filter(
    (t) => t.priority === 'high' && t.status === 'pending'
  ).length;

  const completionPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Total */}
      <div className="bg-todo-800 border border-todo-700 rounded-lg p-4">
        <p className="text-sm text-todo-400">Total Todos</p>
        <p className="text-3xl font-bold text-todo-100 mt-1">{totalTodos}</p>
      </div>

      {/* Completed */}
      <div className="bg-todo-800 border border-todo-700 rounded-lg p-4">
        <p className="text-sm text-todo-400">Completed</p>
        <p className="text-3xl font-bold text-todo-success mt-1">{completedTodos}</p>
        <div className="w-full bg-todo-700 rounded-full h-1.5 mt-2">
          <div
            className="bg-todo-success h-1.5 rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Pending */}
      <div className="bg-todo-800 border border-todo-700 rounded-lg p-4">
        <p className="text-sm text-todo-400">Pending</p>
        <p className="text-3xl font-bold text-todo-warning mt-1">{pendingTodos}</p>
      </div>

      {/* High Priority */}
      <div className="bg-todo-800 border border-todo-700 rounded-lg p-4">
        <p className="text-sm text-todo-400">High Priority</p>
        <p className="text-3xl font-bold text-todo-danger mt-1">{highPriorityTodos}</p>
      </div>
    </div>
  );
}
