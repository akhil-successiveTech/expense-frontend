"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import Navbar from "@/components/Navbar"; // Assuming you still want to keep the Navbar
import styles from "./Category.module.css";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Categories</h1>

      <div className={styles.sectionContainer}>
        <h2 className={styles.subHeading}>Add Category</h2>
        <CategoryForm onAdd={(c) => setCategories([...categories, c])} />
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={styles.subHeading}>Category List</h2>
        <CategoryList
          categories={categories}
          onDelete={(id) =>
            setCategories(categories.filter((c) => c._id !== id))
          }
        />
      </div>
    </div>
  );
}