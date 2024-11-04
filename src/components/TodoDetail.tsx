import React, { useState } from "react";
import TodoEdit from "./TodoEdit";

interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoDetailProps {
  todo: Todo;
  onEdit: (updatedTodo: Todo) => void;
  onDelete: () => void;
}

function TodoDetail({ todo, onEdit, onDelete }: TodoDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTodo: Todo) => {
    onEdit(updatedTodo);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <TodoEdit
          todo={todo}
          onUpdateTodo={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <h2>제목: {todo.title}</h2>
          <p>내용: {todo.content}</p>
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={onDelete} style={{ marginLeft: "12px" }}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoDetail;
