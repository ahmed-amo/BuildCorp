// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  token: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>; // now async
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");
    if (token && id) {
      setUser({ token, id });
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userId", userData.id);
    setUser(userData);
  };

  const logout = async () => {
    try {
      if (user?.token) {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // send token to backend
          },
        });
      }
    } catch (err) {
      console.error("Logout API failed", err);
      // even if API fails, still clear local storage
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
