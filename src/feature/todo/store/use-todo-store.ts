import { create } from 'zustand';

import { generateId } from './helpers';

import type { TodoStore } from './types';

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [
    { id: generateId(), text: 'Сделать домашку', isCompleted: false },
    { id: generateId(), text: 'Купить хлеб', isCompleted: false },
  ],

  addTask: () => {
    set((state) => ({
      tasks: [
        {
          id: generateId(),
          text: '',
          isCompleted: false,
          isDraft: true,
        },
        ...state.tasks,
      ],
    }));
  },

  updateTask: (id, text) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text,
              isDraft: false,
            }
          : task
      ),
    }));
  },

  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));
