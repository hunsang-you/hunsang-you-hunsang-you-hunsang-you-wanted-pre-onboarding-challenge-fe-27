import React, { useEffect, useState } from "react";
import { getTodos, createTodo } from "../../api/todos";
import { formatDate } from "../../utils/date";
import TodoDetail from "../../components/TodoDetail";

interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

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

  const handleEdit = (updatedTodo: Todo) => {
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
    <div className="todo-container">
      <div className="todo-list">
        <h1>Todo List</h1>

        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <ul>
          {todos.map((todo, idx) => (
            <li key={todo.id} onClick={() => setSelectedTodo(todo)}>
              <span>{idx + 1}</span>
              <p>{todo.title}</p> - {todo.content}
              <p>
                <strong>생성 시간:</strong> {formatDate(todo.createdAt)}
              </p>
              <p>
                <strong>수정 시간:</strong> {formatDate(todo.updatedAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {selectedTodo && (
        <div className="todo-detail">
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
