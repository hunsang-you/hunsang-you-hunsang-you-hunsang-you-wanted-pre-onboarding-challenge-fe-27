export type TodoType = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type TodoDetailProps = {
  todo: TodoType;
  onEdit: (updatedTodo: TodoType) => void;
  onDelete: () => void;
};

export type TodoEditProps = {
  todo: TodoType;
  onUpdateTodo: (updatedTodo: TodoType) => void;
  onCancel: () => void;
};
