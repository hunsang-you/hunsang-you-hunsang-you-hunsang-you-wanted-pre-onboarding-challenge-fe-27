import axios from "axios";

const API_URL = "http://localhost:8080";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

export const getTodos = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTodoById = async (id: string) => {
  return axios.get(`${API_URL}/todos/${id}`);
};

export const createTodo = async (title: string, content: string) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_URL}/todos`,
    { title, content },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const updateTodo = async (
  id: string,
  title: string,
  content: string
) => {
  return axios.put(`${API_URL}/todos/${id}`, { title, content });
};

export const deleteTodo = async (id: string) => {
  return axios.delete(`${API_URL}/todos/${id}`);
};
