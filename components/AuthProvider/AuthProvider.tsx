"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchUserProfile } from "@/lib/api/clientApi";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, clearAuth } = useAuthStore();

  useEffect(() => {

    if (pathname.startsWith("/auth")) return;

    if (!user) {
      fetchUserProfile()
        .then(setUser)
        .catch(() => {
          clearAuth();
          if (pathname.startsWith("/profile") || pathname.startsWith("/basket")) {
            router.push("/auth/login");
          }
        });
    }
  }, [pathname, user, setUser, clearAuth, router]);

  return <>{children}</>;
}