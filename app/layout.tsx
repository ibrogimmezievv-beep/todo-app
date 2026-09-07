import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App - Manage Your Tasks',
  description: 'A modern to-do list application with local storage functionality',
  keywords: 'todo, tasks, productivity, list',
  openGraph: {
    title: 'Todo App',
    description: 'A modern to-do list application',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
