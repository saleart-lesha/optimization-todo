import { TodoItem } from '@/entities/todo-item';
import { AddTodoButton, RemoveTodoButton, useTodoStore } from '@/feature/todo';

import type { TodoListProps } from '../model';
import type { FC } from 'react';

export const TodoList: FC<TodoListProps> = ({ tasks }) => {
  const addTask = useTodoStore((s) => s.addTask);
  const updateTask = useTodoStore((s) => s.updateTask);
  const removeTask = useTodoStore((s) => s.removeTask);

  return (
    <div>
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
      <AddTodoButton onClick={addTask} />
    </div>
  );
};
