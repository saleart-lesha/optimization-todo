import { TrashIcon } from 'lucide-react';

import { TodoItem } from '@/entities/todo-item';
import { RemoveTodoButton, useTodoStore } from '@/feature/todo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';

import type { CompletedListProps } from '../model';
import type { FC } from 'react';

export const CompletedList: FC<CompletedListProps> = ({ tasks }) => {
  const updateTask = useTodoStore((s) => s.updateTask);
  const removeAllTasks = useTodoStore((s) => s.removeAllCompletedTasks);
  const completedCount = tasks.length;

  return (
    <Accordion type="single" collapsible defaultValue="completed">
      <AccordionItem value="completed">
        <AccordionTrigger
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
            className="rounded-full"
          >
            <TrashIcon />
          </Button>
        </AccordionTrigger>

        <AccordionContent>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              text={task.text}
              isCompleted={task.isCompleted}
              onSubmit={(text, isCompleted) => updateTask(task.id, text, isCompleted)}
              rightAction={<RemoveTodoButton todoId={task.id} />}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
