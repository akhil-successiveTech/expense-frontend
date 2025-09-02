import { useState } from "react";
import api from "../utils/api";
import styles from "./CategoryForm.module.css"; // Import the CSS module

export default function CategoryForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", limit: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/api/categories", form);
    onAdd(res.data);
    setForm({ name: "", limit: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        required
        className={styles.inputField} // Apply input field styles
      />
      <input
        name="limit"
        type="number"
        placeholder="Spending Limit"
        value={form.limit}
        onChange={handleChange}
        className={styles.inputField} // Apply input field styles
      />
      <button type="submit" className={styles.submitButton}>Add Category</button> {/* Apply button styles */}
    </form>
  );
}
