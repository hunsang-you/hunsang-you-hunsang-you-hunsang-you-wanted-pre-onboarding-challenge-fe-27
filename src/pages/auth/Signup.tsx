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
    <form onSubmit={handleSignUp}>
      <h2>회원가입</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <button
        type="submit"
        disabled={
          !email.includes("@") || !email.includes(".") || password.length < 8
        }
      >
        회원가입
      </button>
    </form>
  );
}

export default Signup;
