export type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type TodoStore = {
  tasks: Task[];
  createTask: (text: string, isCompleted: boolean) => void;
  updateTask: (id: string, text: string) => void;
  removeTask: (id: string) => void;
};
