"use client";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminHome() {
  const router = useRouter();

  function handleCreate() {
    router.push("/admin/web-templates");
  }
    function createForm() {
    router.push("/admin/form-builder");
  }

  return (
    <>
      <h1 className={styles.welcome}>Welcome, Admin</h1>
      <button className={styles.optBtn} onClick={handleCreate}>
        Create new web page
      </button>
      <button className={styles.optBtn} onClick={createForm}>
        Create form
      </button>
    </>
  );
}
