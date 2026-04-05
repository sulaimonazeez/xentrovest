import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setLogoutHandler } from "./AuthEvents";
import { setAuthToken, clearAuthToken, getAuthToken } from "../api/utility";
import axiosInstance from "../api/utility";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false); // ← prevents StrictMode double-run

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const restore = async () => {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get("/auth/check");
        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          _clearSession();
        }
      } catch {
        _clearSession();
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  const _clearSession = () => {
    clearAuthToken();
    localStorage.removeItem("user");
    setUser(null);
  };

  const login = useCallback((userData, token) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch {}
    _clearSession();
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};