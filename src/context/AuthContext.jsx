// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API = "http://localhost:3000"; // <--- FIXED
const GUEST_AVATAR = "/guest.jpg";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ============================================================
  // AUTO LOGIN
  // ============================================================
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: "Bearer " + token },
        });

        const data = await res.json();

        if (!res.ok) {
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        } else {
          setUser({
            ...data,
            avatar: data.avatar || GUEST_AVATAR,
          });
        }
      } catch {
        setUser(null);
        localStorage.removeItem("token");
        setToken(null);
      }

      setLoading(false);
    }

    loadUser();
  }, [token]);

  // ============================================================
  // LOGIN
  // ============================================================
  async function login(email, password) {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      setToken(data.token);

      setUser({
        ...data.user,
        avatar: data.user.avatar || GUEST_AVATAR,
      });

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // ============================================================
  // SIGNUP
  // ============================================================
  async function signup(username, email, password) {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      setToken(data.token);

      setUser({
        ...data.user,
        avatar: data.user.avatar || GUEST_AVATAR,
      });

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // ============================================================
  // UPDATE PROFILE
  // ============================================================
  async function updateProfile(fields) {
    try {
      const res = await fetch(`${API}/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(fields),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser({
        ...data,
        avatar: data.avatar || GUEST_AVATAR,
      });

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  // ============================================================
  // LOGOUT
  // ============================================================
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
