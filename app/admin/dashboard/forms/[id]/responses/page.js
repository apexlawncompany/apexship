"use client";

import { use, useEffect, useState } from "react";
import styles from "./responses.module.css";

export default function FormResponsesPage({ params }) {
  const resolvedParams = use(params);
  const formId = resolvedParams.id;

  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load form + responses
  useEffect(() => {
    async function loadData() {
      try {
        const [formRes, respRes] = await Promise.all([
          fetch(`/api/forms/${formId}`),
          fetch(`/api/forms/${formId}/responses`),
        ]);

        const formData = await formRes.json();
        const responseData = await respRes.json();

        setForm(formData);
        setResponses(responseData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [formId]);

  if (loading) return <p className={styles.loading}>Loading responses...</p>;

  if (!form) return <p className={styles.error}>Form not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Responses for: {form.name}</h1>

      {responses.length === 0 ? (
        <p className={styles.empty}>No responses submitted yet.</p>
      ) : (
        <div className={styles.responsesWrapper}>
          {responses.map((res, index) => (
            <div key={res._id} className={styles.responseCard}>
              <h3 className={styles.responseTitle}>Response {index + 1}</h3>
              <p className={styles.date}>
                Submitted: {new Date(res.submittedAt).toLocaleString()}
              </p>

              <ul className={styles.answerList}>
                {res.answers.map((a, i) => (
                  <li key={i} className={styles.answerItem}>
                    <strong>{a.question}:</strong> {a.answer || "-"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
