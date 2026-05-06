import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://doctor-appointment-r403.onrender.com", {
        name,
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      alert("Register successful");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>Register</h2>

      <form onSubmit={registerHandler}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;