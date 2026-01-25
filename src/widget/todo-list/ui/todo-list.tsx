import { TodoItem } from '@/entities/todo-item';
import { RemoveTodoButton, useTodoStore } from '@/feature/todo';

export const TodoList = () => {
  const todos = useTodoStore((s) => s.tasks);
  return (
    <div className="flex h-150 w-xl flex-col gap-1 rounded-4xl border-2 p-5">
      {todos.map((todo) => (
        <TodoItem
          text={todo.text}
          key={todo.id}
          rightAction={<RemoveTodoButton todoId={todo.id} />}
        />
      ))}
    </div>
  );
};
