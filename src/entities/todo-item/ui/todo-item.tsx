import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckIcon, Circle, GripVertical } from 'lucide-react';
import { useEffect, useRef, useState, type FC } from 'react';

import { Button } from '@/shared/ui/button';
import { Item, ItemActions, ItemContent } from '@/shared/ui/item';
import { Textarea } from '@/shared/ui/textarea';

import type { TodoItemProps } from '../model';

export const TodoItem: FC<TodoItemProps> = ({ rightAction, onCancel, onSubmit, isDraft, task }) => {
  const [value, setValue] = useState(task.text);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isDraft) ref.current?.focus();
  }, [isDraft]);

  const handleBlur = () => {
    if (!value.trim()) {
      onCancel?.();
    } else {
      onSubmit?.(value.trim(), task.isCompleted);
    }
  };

  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      className="group items-start gap-1 p-0"
      ref={setNodeRef}
      style={{ ...style, touchAction: 'none' }}
      {...attributes}
    >
      <ItemActions>
        <Button
          {...listeners}
          ref={setActivatorNodeRef}
          className="text-muted-foreground -mx-4 cursor-grab pr-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-transparent hover:text-black focus-visible:bg-transparent active:cursor-grabbing"
          variant={'ghost'}
          size={'none'}
        >
          <GripVertical />
        </Button>
        <Button
          onClick={() => onSubmit?.(value.trim(), !task.isCompleted)}
          className="cursor-pointer rounded-full p-1"
          variant={'ghost'}
          size={'none'}
        >
          {task.isCompleted ? <CheckIcon /> : <Circle />}
        </Button>
      </ItemActions>
      <ItemContent>
        <Textarea
          className="min-h-6 w-full resize-none overflow-hidden border-none bg-white p-0.5 break-all shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0"
          rows={1}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          readOnly={task.isCompleted}
        />
      </ItemContent>
      <ItemActions>{rightAction}</ItemActions>
    </Item>
  );
};
