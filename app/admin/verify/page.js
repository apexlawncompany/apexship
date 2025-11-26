"use client";
import { useState } from "react";
import styles from "../login/login.module.css";

export default function VerifyOtpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    const otp = form.get("otp");

    const email = localStorage.getItem("regEmail");
    const password = localStorage.getItem("regPass");
    const name = localStorage.getItem("regName");

    if (!email || !password || !name) {
      setError("Registration details missing. Please register again.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, email, password, name }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Invalid OTP");
      return;
    }

    window.location.href = "/admin/login";
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify OTP</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleVerify}>
        <input name="otp" type="text" placeholder="Enter OTP" />
        <button type="submit">{loading ? "Verifying..." : "Verify"}</button>
      </form>
    </div>
  );
}
