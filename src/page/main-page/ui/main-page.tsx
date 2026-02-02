import { useTodoStore } from '@/feature/todo';
import { CompletedList } from '@/widget/completed-list';
import { TodoList } from '@/widget/todo-list';

import type { FC } from 'react';

export const MainPage: FC = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const completedTasks = tasks.filter((item) => item.isCompleted);
  const ActivityTasks = tasks.filter((item) => !item.isCompleted);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5]">
      <div className="flex h-150 w-100 flex-col gap-1 rounded-4xl border bg-white p-4 pt-3 shadow">
        <div className="pb-2">
          <span className="text-lg font-semibold">Todo</span>
        </div>
        <hr className="-mx-4" />
        <TodoList tasks={ActivityTasks} />
        <hr className="-mx-4" />
        {Boolean(completedTasks.length > 0) && <CompletedList tasks={completedTasks} />}
      </div>
    </div>
  );
};
