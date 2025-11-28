"use client";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminHome() {
  const router = useRouter();

  function handleCreate() {
    router.push("/admin/web-templates");
  }

  return (
    <>
      <h1 className={styles.welcome}>Welcome, Admin</h1>
      <button className={styles.optBtn} onClick={handleCreate}>
        Create new web page
      </button>
    </>
  );
}
