export type TodoStatus = 'pending' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface TodoStore {
  todos: Todo[];
  filter: {
    status: 'all' | TodoStatus;
    priority: 'all' | TodoPriority;
    category: 'all' | TodoCategory;
    search: string;
  };
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: Partial<TodoStore['filter']>) => void;
  clearCompleted: () => void;
  getTodos: () => Todo[];
}
