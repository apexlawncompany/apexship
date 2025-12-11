"use client";

import { useState } from "react";
import styles from "./formBuilder.module.css";

export default function FormBuilder() {
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([{ label: "", type: "Text" }]);
  const [isSaving, setIsSaving] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { label: "", type: "Text" }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const saveForm = async () => {
    if (!formName.trim()) {
      alert("Please enter a form name.");
      return;
    }

    if (questions.some((q) => !q.label.trim())) {
      alert("Please fill all question labels.");
      return;
    }

    try {
      setIsSaving(true);

      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          questions,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save form");
      }

      const saved = await res.json();
      console.log("Saved form:", saved);
      alert("Form saved successfully!");

      // resetting form after save
      setFormName("");
      setQuestions([{ label: "", type: "Text" }]);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Form</h1>

      <input
        type="text"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        className={styles.input}
      />

      {questions.map((q, idx) => (
        <div key={idx} className={styles.card}>
          <input
            type="text"
            placeholder="Question Label"
            value={q.label}
            onChange={(e) => updateQuestion(idx, "label", e.target.value)}
            className={styles.input}
          />

          <select
            value={q.type}
            onChange={(e) => updateQuestion(idx, "type", e.target.value)}
            className={styles.select}
          >
            <option>Text</option>
            <option>Number</option>
            <option>Date</option>
            <option>Dropdown</option>
          </select>
        </div>
      ))}

      <button className={styles.button} onClick={addQuestion}>
        + Add Question
      </button>

      <button className={styles.button} onClick={saveForm} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Form"}
      </button>
    </div>
  );
}
