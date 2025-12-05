"use client";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      let message = "Something went wrong";
      try {
        const data = await res.json();
        message = data.error || message;
      } catch {}
      setError(message);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
      </form>
      <p className={styles.switch}>
        No account? <a href="/admin/register">Create one</a>
      </p>
    </div>
  );
}
