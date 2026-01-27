export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
  isDraft?: boolean;
};

export type TodoStore = {
  tasks: Task[];
  addTask: () => void;
  updateTask: (id: string, text: string) => void;
  removeTask: (id: string) => void;
};
