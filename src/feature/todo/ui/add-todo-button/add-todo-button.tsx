import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { AddTodoButtonProps } from '../../model';
import type { FC } from 'react';

export const AddTodoButton: FC<AddTodoButtonProps> = ({ onClick }) => {
  return (
    <Button
      data-testid="add-todo-button"
      onClick={() => onClick()}
      variant="ghost"
      size="sm"
      className="-ml-1.5 w-fit rounded-s"
    >
      <div className="flex items-center gap-2">
        <PlusIcon />
        <span>Добавить задачу</span>
      </div>
    </Button>
  );
};
