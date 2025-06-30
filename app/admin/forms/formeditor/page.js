"use client";

import { useState } from "react";
import styles from "./formeditor.module.css";

export default function NewFormPage() {
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([
    { label: "", type: "text", options: [] },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { label: "", type: "text", options: [] }]);
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    if (key === "type" && value !== "select") {
      updated[index].options = [];
    }
    if (key === "type" && value === "select" && !updated[index].options) {
      updated[index].options = [""];
    }
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    if (!updated[qIndex].options) updated[qIndex].options = [];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    if (!updated[qIndex].options) updated[qIndex].options = [];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    if (!updated[qIndex].options) return;
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formName, questions });
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Create/Edit Form</h2>
        <nav className={styles.nav}>
          {["Form1", "Form2", "Form3"].map((form, idx) => (
            <div key={idx} className={styles.navItem}>
              <span
                onClick={() => console.log(`Open ${form}`)} // Replace with logic
                className={styles.formName}
              >
                {form}
              </span>
              <div className={styles.iconGroup}>
                <button
                  onClick={() => console.log(`Edit ${form}`)}
                  className={styles.iconBtn}
                >
                  ✏️
                </button>
                <button
                  onClick={() => console.log(`Delete ${form}`)}
                  className={styles.iconBtn}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <div className={styles.formContainer}>
        <h1 style={{ paddingBottom: "0.5rem" }}>Create New Form</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className={styles.input}
          />
          {questions.map((q, index) => (
            <div key={index} className={styles.questionRow}>
              <input
                type="text"
                placeholder="Question Label"
                value={q.label}
                onChange={(e) => updateQuestion(index, "label", e.target.value)}
                className={styles.input}
              />
              <select
                value={q.type}
                onChange={(e) => updateQuestion(index, "type", e.target.value)}
                className={styles.select}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="select">Dropdown</option>
              </select>
              {q.type === "select" && (
                <div className={styles.options}>
                  <label>Dropdown Options:</label>
                  {q.options &&
                    q.options.map((opt, oIndex) => (
                      <div key={oIndex} className={styles.optionRow}>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            updateOption(index, oIndex, e.target.value)
                          }
                          className={styles.input}
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index, oIndex)}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className={styles.addBtn}
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="button" onClick={addQuestion} className={styles.addBtn}>
            + Add Question
          </button>
          <button type="submit" className={styles.submitBtn}>
            Save Form
          </button>
        </form>
      </div>
    </div>
  );
}
