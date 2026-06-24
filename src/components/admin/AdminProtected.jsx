"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminProtected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="text-center fade-in">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return children;
}
