"use client";  // needed in Next.js 13 app directory

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode"; // npm install jwt-decode

const GoogleSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // 1. Get token from URL query param
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      router.push("/signup"); // if no token, redirect back
      return;
    }

    // 2. Save token to localStorage
    localStorage.setItem("token", token);

    // 3. Decode token to get user data (optional)
    try {
      const userData = jwtDecode(token); // { id, email, name }
      localStorage.setItem("googleUser", JSON.stringify(userData));
    } catch (err) {
      console.error("Invalid token", err);
    }

    // 4. Redirect to dashboard
    router.push("/dashboard");
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Google Login Successful!</h1>
      <p>Redirecting to dashboard...</p>
    </div>
  );
};

export default GoogleSuccess;
