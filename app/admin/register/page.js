"use client";
import { useState } from "react";
import styles from "../admin.module.css";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    // temporarily store for verify step
    localStorage.setItem("regEmail", email);
    localStorage.setItem("regPass", password);
    localStorage.setItem("regName", name);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to send OTP");
      return;
    }

    window.location.href = "/admin/verify";
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">{loading ? "Sending..." : "Send OTP"}</button>
      </form>
    </div>
  );
}
