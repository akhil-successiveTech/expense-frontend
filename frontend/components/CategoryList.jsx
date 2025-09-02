import api from "../utils/api";
import style from "./CategoryList.module.css";

export default function CategoryList({ categories, onDelete }) {
  const handleDelete = async (id) => {
    await api.delete(`/api/categories/${id}`);
    onDelete(id);
  };

  return (
    <ul>
      {categories.map((c) => (
        <li className={style.expenseItem} key={c._id}>
          {c.name} Limit: {c.limit || "No limit"}
          <button className={style.deleteButton} onClick={() => handleDelete(c._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
