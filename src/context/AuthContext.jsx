import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetPersonalInfoQuery } from "../api/userApi";
import Spinner from "../components/Spinner";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const {
    data,
    error,
    isLoading: userInfoLoading,
    refetch,
  } = useGetPersonalInfoQuery();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
    if (error) {
      setUser(null);
    }
  }, [data, error]);

  const refreshUser = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error("Error refreshing user", err);
    }
  };
  const login = async (email, password) => {
    const response = await axios.post(
      "/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(response.data.data); //Immediately update UI
    await refreshUser(); // fetch full fresh user info, triggers useEffect to update user again
  };

  const logout = async () => {
    await axios.post("/api/v1/users/logout", {}, { withCredentials: true });
    toast.success("Logout successfully");
    setUser(null);
  };

  if (userInfoLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, refreshUser, userInfoLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
