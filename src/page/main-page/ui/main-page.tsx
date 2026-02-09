import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';

import { useTodoStore } from '@/feature/todo';
import { cn } from '@/shared/lib/utils/utils';
import { CompletedList } from '@/widget/completed-list';
import { TodoList } from '@/widget/todo-list';

import type { FC } from 'react';

export const MainPage: FC = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const reorderTasks = useTodoStore((s) => s.reorderTasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    reorderTasks(active.id as string, over.id as string);
  };

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const [isOpenCompleted, setIsOpenCompleted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5]">
      <div className="relative flex h-150 w-100 flex-col gap-1 overflow-hidden rounded-4xl border bg-white pt-3 shadow">
        <div className="pb-2 pl-4.25">
          <span className="text-lg font-semibold">Todo</span>
        </div>
        <hr />
        <div
          className={cn(
            'overflow-x-hidden overflow-y-auto pr-4 pl-4',
            !isOpenCompleted && completedTasks.length > 0 && 'pb-14'
          )}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <TodoList tasks={activeTasks} />
          </DndContext>
          {isOpenCompleted && completedTasks.length > 0 && (
            <>
              <hr className="-mx-4" />
              <CompletedList
                isOpen={isOpenCompleted}
                onToggle={setIsOpenCompleted}
                tasks={completedTasks}
              />
            </>
          )}
          {!isOpenCompleted && completedTasks.length > 0 && (
            <CompletedList
              isOpen={isOpenCompleted}
              onToggle={setIsOpenCompleted}
              tasks={completedTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
};
