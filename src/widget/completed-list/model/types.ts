import type { Task } from '@/feature/todo';

export type CompletedListProps = {
  tasks: Task[];
  onToggle: (val: boolean) => void;
  isOpen: boolean;
};
