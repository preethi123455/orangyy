import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❌ Email & password required");
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);
      if (res.data.success) {
        window.dispatchEvent(new Event("authChanged"));
        setTimeout(() => (window.location.href = "/"), 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        background: "#fff8f0",
        borderRadius: 8,
        border: "2px solid orange",
      }}
    >
      <h2 style={{ color: "orange", textAlign: "center" }}>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
      <p style={{ color: "red", textAlign: "center" }}>{message}</p>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: 10,
  margin: "10px 0",
  borderRadius: 4,
  border: "1px solid orange",
  boxSizing: "border-box",
};
const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "orange",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  marginTop: 10,
};

export default Login;
