import { arrayMove } from '@dnd-kit/sortable';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { generateId } from './helpers';

import type { TodoStore } from './types';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      tasks: [],

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

      updateTask: (id, text, isCompleted) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  text,
                  isDraft: false,
                  isCompleted,
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

      removeAllCompletedTasks: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.isCompleted),
        }));
      },

      reorderTasks: (activeId, overId) => {
        set((state) => {
          const oldIndex = state.tasks.findIndex((t) => t.id === activeId);
          const newIndex = state.tasks.findIndex((t) => t.id === overId);

          if (oldIndex < 0 || newIndex < 0) return state;

          return {
            tasks: arrayMove(state.tasks, oldIndex, newIndex),
          };
        });
      },
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
