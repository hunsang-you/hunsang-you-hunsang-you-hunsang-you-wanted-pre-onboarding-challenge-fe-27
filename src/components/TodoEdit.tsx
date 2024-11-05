import React, { useEffect, useState } from "react";
import { updateTodo } from "../api/todos";
import { TodoEditProps } from "../types/todo";

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
      <h2 className="text-xl font-semibold mb-4">Todo 수정</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          저장
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default TodoEdit;
