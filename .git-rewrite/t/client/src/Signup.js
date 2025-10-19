import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!name || !age || !email || !password) {
      setMessage("❌ All fields are required!");
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        name,
        age,
        email,
        password,
      });
      setMessage(res.data.message);
      if (res.data.message.includes("Signup successful")) {
        setTimeout(() => (window.location.href = "/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, background: "#fff8f0", borderRadius: 8, border: "2px solid orange" }}>
      <h2 style={{ color: "orange", textAlign: "center" }}>Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
      <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} style={inputStyle} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleSignup} style={buttonStyle}>Signup</button>
      <p style={{ color: "red", textAlign: "center" }}>{message}</p>
    </div>
  );
};

const inputStyle = { width: "100%", padding: 10, margin: "10px 0", borderRadius: 4, border: "1px solid orange" };
const buttonStyle = { width: "100%", padding: 10, background: "orange", color: "white", border: "none", borderRadius: 4, cursor: "pointer" };

export default Signup;
