"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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
    <aside className={styles.sidebar}>
      {user && (
        <div className={styles.profileBox}>
          <Image src="/user-bg.png" alt="User acc" width={30} height={30} />
          <p className={styles.profileName}>{user.name}</p>

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

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
