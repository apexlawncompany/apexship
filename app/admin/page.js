"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";

export default function AdminPortal() {
  const [token, setToken] = useState(null);
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("adminToken");
    if (saved) setToken(saved);
  }, []);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
    } else {
      alert(data.message);
    }
  };

  const handleRegister = async () => {
    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Account created - please login.");
      setMode("login");
    } else {
      alert(data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };
  // Logged In Portal View
  if (token) {
    return (
      <div className={styles.header}>
        <div className={styles.content}>
          <p>Welcome to Admin Portal</p>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Login or Register UI
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {mode === "login" ? "Admin Login" : "Create Account"}
      </h2>

      <input
        className={styles.input}
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInput}
        value={form.username}
      />

      {mode === "register" && (
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          value={form.email}
        />
      )}

      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInput}
        value={form.password}
      />

      {mode === "login" ? (
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
      ) : (
        <button className={styles.button} onClick={handleRegister}>
          Create Account
        </button>
      )}

      <p
        className={styles.switch}
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login"
          ? "No account? Create one"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}
