'use client'

import React, { useEffect } from "react";
import AdminPanel from "@/components/admin-panel/layout/layout";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";


export default function AdminPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  const redirectIfNotAdmin = async () => {
    const isAuthenticated = await isAdmin();
    if (!isAuthenticated)  return router.push('/admin/login');
  };

  useEffect(() => {
    void redirectIfNotAdmin();
  }, []);

  return (
    <AdminPanel />
  );
};