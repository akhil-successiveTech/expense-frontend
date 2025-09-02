"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "@/utils/auth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push("/");
  };

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Categories", href: "/category" },
    { name: "Expenses", href: "/expense" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Brand */}
        <Link href="/dashboard" className={styles.brand}>
          ExpenseTracker
        </Link>

        {/* Links */}
        <div className={styles.links}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${
                pathname === link.href ? styles.linkActive : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          ) : (
            <>
              <button
                className={styles.logoutBtn}
                onClick={() => router.push("/")}
              >
                Login
              </button>
              <button
                className={styles.logoutBtn}
                onClick={() => router.push("/signup")}
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
