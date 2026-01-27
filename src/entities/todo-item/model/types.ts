import type { ReactNode } from 'react';

export type TodoItemProps = {
  rightAction: ReactNode;
  text: string;
  isDraft?: boolean;
  onSubmit: (text: string) => void;
  onCancel: () => void;
};
