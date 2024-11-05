import React, { useEffect, useState } from "react";
import { getTodos, createTodo } from "../../api/todos";
import { formatDate } from "../../utils/date";
import TodoDetail from "../../components/TodoDetail";
import { TodoType } from "../../types/todo";

function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await getTodos();
        setTodos(response.data.data);
      } catch (error) {
        console.error("Todos fetch error:", error);
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (title && content) {
      try {
        const response = await createTodo(title, content);
        setTodos([...todos, response.data.data]);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Todo creation error:", error);
      }
    }
  };

  const handleEdit = (updatedTodo: TodoType) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setSelectedTodo(updatedTodo);
  };

  const handleDelete = () => {
    if (selectedTodo) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== selectedTodo.id)
      );
      setSelectedTodo(null);
    }
  };

  return (
    <div className="flex p-8 bg-gray-100 max-h-screen">
      <div className="w-2/3 max-w-lg bg-white p-6 rounded-lg shadow-md mr-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Todo List</h1>

        <div className="flex flex-col space-y-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            추가
          </button>
        </div>

        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {todos.map((todo, idx) => (
            <li
              key={todo.id}
              onClick={() => setSelectedTodo(todo)}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <span className="text-sm font-semibold text-blue-600">
                {idx + 1}
              </span>
              <p className="font-bold text-gray-800">{todo.title}</p>
              <p className="text-gray-600">{todo.content}</p>
              <p className="text-gray-500 text-xs mt-1">
                <span className="font-bold">생성날짜: </span>
                {formatDate(todo.createdAt)}
              </p>
              <p className="text-gray-500 text-xs">
                <span className="font-bold">수정날짜: </span>
                {formatDate(todo.updatedAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {selectedTodo && (
        <div className="w-1/3 max-w-md bg-white p-6 rounded-lg shadow-md">
          <TodoDetail
            todo={selectedTodo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default TodoList;
