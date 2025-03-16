"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Function to handle login
  const login = (token: string) => {
    const em=localStorage.getItem("email");
    console.log(em);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
