import { useState } from "react";
import api from "../utils/api";

export default function ExpenseForm({ categories, onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    categoryId: "",
    note: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/expenses", form);
      onAdd(res.data);
      setForm({ amount: "", categoryId: "", note: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
      {error && <p>{error}</p>}
    </form>
  );
}
