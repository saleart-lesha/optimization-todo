import { useState, type FC } from 'react';

import { useTodoStore } from '@/feature/todo';
import { cn } from '@/shared/lib/utils/utils';
import { CompletedList } from '@/widget/completed-list';
import { TodoList } from '@/widget/todo-list';

export const MainPage: FC = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const completedTasks = tasks.filter((item) => item.isCompleted);
  const ActivityTasks = tasks.filter((item) => !item.isCompleted);

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
          <TodoList tasks={ActivityTasks} />
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
