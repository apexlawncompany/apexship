"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadForms() {
      try {
        const res = await fetch("/api/forms");
        if (!res.ok) throw new Error("Failed to fetch forms");
        const data = await res.json();
        setForms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadForms();
  }, []);

  async function deleteForm(id) {
    if (!confirm("Are you sure you want to delete this form?")) return;

    try {
      const res = await fetch(`/api/forms/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete form");

      // Update UI
      setForms(forms.filter((form) => form._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting form");
    }
  }

  function editForm(id) {
    router.push(`/dashboard/forms/${id}`);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      {/* Forms Section */}
      <div className={styles.section}>
        <h2 className={styles.heading}>📄 Saved Forms</h2>

        {loading ? (
          <p className={styles.empty}>Loading forms...</p>
        ) : forms.length === 0 ? (
          <p className={styles.empty}>No forms saved yet.</p>
        ) : (
          <ul className={styles.treeList}>
            {forms.map((form) => (
              <li key={form._id} className={styles.treeItem}>
                <span>{form.name}</span>

                <div className={styles.actionBtns}>
                  <button
                    onClick={() => editForm(form._id)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteForm(form._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>🌍 Saved Websites</h2>
        <p className={styles.empty}>Coming soon...</p>
      </div>
    </div>
  );
}
