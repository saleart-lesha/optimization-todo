import { TodoList } from '@/widget/todo-list';

import type { FC } from 'react';

export const MainPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      todo
      <TodoList />
    </div>
  );
};
