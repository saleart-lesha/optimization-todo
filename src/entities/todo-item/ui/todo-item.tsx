import { CheckIcon, Circle } from 'lucide-react';
import { useEffect, useRef, useState, type FC } from 'react';

import { Button } from '@/shared/ui/button';
import { Item, ItemActions, ItemContent } from '@/shared/ui/item';
import { Textarea } from '@/shared/ui/textarea';

import type { TodoItemProps } from '../model';

export const TodoItem: FC<TodoItemProps> = ({
  rightAction,
  text,
  onCancel,
  onSubmit,
  isDraft,
  isCompleted = false,
}) => {
  const [value, setValue] = useState(text);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isDraft) {
      ref.current?.focus();
    }
  }, [isDraft]);

  const handleBlur = () => {
    if (!value.trim()) {
      onCancel?.();
    } else {
      onSubmit?.(value.trim(), isCompleted);
    }
  };

  return (
    <Item className="group items-start gap-2 p-2" variant="outline">
      <ItemActions>
        <Button
          onClick={() => onSubmit?.(value.trim(), !isCompleted)}
          className="cursor-pointer rounded-full"
          variant={'ghost'}
          size={'icon'}
        >
          {isCompleted ? <CheckIcon /> : <Circle />}
        </Button>
      </ItemActions>
      <ItemContent>
        <Textarea
          className="min-h-9 w-full resize-none overflow-hidden border-none bg-white shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0"
          rows={1}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          readOnly={isCompleted}
        ></Textarea>
      </ItemContent>
      <ItemActions>{rightAction}</ItemActions>
    </Item>
  );
};
