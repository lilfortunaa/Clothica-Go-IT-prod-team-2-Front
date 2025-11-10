"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchUserProfile } from "@/lib/api/clientApi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearAuth } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initUser = async () => {
      try {
        const user = await fetchUserProfile();
        if (mounted) setUser(user);
      } catch {
        if (mounted) clearAuth();
      } finally {
        if (mounted) setReady(true);
      }
    };

    initUser();
    return () => { mounted = false; };
  }, [setUser, clearAuth]);

  if (!ready) return <p>Завантаження...</p>;
  return <>{children}</>;
}
