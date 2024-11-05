import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".") && password.length >= 8) {
      try {
        const response = await login(email, password);
        localStorage.setItem("token", response.data.token);
        console.log("로그인에 성공하였습니다.", response.data.token);
        navigate("/todos");
      } catch (error) {
        alert("이메일과 비밀번호를 확인해주세요.");
        console.error("로그인 실패", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80 max-w-xs"
      >
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={
            !email.includes("@") || !email.includes(".") || password.length < 8
          }
          className="w-full py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          type="button"
          className="w-full py-2 text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-100"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Login;
