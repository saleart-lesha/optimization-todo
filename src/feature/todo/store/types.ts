import type { Task } from '@/entities/todo-item';

export type TodoStore = {
  tasks: Task[];
  addTask: () => void;
  updateTask: (id: string, text: string, isCompleted: boolean) => void;
  removeTask: (id: string) => void;
  removeAllCompletedTasks: () => void;
  reorderTasks: (activeId: string, overId: string) => void;
};
