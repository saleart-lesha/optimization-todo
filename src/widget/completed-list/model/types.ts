import type { Task } from '@/entities/todo-item';

export type CompletedListProps = {
  tasks: Task[];
  onToggle: (val: boolean) => void;
  isOpen: boolean;
};
