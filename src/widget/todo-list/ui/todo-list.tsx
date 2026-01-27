import { TodoItem } from '@/entities/todo-item';
import { AddTodoButton, RemoveTodoButton, useTodoStore } from '@/feature/todo';

export const TodoList = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const addTask = useTodoStore((s) => s.addTask);
  const updateTask = useTodoStore((s) => s.updateTask);
  const removeTask = useTodoStore((s) => s.removeTask);

  return (
    <div className="flex h-150 w-xl flex-col gap-1 rounded-4xl border-2 p-5">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          text={task.text}
          isDraft={task.isDraft}
          onSubmit={(text) => updateTask(task.id, text)}
          onCancel={() => removeTask(task.id)}
          rightAction={<RemoveTodoButton todoId={task.id} />}
        />
      ))}
      <AddTodoButton onClick={addTask} />
    </div>
  );
};
