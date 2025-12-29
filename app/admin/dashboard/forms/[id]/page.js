"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editForm.module.css";

export default function EditFormPage(props) {
  const { params } = props;
  const resolvedParams = use(params);
  const formId = resolvedParams.id;
  const router = useRouter();

  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Loading form from DB
  useEffect(() => {
    async function loadForm() {
      try {
        const res = await fetch(`/api/forms/${formId}`);
        if (!res.ok) throw new Error("Form not found");

        const data = await res.json();
        setFormName(data.name);
        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
      }
    }

    loadForm();
  }, [formId]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { label: "", type: "Text" }]);
  };

  const updateForm = async () => {
    try {
      setIsSaving(true);

      const cleanedQuestions = questions.filter((q) => q.label.trim() !== "");

      const res = await fetch(`/api/forms/${formId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formName,
          questions: cleanedQuestions,
        }),
      });

      if (!res.ok) throw new Error("Failed to update form");

      alert("Form updated successfully!");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating!");
    } finally {
      setIsSaving(false);
    }
  };

  if (!questions.length) return <p>Loading form...</p>;

  return (
    <div className={styles.container}>
      <h1 className={`heading-font ${styles.title}`}>Edit Form</h1>

      <div className={styles.editorPreviewWrapper}>
        {/* LEFT SIDE - Editor */}
        <div className={styles.editorSection}>
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
                placeholder="Edit question..."
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

          <button
            className={styles.button}
            onClick={updateForm}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Update Form"}
          </button>
        </div>

        {/* RIGHT SIDE - Preview */}
        <div className={styles.previewSection}>
          <h2 className={`heading-font ${styles.previewTitle}`}>Preview</h2>
          <p className={styles.previewFormName}>{formName}</p>

          {questions
            .filter((q) => q.label.trim() !== "")
            .map((q) => (
              <div
                key={q.label + Math.random()}
                className={styles.previewField}
              >
                <label>{q.label}</label>

                {q.type === "Text" && (
                  <input type="text" className={styles.previewInput} />
                )}
                {q.type === "Number" && (
                  <input type="number" className={styles.previewInput} />
                )}
                {q.type === "Date" && (
                  <input type="date" className={styles.previewInput} />
                )}
                {q.type === "Dropdown" && (
                  <select className={styles.previewInput}>
                    <option>Select an option</option>
                  </select>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
