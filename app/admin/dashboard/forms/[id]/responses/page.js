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

  const questionLabels = form.questions.map((q) => q.label);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Responses for: {form.name}</h1>

      {responses.length === 0 ? (
        <p className={styles.empty}>No responses submitted yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Submitted At</th>
                {questionLabels.map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {responses.map((res, index) => (
                <tr key={res._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(res.submittedAt).toLocaleString()}</td>

                  {questionLabels.map((label, i) => {
                    const answerObj = res.answers.find(
                      (ans) => ans.question === label
                    );

                    return <td key={i}>{answerObj?.answer || "-"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
