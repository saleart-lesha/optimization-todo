export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
  isDraft?: boolean;
};

export type TodoStore = {
  tasks: Task[];
  addTask: () => void;
  updateTask: (id: string, text: string, isCompleted: boolean) => void;
  removeTask: (id: string) => void;
  removeAllCompletedTasks: () => void;
};
