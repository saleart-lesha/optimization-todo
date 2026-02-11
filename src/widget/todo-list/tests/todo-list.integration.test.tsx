import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { useTodoStore } from '@/feature/todo';

import { TodoList } from '../ui/todo-list';

import type { ReactNode } from 'react';

vi.mock('@dnd-kit/sortable', async () => {
  const actual = await vi.importActual<typeof import('@dnd-kit/sortable')>('@dnd-kit/sortable');

  return {
    ...actual,
    SortableContext: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  };
});

describe('TodoList integration', () => {
  beforeEach(() => {
    useTodoStore.setState({ tasks: [] });
  });

  const TestWrapper = () => {
    const tasks = useTodoStore((s) => s.tasks);
    return <TodoList tasks={tasks} />;
  };

  it('пользователь нажал add → появился input', async () => {
    const user = userEvent.setup();

    render(<TestWrapper />);

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('add-todo-button'));

    expect(await screen.findByRole('textbox')).toBeInTheDocument();
  });

  it('пользователь ввёл текст → задача сохранилась', async () => {
    const user = userEvent.setup();

    render(<TestWrapper />);

    await user.click(screen.getByTestId('add-todo-button'));
    const input = await screen.findByRole('textbox');
    await user.type(input, 'Новая задача');
    await user.tab();

    expect(await screen.findByDisplayValue('Новая задача')).toBeInTheDocument();
  });

  it('нажал чекбокс → задача стала completed', async () => {
    const user = userEvent.setup();

    render(<TestWrapper />);

    await user.click(screen.getByTestId('add-todo-button'));
    const input = await screen.findByRole('textbox');
    await user.type(input, 'Новая задача');
    await user.tab();

    const task = useTodoStore.getState().tasks[0];
    const checkbox = screen.getByTestId(`checkbox-${task.id}`);
    await user.click(checkbox);

    expect(useTodoStore.getState().tasks[0].isCompleted).toBe(true);
  });
});
