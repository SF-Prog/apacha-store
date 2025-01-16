'use client'

import React, { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react"
import { loginAdmin } from "@/actions/loginAdmin";
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const loginUser = (data: UserCredential) => {
    loginAdmin(data.email, data.password);
  };

  const value = {
    loginUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  };
  return context;
}
