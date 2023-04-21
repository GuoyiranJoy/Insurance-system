import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserLogin } from "../services/UserLogin";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  const handleLogin = (username, password) => {
    UserLogin(username, password)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length) {
            setToken(res.data[0]);
            localStorage.setItem("token", JSON.stringify(res.data[0]));

            const origin = location.state?.from?.pathname;

            if (origin) {
              if (origin === "/login") {
                navigate("/main");
              } else {
                navigate(origin);
              }
            } else {
              navigate("/main");
            }
          } else {
            toast.error("用户名或密码错误");
          }
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("user");
    toast.dismiss();
    navigate("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
