"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, isAdminRole } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    if (!isAdminRole()) {
      router.replace("/unauthorized");
    }
  }, [router]);

  if (!getToken() || !isAdminRole()) {
    return null;
  }

  return <>{children}</>;
}
