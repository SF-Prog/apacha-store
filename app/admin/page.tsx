'use client'

import React, { useEffect } from "react";
import AdminPanel from "@/components/admin-panel/layout/layout";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  return (
    <AdminPanel />
  );
};