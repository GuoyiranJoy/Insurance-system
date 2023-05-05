import React, { useState } from "react";
import { HiLockClosed, HiOutlineUser } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLogin } from "../../services/user";

import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import { Input } from "./Input";

const LoginCard = ({ changeToRegCard }) => {
  const { setToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogging(true);
    UserLogin({ username, password })
      .then((res) => {
        toast.dismiss();
        setToken(res.data.data);
        localStorage.setItem("USER_KEY", JSON.stringify(res.data.data));
        setIsLogging(false);

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
      })
      .finally(() => {
        setIsLogging(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-16 flex flex-col items-center gap-1 py-2"
    >
      <Input
        id={"username"}
        name={"username"}
        icon={<HiOutlineUser className="absolute ml-3 text-slate-600" />}
        type="text"
        placeholder={"用户名"}
        validate={true}
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
      />
      <Input
        id={"password"}
        name={"password"}
        icon={<HiLockClosed className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"密码"}
        validate={true}
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={!username || !password}
        className={`w-full my-2 py-1.5 relative text-neutral-50 disabled:bg-gray-300 disabled:hover:shadow-none ${
          isLogging
            ? "bg-blue-300 after:absolute after:w-6 after:h-6 after:inset-x-0 after:inset-y-0 after:m-auto after:border-transparent after:border-4 after:rounded-full after:border-t-white after:animate-loading"
            : "bg-blue-500 duration-300 hover:shadow-lg"
        }`}
      >
        <span className={`${isLogging ? "opacity-0" : ""}`}>{"登 录"}</span>
      </button>
      <p className="text-sm self-end">
        没有账号？
        <span
          className="text-blue-500 underline hover:cursor-pointer"
          onClick={changeToRegCard}
        >
          去注册
        </span>
      </p>
    </form>
  );
};

export default LoginCard;
