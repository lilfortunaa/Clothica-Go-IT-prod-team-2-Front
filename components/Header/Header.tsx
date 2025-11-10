"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout as apiLogout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try { await apiLogout(); } catch {}
    clearAuth();
    router.push("/");
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <nav className={css.nav}>
          <Link href="/" className={css.link}>Головна</Link>
          <Link href="/goods" className={css.link}>Товари</Link>
          <Link href="/categories" className={css.link}>Категорії</Link>

          {isAuthenticated && user ? (
            <>
              <span className={css.userName}>Привіт, {user.firstName}!</span>
              <button onClick={handleLogout} className={css.logoutBtn}>Вийти</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={css.link}>Вхід</Link>
              <Link href="/auth/register" className={css.link}>Реєстрація</Link>
            </>
          )}
        </nav>

        <div className={css.debug}>
          <small>{isAuthenticated ? "✅ Logged in" : "❌ Not logged in"}</small>
        </div>
      </div>
    </header>
  );
}
