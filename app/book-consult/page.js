"use client";
import { useState } from "react";
import styles from "./bookConsult.module.css";

export default function BookConsult() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    city: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.location) newErrors.location = "Meeting location is required";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
    console.log("Consult Form", formData);
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <div className={styles.formContainer}>
        <h1 className={`heading-font`} style={{ color: "white" }}>
          CONSULT FORM
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label>
            Email *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>

          <label>
            Company Name (Optional)
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>

          <label>
            Requested Meeting Location *
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="office">Company Office</option>
              <option value="coffee">Coffee Shop</option>
              <option value="sanford">Apex Ship Location in Sanford NC</option>
              <option value="virtual">Virtual</option>
            </select>
            {errors.location && (
              <span className={styles.error}>{errors.location}</span>
            )}
          </label>

          {(formData.location === "office" ||
            formData.location === "coffee") && (
            <label>
              Enter City *
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
          )}

          <label>
            Date Requested *
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // to disable past days added this line
            />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </label>

          <label>
            Message (Optional)
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
