import type { Task } from '@/feature/todo';

import type { ReactNode } from 'react';

export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
  isDraft?: boolean;
};

export type TodoItemProps = {
  rightAction: ReactNode;
  isDraft?: boolean;
  onSubmit?: (text: string, isCompleted: boolean) => void;
  onCancel?: () => void;
  task: Task;
};
