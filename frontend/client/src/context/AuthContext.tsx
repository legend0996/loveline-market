import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../types";

// ── Types ───────────────────────────────────────────────────────────────────
interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  adminToken: string | null;
  isAdmin: boolean;
  loginUser: (token: string, user: AuthUser) => void;
  loginAdmin: (token: string) => void;
  logoutUser: () => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );

  const [adminToken, setAdminToken] = useState<string | null>(
    () => localStorage.getItem("adminToken")
  );

  const isAdmin = !!adminToken;

  const loginUser = (t: string, u: AuthUser) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const loginAdmin = (t: string) => {
    localStorage.setItem("adminToken", t);
    setAdminToken(t);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  // Sync on storage events (multi-tab)
  useEffect(() => {
    const handler = () => {
      setToken(localStorage.getItem("token"));
      setAdminToken(localStorage.getItem("adminToken"));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        adminToken,
        isAdmin,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
