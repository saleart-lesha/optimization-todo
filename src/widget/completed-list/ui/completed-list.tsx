import { TrashIcon } from 'lucide-react';

import { TodoItem } from '@/entities/todo-item';
import { RemoveTodoButton, useTodoStore } from '@/feature/todo';
import { cn } from '@/shared/lib/utils/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';

import type { CompletedListProps } from '../model';
import type { FC } from 'react';

export const CompletedList: FC<CompletedListProps> = ({ tasks, isOpen, onToggle }) => {
  const updateTask = useTodoStore((s) => s.updateTask);
  const removeAllTasks = useTodoStore((s) => s.removeAllCompletedTasks);
  const completedCount = tasks.length;

  return (
    <Accordion
      className={cn('w-full', !isOpen && 'absolute bottom-0 left-0 w-96 rounded-4xl bg-white px-4')}
      type="single"
      collapsible
      value={isOpen ? 'completed' : undefined}
      onValueChange={(value) => {
        onToggle(!!value);
      }}
    >
      <AccordionItem value="completed">
        {!isOpen && <hr className="-mx-4" />}
        <AccordionTrigger
          className="text-md -mx-3.75 pt-1 pb-2 font-semibold"
          text={
            <div className="flex cursor-pointer gap-1">
              <span>Выполненные</span>
              <span className="group-data-[state=open]:hidden">({completedCount})</span>
            </div>
          }
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              removeAllTasks();
            }}
            variant="ghost"
            size="icon"
            className="-mx-5 rounded-full"
          >
            <TrashIcon />
          </Button>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onSubmit={(text, isCompleted) => updateTask(task.id, text, isCompleted)}
                rightAction={<RemoveTodoButton todoId={task.id} />}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
