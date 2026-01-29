import { useTodoStore } from '@/feature/todo';
import { CompletedList } from '@/widget/completed-list';
import { TodoList } from '@/widget/todo-list';

import type { FC } from 'react';

export const MainPage: FC = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const completedTasks = tasks.filter((item) => item.isCompleted);
  const ActivityTasks = tasks.filter((item) => !item.isCompleted);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex h-150 w-xl flex-col gap-1 rounded-4xl border-2 p-5">
        todo
        <TodoList tasks={ActivityTasks} />
        {Boolean(completedTasks.length > 0) && <CompletedList tasks={completedTasks} />}
      </div>
    </div>
  );
};
