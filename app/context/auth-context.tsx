'use client'

import React, { createContext, useState, useContext, ReactNode } from "react"
import { loginAdmin } from "@/actions/login-admin";
import { checkSession } from "@/actions/check-session";
import { displayToaster } from "@/lib/utils";
import { toasterStatus } from "@/lib/constants";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginUser = (data: UserCredential) => {
    // TODO: create specific action to log in users
    // loginUser(data.email, data.password);
  };

  const onLoginAdmin = async () => {
    try {
      setIsLoading(true)
      const data = await loginAdmin(email, password);
      if (!data.success) throw new Error(data.error.message);
      displayToaster(toasterStatus.SUCCESS, data.message);
      router.push('/admin');
    } catch (error) {
      if (!error) return;
      displayToaster(toasterStatus.ERROR, error.message);
      // Display error
    } finally {
      setIsLoading(false);
    };
  };

  const isAdmin = async () => {
    try {
      setIsLoading(true);
      const response = await checkSession();
      if (!response.success) throw new Error(response.error);

      return true;
    } catch (error) {
      displayToaster(toasterStatus.ERROR, error.message ?? 'Something went wrong.') ;
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    loginUser,
    onLoginAdmin,
    isLoading,
    setIsLoading,
    email,
    setEmail,
    password,
    setPassword,
    isAdmin
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
