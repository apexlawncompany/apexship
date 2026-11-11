"use client";
import { useEffect, useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  // Step 1: email + password. Step 2: the 6-digit code from the email.
  // The password stays in this page's memory only, so "Resend" can repeat
  // step 1 without asking for it again.
  const [step, setStep] = useState("password");
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Count the resend timer down once per second.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function requestCode(next) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong");
    setNotice(data.message || `A 6-digit code was sent to ${next.email}. It expires in 5 minutes.`);
    setCooldown(data.resendIn || 60);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    const next = {
      email: form.get("email")?.toString().trim() || "",
      password: form.get("password")?.toString() || "",
    };

    try {
      await requestCode(next);
      setCreds(next);
      setStep("code");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (cooldown > 0 || loading) return;
    setError("");
    try {
      await requestCode(creds);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otp = new FormData(e.target).get("otp")?.toString().trim();

    const res = await fetch("/api/auth/verify-login-otp", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: creds.email, otp }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid code");
      return;
    }

    setCreds({ email: "", password: "" });
    window.location.href = "/admin";
  }

  if (step === "code") {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Enter your code</h2>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.notice}>{notice}</p>
        <form onSubmit={handleVerify}>
          <input
            name="otp"
            type="text"
            placeholder="6-digit code"
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleResend}
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => {
              setStep("password");
              setError("");
            }}
          >
            Back to login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={creds.email}
          required
        />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
      <p className={styles.switch}>
        No account? <a href="/admin/register">Create one</a>
      </p>
    </div>
  );
}
