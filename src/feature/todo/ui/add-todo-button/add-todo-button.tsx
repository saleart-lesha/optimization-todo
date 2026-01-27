import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { AddTodoButtonProps } from '../../model';
import type { FC } from 'react';

export const AddTodoButton: FC<AddTodoButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={() => onClick()} variant="ghost" size="sm" className="w-fit rounded-s">
      <PlusIcon />
      <span>Добавить задачу</span>
    </Button>
  );
};
