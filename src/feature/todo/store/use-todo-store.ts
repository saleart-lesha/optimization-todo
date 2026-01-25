import { create } from 'zustand';

import { generateId } from './helpers';

import type { TodoStore } from './types';

export const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: [
    { id: generateId(), text: 'Сделать домашку', isCompleted: false },
    { id: generateId(), text: 'Купить хлеб', isCompleted: false },
  ],

  createTask: (text) => {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      text,
      isCompleted: false,
    };

    set({
      tasks: [newTask, ...tasks],
    });
  },

  updateTask: (id, text) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        text: task.id === id ? text : task.text,
      })),
    });
  },

  removeTask: (id) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id),
    });
  },
}));
