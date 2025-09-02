"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth";
import styles from "./Signup.module.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/signup", form);
      setToken(res.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  // 👉 Google Signup
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div className={styles.container}>
      <video className={styles.backgroundVideo} autoPlay loop muted>
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className={styles.title}>Signup</h1>
      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <input
          className={styles.input}
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Signup
        </button>
      </form>

      <div className={styles.divider}>OR</div>

      <button onClick={handleGoogleSignup} className={styles.googleButton}>
        Sign up with Google
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
