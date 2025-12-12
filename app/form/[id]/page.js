"use client";

import { use, useEffect, useState } from "react";
import styles from "./formFill.module.css";

export default function FormFillPage({ params }) {
  const resolvedParams = use(params);
  const formId = resolvedParams.id;

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Load form structure
  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch(`/api/forms/${formId}`);
        const data = await res.json();

        setForm(data);
        setAnswers(
          data.questions.map((q) => ({ question: q.label, answer: "" }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadForm();
  }, [formId]);

  // Update answer
  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index].answer = value;
    setAnswers(updated);
  };

  // Submit response
  const submitForm = async () => {
    try {
      const res = await fetch(`/api/forms/${formId}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  if (loading) return <p className={styles.loading}>Loading form...</p>;
  if (!form) return <p className={styles.error}>Form not found</p>;
  if (submitted)
    return <p className={styles.success}>Form submitted successfully! 🎉</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{form.name}</h1>

      {form.questions.map((q, index) => (
        <div key={index} className={styles.fieldCard}>
          <label className={styles.label}>{q.label}</label>

          {q.type === "Text" && (
            <input
              className={styles.input}
              type="text"
              value={answers[index].answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
          )}

          {q.type === "Number" && (
            <input
              className={styles.input}
              type="number"
              value={answers[index].answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
          )}

          {q.type === "Date" && (
            <input
              className={styles.input}
              type="date"
              value={answers[index].answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
          )}

          {q.type === "Dropdown" && (
            <select
              className={styles.input}
              value={answers[index].answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            >
              <option value="">Select an option</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          )}
        </div>
      ))}

      <button className={styles.submitBtn} onClick={submitForm}>
        Submit
      </button>
    </div>
  );
}
