export const categoryColors: Record<string, string> = {
  work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

export const priorityColors: Record<string, string> = {
  low: 'text-todo-400',
  medium: 'text-todo-warning',
  high: 'text-todo-danger',
};

export const categoryEmojis: Record<string, string> = {
  work: '💼',
  personal: '👤',
  shopping: '🛍️',
  health: '🏥',
  other: '📌',
};

export const priorityLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const categoryLabels: Record<string, string> = {
  work: 'Work',
  personal: 'Personal',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function isOverdue(dueDate: string): boolean {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
}

export function isToday(dueDate: string): boolean {
  const due = new Date(dueDate);
  const today = new Date();
  return due.toDateString() === today.toDateString();
}

export function isTomorrow(dueDate: string): boolean {
  const due = new Date(dueDate);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return due.toDateString() === tomorrow.toDateString();
}
