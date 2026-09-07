'use client';

import { useState, useEffect } from 'react';
import { useTodoStore } from '@/lib/store/todo-store';
import { Todo } from '@/lib/types/todo';
import { AddTodoModal } from '@/components/AddTodoModal';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilters } from '@/components/TodoFilters';
import { TodoStats } from '@/components/TodoStats';
import { Button } from '@/components/ui/Button';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { getTodos, clearCompleted, filter, setFilter } = useTodoStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const todos = getTodos();
  const hasCompletedTodos = useTodoStore().todos.some((t) => t.status === 'completed');

  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleClearFilters = () => {
    setFilter({
      status: 'all',
      priority: 'all',
      category: 'all',
      search: '',
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-todo-900 flex items-center justify-center">
        <p className="text-todo-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-todo-900 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-todo-100">
              My Tasks
            </h1>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddTodo}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Todo
            </Button>
          </div>
          <p className="text-todo-400">Manage your daily tasks efficiently</p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TodoStats />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TodoFilters onClearFilters={handleClearFilters} />
            </div>
          </div>

          {/* Todos List */}
          <div className="lg:col-span-3 space-y-4">
            {todos.length > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-todo-400 text-sm">
                    Showing {todos.length} of {useTodoStore().todos.length} tasks
                  </p>
                </div>
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onEdit={handleEditTodo}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-todo-800 border border-todo-700 rounded-lg p-12 text-center">
                {useTodoStore().todos.length === 0 ? (
                  <>
                    <AlertCircle className="w-12 h-12 text-todo-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-todo-300 mb-2">
                      No todos yet
                    </h3>
                    <p className="text-todo-500 mb-6">
                      Create your first task to get started
                    </p>
                    <Button variant="primary" onClick={handleAddTodo}>
                      Create First Todo
                    </Button>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-12 h-12 text-todo-success mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-todo-300 mb-2">
                      No todos match your filters
                    </h3>
                    <p className="text-todo-500 mb-6">
                      Try adjusting your filter criteria
                    </p>
                    <Button variant="secondary" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Clear Completed Button */}
            {hasCompletedTodos && (
              <div className="pt-4">
                <Button
                  variant="ghost"
                  onClick={clearCompleted}
                  className="w-full"
                >
                  Clear Completed Tasks
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTodo={editingTodo}
      />
    </div>
  );
}
