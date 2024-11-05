import React, { useState } from "react";
import TodoEdit from "./TodoEdit";
import { TodoType, TodoDetailProps } from "../types/todo";

function TodoDetail({ todo, onEdit, onDelete }: TodoDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTodo: TodoType) => {
    onEdit(updatedTodo);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {isEditing ? (
        <TodoEdit
          todo={todo}
          onUpdateTodo={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            제목: {todo.title}
          </h2>
          <p className="text-gray-700 mb-4">내용: {todo.content}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              수정
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoDetail;
