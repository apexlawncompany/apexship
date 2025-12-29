"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareFormId, setShareFormId] = useState(null);
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
    router.push(`/admin/dashboard/forms/${id}`);
  }

  function shareForm(id) {
    const publicUrl = `${window.location.origin}/form/${id}`;

    navigator.clipboard
      .writeText(publicUrl)
      .then(() => {
        alert("Public URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy URL");
      });
  }

  function viewResponses(id) {
    router.push(`/admin/dashboard/forms/${id}/responses`);
  }

  return (
    <div className={styles.container}>
      <h1 className={`heading-font ${styles.title}`}>Dashboard</h1>

      {/* Forms Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Image
            src="/assets/templates/forms.png"
            alt="Search"
            width={30}
            height={30}
          />
          <h2 className={`heading-font ${styles.heading}`}>Saved Forms</h2>
        </div>

        {loading ? (
          <p className={styles.empty}>Loading forms...</p>
        ) : forms.length === 0 ? (
          <p className={styles.empty}>No forms saved yet.</p>
        ) : (
          <ul className={styles.treeList}>
            {forms.map((form, index) => (
              <React.Fragment key={form._id}>
                <li className={styles.treeItem}>
                  <span>{form.name}</span>

                  <div className={styles.actionBtns}>
                    <button
                      onClick={() => editForm(form._id)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => viewResponses(form._id)}
                      className={styles.responseBtn}
                    >
                      Responses
                    </button>

                    <button
                      onClick={() => setShareFormId(form._id)}
                      className={styles.shareBtn}
                    >
                      Share
                    </button>

                    <button
                      onClick={() => deleteForm(form._id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </li>

                {index !== forms.length - 1 && <hr className={styles.hrLine} />}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Image
            src="/assets/templates/world-wide-web.png"
            alt="Search"
            width={30}
            height={30}
          />
          <h2 className={`heading-font ${styles.heading}`}>Saved Websites</h2>
        </div>

        <p className={styles.empty}>Coming soon...</p>
      </div>

      {shareFormId && (
        <div
          className={styles.shareOverlay}
          onClick={() => setShareFormId(null)}
        >
          <div
            className={styles.sharePanel}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.shareUrl}>
              {`${window.location.origin}/form/${shareFormId}`}
            </p>

            <div className={styles.shareActionsRow}>
              {/* COPY */}
              <div
                className={styles.actionItem}
                onClick={() => {
                  const url = `${window.location.origin}/form/${shareFormId}`;
                  navigator.clipboard.writeText(url);
                }}
              >
                <Image
                  src="/assets/templates/link.png"
                  alt="Copy"
                  width={20}
                  height={20}
                  className={styles.actionIcon}
                />
                <span className={styles.actionLabel}>Copy</span>
              </div>

              {/* OPEN */}
              <div
                className={styles.actionItem}
                onClick={() => window.open(`/form/${shareFormId}`, "_blank")}
              >
                <Image
                  src="/assets/templates/open-link.png"
                  alt="Open"
                  width={20}
                  height={20}
                  className={styles.actionIcon}
                />
                <span className={styles.actionLabel}>Open</span>
              </div>

              {/* CLOSE */}
              <div
                className={styles.actionItem}
                onClick={() => setShareFormId(null)}
              >
                <Image
                  src="/assets/templates/close.png"
                  alt="Close"
                  width={20}
                  height={20}
                  className={styles.actionIcon}
                />
                <span className={styles.actionLabel}>Close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
