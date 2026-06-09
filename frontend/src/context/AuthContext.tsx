import { createContext, useContext, useState, type ReactNode } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

function getValidToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return token;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
const [token, setToken] = useState<string | null>(getValidToken());
  const login = (t: string) => {
    localStorage.setItem('token', t)
    setToken(t)
  }
  axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}