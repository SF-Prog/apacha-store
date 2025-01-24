'use client'

import React from "react"
import AdminPanel from "@/components/admin-panel/layout/layout";
import { AdminProvider } from "@/context/admin-context";

export default function AdminPage() {
  return (
     <AdminProvider>
       <AdminPanel />
     </AdminProvider>
  );
};