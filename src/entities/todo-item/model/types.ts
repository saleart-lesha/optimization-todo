import type { ReactNode } from 'react';

export type TodoItemProps = {
  rightAction: ReactNode;
  text: string;
  isDraft?: boolean;
  onSubmit?: (text: string, isCompleted: boolean) => void;
  onCancel?: () => void;
  isCompleted?: boolean;
};
