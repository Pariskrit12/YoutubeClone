import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axios.get("/api/v1/users/get-personal-info", {
          withCredentials: true,
        });
        setUser(response.data.data);
        
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    isLoggedIn();
  }, [user]);

  const login = async (email, password) => {
    const response = await axios.post(
      "/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(response.data.data);
  };

  const logout = async () => {
    await axios.post("/api/v1/users/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
