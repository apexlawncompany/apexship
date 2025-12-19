"use client";

import styles from "./AdminSidebar.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/utils/AdminAuthContext";

export default function AdminSidebar() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/admin/login");
  }

  function goToDashboard() {
    router.push("/admin/dashboard");
  }

  function goToHome() {
    router.push("/admin");
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

      <div className={styles.navGroup}>
        <button className={styles.navBtn} onClick={goToHome}>
          Home
        </button>
        <hr className={styles.hrLine} />

        <button className={styles.navBtn} onClick={goToDashboard}>
          Dashboard
        </button>

        <hr className={styles.hrLine} />

        <button className={styles.navBtn}>
          More
        </button>
      </div>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
