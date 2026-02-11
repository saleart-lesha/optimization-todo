import { describe, it, expect, beforeEach } from 'vitest';

import { useTodoStore } from '../store';

describe('todo store', () => {
  beforeEach(() => {
    useTodoStore.setState({ tasks: [] });
  });

  it('addTask добавляет новую задачу в начало', () => {
    const { addTask } = useTodoStore.getState();

    addTask();
    addTask();

    const tasks = useTodoStore.getState().tasks;

    expect(tasks.length).toBe(2);
    expect(tasks[0].isDraft).toBe(true);
    expect(tasks[1].isDraft).toBe(true);
  });

  it('updateTask изменение задачи', () => {
    useTodoStore.setState({
      tasks: [{ id: '1', text: 'old', isCompleted: false, isDraft: true }],
    });

    const { updateTask } = useTodoStore.getState();

    updateTask('1', 'update', true);

    const updatedTask = useTodoStore.getState().tasks[0];

    expect(updatedTask.text).toBe('update');
    expect(updatedTask.isCompleted).toBe(true);
    expect(updatedTask.isDraft).toBe(false);
  });

  it('removeTask удаление задачи', () => {
    useTodoStore.setState({
      tasks: [{ id: '1', text: 'a', isCompleted: false, isDraft: false }],
    });

    const { removeTask } = useTodoStore.getState();
    const { tasks } = useTodoStore.getState();

    removeTask(tasks[0].id);
    const updateTasks = useTodoStore.getState().tasks;

    expect(updateTasks.length).toBe(0);
  });

  it('reorderTasks перетаскивание задачи', () => {
    useTodoStore.setState({
      tasks: [
        { id: '1', text: 'a', isCompleted: false, isDraft: false },
        { id: '2', text: 'b', isCompleted: false, isDraft: false },
      ],
    });

    const { reorderTasks } = useTodoStore.getState();
    const { tasks } = useTodoStore.getState();

    const firstId = tasks[0].id;
    const secondId = tasks[1].id;

    reorderTasks(firstId, secondId);

    const updatedTasks = useTodoStore.getState().tasks;

    expect(updatedTasks[0].id).toBe(secondId);
    expect(updatedTasks[1].id).toBe(firstId);
  });

  it('removeAllCompletedTasks удаляет все выполненные задачи', () => {
    const { removeAllCompletedTasks } = useTodoStore.getState();

    useTodoStore.setState({
      tasks: [
        { id: '1', text: 'a', isCompleted: true, isDraft: false },
        { id: '2', text: 'b', isCompleted: false, isDraft: false },
        { id: '3', text: 'c', isCompleted: true, isDraft: false },
      ],
    });

    removeAllCompletedTasks();

    const updatedTasks = useTodoStore.getState().tasks;

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks[0].id).toBe('2');
  });
});
