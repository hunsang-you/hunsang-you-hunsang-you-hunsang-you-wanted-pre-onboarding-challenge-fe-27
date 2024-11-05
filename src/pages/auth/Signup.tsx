import React, { useState } from "react";
import { signUp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@") && email.includes(".") && password.length >= 8) {
      try {
        const response = await signUp(email, password);
        localStorage.setItem("token", response.data.token);
        navigate("/todos");
      } catch (error) {
        console.error("회원가입 실패", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded shadow-md w-80 max-w-xs"
      >
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={
            !email.includes("@") || !email.includes(".") || password.length < 8
          }
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
