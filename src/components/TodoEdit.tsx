import React, { useEffect, useState } from "react";
import { updateTodo } from "../api/todos";

interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoEditProps {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onCancel: () => void;
}

function TodoEdit({ todo, onUpdateTodo, onCancel }: TodoEditProps) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  useEffect(() => {
    setTitle(todo.title);
    setContent(todo.content);
  }, [todo]);

  const handleUpdate = async () => {
    try {
      const response = await updateTodo(todo.id, title, content);
      onUpdateTodo(response.data.data);
    } catch (error) {
      console.error("Todo update error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default TodoEdit;
