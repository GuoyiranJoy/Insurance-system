import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserLogout } from "../services/user";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("USER_KEY");
    UserLogout()
      .then((res) => {
        toast.success(res.data.msg, { autoClose: 2000 });
      })
      .then(() => {
        navigate("/login");
      });
  };

  const value = {
    token,
    setToken,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
