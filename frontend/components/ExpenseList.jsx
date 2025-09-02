import api from "../utils/api";
import styles from "./ExpenseList.module.css";

export default function ExpenseList({ expenses, onDelete }) {
  const handleDelete = async (id) => {
    await api.delete(`/api/expenses/${id}`);
    onDelete(id);
  };

  return (
    <ul>
      {expenses.map((e) => (
        <li key={e._id} className={styles.expenseItem}>
          <span>
            Rs {e.amount} | {e.category?.name || "No Category"} |{" "}
            {new Date(e.date).toLocaleDateString()} | {e.note || "No note"}
          </span>
          <button
            onClick={() => handleDelete(e._id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
