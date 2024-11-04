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
        console.error("로그인 실패", error);
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            disabled={
              !email.includes("@") ||
              !email.includes(".") ||
              password.length < 8
            }
          >
            Login
          </button>
        </form>
        <button onClick={() => navigate("/signup")}> 회원가입</button>
      </div>
    </>
  );
}

export default Login;
