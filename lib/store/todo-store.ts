'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, TodoStore } from './types/todo';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTodoStore = create<TodoStore>(
  persist(
    (set, get) => ({
      todos: [],
      filter: {
        status: 'all',
        priority: 'all',
        category: 'all',
        search: '',
      },
      addTodo: (todoData) => {
        const newTodo: Todo = {
          ...todoData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },
      updateTodo: (id, updatedData) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updatedData, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
      },
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  status: todo.status === 'completed' ? 'pending' : 'completed',
                  updatedAt: new Date().toISOString(),
                }
              : todo
          ),
        }));
      },
      setFilter: (filter) => {
        set((state) => ({
          filter: { ...state.filter, ...filter },
        }));
      },
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.status !== 'completed'),
        }));
      },
      getTodos: () => {
        const state = get();
        let filtered = state.todos;

        if (state.filter.status !== 'all') {
          filtered = filtered.filter((todo) => todo.status === state.filter.status);
        }

        if (state.filter.priority !== 'all') {
          filtered = filtered.filter((todo) => todo.priority === state.filter.priority);
        }

        if (state.filter.category !== 'all') {
          filtered = filtered.filter((todo) => todo.category === state.filter.category);
        }

        if (state.filter.search) {
          const searchLower = state.filter.search.toLowerCase();
          filtered = filtered.filter(
            (todo) =>
              todo.title.toLowerCase().includes(searchLower) ||
              todo.description?.toLowerCase().includes(searchLower) ||
              todo.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
          );
        }

        return filtered;
      },
    }),
    {
      name: 'todo-store',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);
