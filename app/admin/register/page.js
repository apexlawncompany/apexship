"use client";
import { useEffect, useState } from "react";
import styles from "../login/login.module.css";

const RESEND_SECONDS = 60;

export default function RegisterPage() {
  // Step 1 collects name, email and password; step 2 asks for the emailed code.
  // Everything stays in this page's memory only and is gone when the page closes.
  const [step, setStep] = useState("details");
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // An earlier version of this page saved the password in the browser's
  // localStorage. Remove anything it left behind.
  useEffect(() => {
    try {
      ["regEmail", "regPass", "regName"].forEach((key) =>
        localStorage.removeItem(key)
      );
    } catch {}
  }, []);

  // Count the resend timer down once per second.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function requestCode(email) {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Failed to send code");
    setCooldown(RESEND_SECONDS);
  }

  async function handleDetails(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    const next = {
      name: form.get("name")?.toString().trim() || "",
      email: form.get("email")?.toString().trim().toLowerCase() || "",
      password: form.get("password")?.toString() || "",
    };

    try {
      await requestCode(next.email);
      setDetails(next);
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
      await requestCode(details.email);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otp = new FormData(e.target).get("otp")?.toString().trim();

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...details, otp }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Invalid code");
      return;
    }

    setDetails({ name: "", email: "", password: "" });
    window.location.href = "/admin/login";
  }

  if (step === "code") {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Enter your code</h2>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.notice}>
          If {details.email} is approved, a 6-digit code is on its way. It
          expires in 5 minutes.
        </p>
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
            {loading ? "Verifying..." : "Create account"}
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
              setStep("details");
              setError("");
            }}
          >
            Back
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleDetails}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={details.name}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={details.email}
          required
        />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send code"}
        </button>
      </form>
    </div>
  );
}
