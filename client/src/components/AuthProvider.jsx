import React, { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const fakeAuth = () =>
  new Promise((resolve, reject) => {
    resolve("Admin");
  });

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const token = await fakeAuth();

    localStorage.setItem("user", token);

    const origin = location.state?.from?.pathname || "/main";
    navigate(origin);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
