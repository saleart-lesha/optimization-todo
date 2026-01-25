import { Circle } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Item, ItemActions, ItemContent } from '@/shared/ui/item';
import { Textarea } from '@/shared/ui/textarea';

import type { TodoItemProps } from '../model';
import type { FC } from 'react';

export const TodoItem: FC<TodoItemProps> = ({ rightAction, text }) => {
  return (
    <Item className="group items-start gap-2 p-2" variant="outline">
      <ItemActions>
        <Button className="cursor-pointer rounded-full" variant={'ghost'} size={'icon'}>
          <Circle />
        </Button>
      </ItemActions>
      <ItemContent>
        <Textarea
          className="min-h-9 w-full resize-none overflow-hidden border-none bg-white shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0"
          defaultValue={text}
          rows={1}
        ></Textarea>
      </ItemContent>
      <ItemActions>{rightAction}</ItemActions>
    </Item>
  );
};
