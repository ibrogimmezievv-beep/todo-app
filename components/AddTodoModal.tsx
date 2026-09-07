'use client';

import { useState } from 'react';
import { useTodoStore } from '@/lib/store/todo-store';
import { Todo, TodoPriority, TodoCategory } from '@/lib/types/todo';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { X } from 'lucide-react';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTodo?: Todo | null;
}

const priorities: TodoPriority[] = ['low', 'medium', 'high'];
const categories: TodoCategory[] = ['work', 'personal', 'shopping', 'health', 'other'];

export function AddTodoModal({ isOpen, onClose, editingTodo }: AddTodoModalProps) {
  const { addTodo, updateTodo } = useTodoStore();
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [priority, setPriority] = useState<TodoPriority>(editingTodo?.priority || 'medium');
  const [category, setCategory] = useState<TodoCategory>(editingTodo?.category || 'personal');
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate || '');
  const [tags, setTags] = useState(editingTodo?.tags?.join(', ') || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const todoData = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate: dueDate || undefined,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean) || undefined,
      status: 'pending' as const,
    };

    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    setTags('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-todo-800 rounded-lg shadow-lg w-full max-w-2xl animate-bounce-in">
        <div className="flex items-center justify-between p-6 border-b border-todo-700">
          <h2 className="text-xl font-semibold text-todo-100">
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <button
            onClick={handleClose}
            className="text-todo-400 hover:text-todo-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-todo-200 mb-2">
              Title *
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              error={errors.title}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-todo-200 mb-2">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter optional description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-todo-200 mb-2">
                Priority
              </label>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TodoPriority)}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-todo-200 mb-2">
                Category
              </label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value as TodoCategory)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-todo-200 mb-2">
              Due Date
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-todo-200 mb-2">
              Tags (comma separated)
            </label>
            <Input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. urgent, home, shopping"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              {editingTodo ? 'Update Todo' : 'Add Todo'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
