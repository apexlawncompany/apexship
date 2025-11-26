"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import Image from "next/image";

export default function AdminHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.replace("/admin/login");
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Admin Panel</h2>

        {user && (
          <div className={styles.profileBox}>
            <Image
              src="/user-bg.png"
              alt="User acc"
              width={30}
              height={30}
            />
            <p className={styles.profileName}>{user.name}</p>
          </div>
        )}

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, Admin</h1>
        <p className={styles.subtitle}>Your dashboard awaits.</p>
      </main>
    </div>
  );
}