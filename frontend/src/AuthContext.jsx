import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, signOut } from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getProfile();
      setUser(res.data.user);
    } catch (err) {
      // token is probably bad/expired at this point
      localStorage.removeItem("token");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function logout() {
    if (localStorage.getItem("token")) {
      try {
        await signOut();
      } catch (err) {
        console.log(err);
      }
    }

    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
