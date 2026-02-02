import { TodoItem } from '@/entities/todo-item';
import { AddTodoButton, RemoveTodoButton, useTodoStore } from '@/feature/todo';

import type { TodoListProps } from '../model';
import type { FC } from 'react';

export const TodoList: FC<TodoListProps> = ({ tasks }) => {
  const addTask = useTodoStore((s) => s.addTask);
  const updateTask = useTodoStore((s) => s.updateTask);
  const removeTask = useTodoStore((s) => s.removeTask);

  return (
    <div className="mb-1.5 flex flex-col">
      <div className="mt-2 mb-2 ml-1">
        <span className="text-md font-semibold">Задачи</span>
      </div>
      <div className="flex flex-col gap-1">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            text={task.text}
            isDraft={task.isDraft}
            onSubmit={(text, isCompleted) => updateTask(task.id, text, isCompleted)}
            onCancel={() => removeTask(task.id)}
            rightAction={<RemoveTodoButton todoId={task.id} />}
          />
        ))}
      </div>
      <div className="mt-2">
        <AddTodoButton onClick={addTask} />
      </div>
    </div>
  );
};
