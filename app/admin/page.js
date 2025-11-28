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

        {user && (
          <div className={styles.profileBox}>
            <Image
              src="/user-bg.png"
              alt="User acc"
              width={30}
              height={30}
            />
            <p className={styles.profileName}>{user.name}</p>

            {/* Mobile Logout Icon */}
            <button
              className={styles.mobileLogoutIcon}
              onClick={handleLogout}
              aria-label="logout"
            >
              <Image
                src="/power-off.png"
                alt="Logout icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, Admin</h1>
        <button className={styles.optBtn}>
          Create new web page
        </button>
      </main>
    </div>
  );
}