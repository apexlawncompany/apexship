"use client";

import styles from "./admin.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/utils/AdminAuthContext";

export default function AdminHome() {
  const router = useRouter();
  const { user, loading } = useAuth();

  function handleCreate() {
    router.push("/admin/web-templates");
  }

  function createForm() {
    router.push("/admin/form-builder");
  }

  return (
    <>
      <h1 className={`heading-font ${styles.welcome}`}>
        {loading ? "Welcome…" : `Welcome, ${user?.name}`}
      </h1>

      <button className={styles.optBtn} onClick={handleCreate}>
        Create new web page
      </button>

      <button className={styles.optBtn} onClick={createForm}>
        Create form
      </button>
    </>
  );
}
