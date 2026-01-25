import { TrashIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { useTodoStore } from '../../store';

import type { RemoveTodoButtonProps } from '../../model';
import type { FC } from 'react';

export const RemoveTodoButton: FC<RemoveTodoButtonProps> = ({ todoId }) => {
  const removeTodo = useTodoStore((s) => s.removeTask);
  return (
    <Button
      className="text-muted-foreground pointer-events-none cursor-pointer opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-transparent hover:text-black focus-visible:bg-transparent"
      variant="ghost"
      size="icon"
      onClick={() => removeTodo(todoId)}
    >
      <TrashIcon />
    </Button>
  );
};
