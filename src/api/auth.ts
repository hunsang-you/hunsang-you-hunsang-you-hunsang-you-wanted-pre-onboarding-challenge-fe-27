import axios from "axios";

const API_URL = "http://localhost:8080";

// 회원가입 API
export const signUp = async (email: string, password: string) => {
  return axios.post(`${API_URL}/users/create`, { email, password });
};

// 로그인 API
export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/users/login`, { email, password });
};
