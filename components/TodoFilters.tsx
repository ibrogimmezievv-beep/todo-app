'use client';

import { useTodoStore } from '@/lib/store/todo-store';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { Todo, TodoPriority, TodoCategory, TodoStatus } from '@/lib/types/todo';
import { Filter, X } from 'lucide-react';

interface TodoFiltersProps {
  onClearFilters: () => void;
}

const priorities: TodoPriority[] = ['low', 'medium', 'high'];
const categories: TodoCategory[] = ['work', 'personal', 'shopping', 'health', 'other'];
const statuses: TodoStatus[] = ['pending', 'completed'];

export function TodoFilters({ onClearFilters }: TodoFiltersProps) {
  const { filter, setFilter, todos } = useTodoStore();

  const hasActiveFilters =
    filter.status !== 'all' ||
    filter.priority !== 'all' ||
    filter.category !== 'all' ||
    filter.search !== '';

  return (
    <div className="bg-todo-800 border border-todo-700 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-todo-200">
        <Filter className="w-5 h-5" />
        <h3 className="font-semibold">Filters</h3>
      </div>

      <div className="space-y-3">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-todo-300 mb-1">
            Search
          </label>
          <Input
            type="text"
            placeholder="Search todos..."
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-todo-300 mb-1">
            Status
          </label>
          <Select
            value={filter.status}
            onChange={(e) => setFilter({ status: e.target.value as 'all' | TodoStatus })}
          >
            <option value="all">All Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </Select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-todo-300 mb-1">
            Priority
          </label>
          <Select
            value={filter.priority}
            onChange={(e) => setFilter({ priority: e.target.value as 'all' | TodoPriority })}
          >
            <option value="all">All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </Select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-todo-300 mb-1">
            Category
          </label>
          <Select
            value={filter.category}
            onChange={(e) => setFilter({ category: e.target.value as 'all' | TodoCategory })}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="danger"
            size="sm"
            onClick={onClearFilters}
            className="w-full flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
