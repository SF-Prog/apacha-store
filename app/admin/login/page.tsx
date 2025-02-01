'use client'

import React from "react"
import { AdminLogin } from "@/components/admin-panel/login/login";

export default function AdminLoginPage() {
  return (
    <div className="flex h-[100vh] w-full justify-center items-center">
      <AdminLogin />
    </div>
  );
};