# Todo App - Modern Task Management

A feature-rich, modern to-do list application built with Next.js, React, and Tailwind CSS. Manage your tasks efficiently with local storage persistence.

## Features

### ✨ Core Features
- **Add/Edit/Delete Tasks** - Full CRUD operations for todo items
- **Task Status** - Mark tasks as pending or completed
- **Priority Levels** - Set task priority (Low, Medium, High)
- **Categories** - Organize tasks by category (Work, Personal, Shopping, Health, Other)
- **Due Dates** - Assign and track due dates for tasks
- **Tags** - Add multiple tags to tasks for better organization
- **Search** - Full-text search across tasks
- **Filtering** - Filter by status, priority, category, and search terms
- **Statistics** - View task completion metrics and progress
- **Local Storage** - All data persists in browser local storage
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Dark Theme** - Modern dark interface optimized for eyes
- **Animations** - Smooth transitions and animations
- **Accessibility** - Full keyboard navigation and screen reader support

## Tech Stack

| Technology | Purpose |
|------------|----------|
| Next.js 14 | React framework with App Router |
| React 18 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | State management with persistence |
| Lucide React | Icon library |

## Project Structure

```
todo-app/
├── app/
│   ├── page.tsx                 # Main page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── AddTodoModal.tsx          # Add/Edit todo modal
│   ├── TodoItem.tsx              # Individual todo card
│   ├── TodoFilters.tsx           # Filter controls
│   ├── TodoStats.tsx             # Statistics display
│   └── ui/
│       ├── Button.tsx            # Button component
│       ├── Input.tsx             # Input component
│       ├── Textarea.tsx          # Textarea component
│       ├── Select.tsx            # Select component
│       └── Badge.tsx             # Badge component
├── lib/
│   ├── types/
│   │   └── todo.ts              # TypeScript interfaces
│   ├── store/
│   │   └── todo-store.ts        # Zustand store with localStorage
│   └── utils/
│       ├── cn.ts                # Class name utility
│       └── todo-utils.ts        # Todo utility functions
├── Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── postcss.config.js
│   ├── .eslintrc.json
│   └── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/ibrogimmezievv-beep/todo-app.git
cd todo-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Adding a Todo
1. Click the "Add Todo" button in the header
2. Fill in the task details:
   - **Title** (required): Task name
   - **Description** (optional): Detailed description
   - **Priority**: Low, Medium, or High
   - **Category**: Work, Personal, Shopping, Health, or Other
   - **Due Date** (optional): When the task is due
   - **Tags** (optional): Comma-separated tags for organization
3. Click "Add Todo" to save

### Managing Todos
- **Complete Task**: Click the circle icon to mark as done
- **Edit Task**: Click the edit icon to modify
- **Delete Task**: Click the trash icon to remove
- **Search**: Use the search box to find tasks by title or description
- **Filter**: Use filters to organize tasks by status, priority, or category

### Viewing Statistics
- **Total Todos**: Total number of all tasks
- **Completed**: Number of completed tasks with progress bar
- **Pending**: Number of tasks still to do
- **High Priority**: Count of high-priority pending tasks

## Local Storage

All tasks are automatically saved to browser's local storage. Data persists across:
- Page refreshes
- Browser restarts
- Device restarts (as long as local storage is not cleared)

### Clear Data
To clear all data, open browser DevTools and run:
```javascript
localStorage.removeItem('todo-store');
localStorage.clear(); // Clears all local storage
```

## Color Scheme

```
Background:    #0f172a (todo-900)
Surfaces:      #1e293b - #475569 (todo-800 to todo-600)
Text Primary:  #f1f5f9 (todo-100)
Text Secondary:#cbd5e1 - #94a3b8 (todo-300 to todo-400)
Accent:        #3b82f6 (blue)
Success:       #10b981 (green)
Warning:       #f59e0b (amber)
Danger:        #ef4444 (red)
```

## API Reference

### Store Methods

```typescript
interface TodoStore {
  // Data
  todos: Todo[];              // All todos
  filter: FilterState;        // Current filters

  // Methods
  addTodo(todo): void;        // Add new todo
  updateTodo(id, data): void; // Update existing todo
  deleteTodo(id): void;       // Delete a todo
  toggleTodo(id): void;       // Toggle completion status
  setFilter(filter): void;    // Update filters
  clearCompleted(): void;     // Remove all completed todos
  getTodos(): Todo[];         // Get filtered todos
}
```

### Todo Interface

```typescript
interface Todo {
  id: string;                              // Unique identifier
  title: string;                           // Task title
  description?: string;                    // Optional description
  status: 'pending' | 'completed';         // Task status
  priority: 'low' | 'medium' | 'high';     // Priority level
  category: 'work' | 'personal' | ...;     // Task category
  dueDate?: string;                        // Optional due date
  tags?: string[];                         // Optional tags
  createdAt: string;                       // Creation timestamp
  updatedAt: string;                       // Last update timestamp
}
```

## Keyboard Shortcuts

- `Tab` - Navigate between elements
- `Enter` - Submit form or activate button
- `Escape` - Close modal

## Performance

✅ Optimized re-renders with Zustand
✅ Efficient filtering and searching
✅ Minimal bundle size
✅ Fast local storage operations
✅ No unnecessary re-renders

## Accessibility

✅ Semantic HTML
✅ ARIA labels on buttons
✅ Keyboard navigation support
✅ Focus management
✅ Color contrast compliance
✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Future Enhancements

- [ ] Due date notifications
- [ ] Recurring tasks
- [ ] Task categories with colors
- [ ] Subtasks/Checklists
- [ ] Export to PDF/CSV
- [ ] Cloud sync (Firebase, Supabase)
- [ ] Collaborative tasks
- [ ] Mobile app (React Native)
- [ ] Dark/Light mode toggle
- [ ] Task templates

## Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Type Checking

```bash
# Check TypeScript types
npm run type-check
```

## Linting

```bash
# Run ESLint
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions, please create a GitHub issue.

## Changelog

### v1.0.0 (Initial Release)
- Core todo CRUD operations
- Local storage persistence
- Filter and search functionality
- Priority and category system
- Due date tracking
- Task statistics
- Responsive design
- Full TypeScript support
- Accessibility features
