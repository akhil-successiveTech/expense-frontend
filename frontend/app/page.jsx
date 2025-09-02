"use client";
import { useState } from "react";
import api from "@/utils/api"; // Adjust path according to your actual structure
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth"; // Adjust path according to your actual structure
import styles from "./Login.module.css"; // Make sure the CSS file is inside /app/login

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
      setToken(res.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  
  return (
    <div className={styles.container}>
      <video className={styles.backgroundVideo} autoPlay loop muted>
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.formTile}>
        <h1 className={styles.login}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button
        className={styles.googleButton}
        onClick={() =>
          (window.location.href = "http://localhost:4000/api/auth/google")
        }
      >
        Login with Google
      </button>
      </div>
    </div>
  );
}
