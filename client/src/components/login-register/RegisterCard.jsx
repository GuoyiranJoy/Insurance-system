import React, { useState } from "react";
import {
  HiLockClosed,
  HiLockOpen,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import { toast } from "react-toastify";

import { UserRegister } from "../../services/user";
import { Input } from "./Input";

const RegisterCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
    setIsRegistering(true);
    UserRegister({ username, password, email })
      .then((res) => {
        if (res.data.code === "200") {
          toast.success("注册成功!");
        }
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  return (
    <div className="w-full px-16 flex flex-col items-center gap-1 py-2">
      <Input
        icon={<HiOutlineUser className="absolute ml-3 text-slate-600" />}
        type="text"
        placeholder={"用户名"}
        validate={true}
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
      />
      <Input
        icon={<HiLockOpen className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"密码"}
        validate={true}
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <Input
        icon={<HiLockClosed className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"确认密码"}
        validate={true}
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
      />
      {confirmPassword && password !== confirmPassword ? (
        <span className="text-rose-500 text-sm ml-2 -my-2 self-start">
          两次密码不一致!
        </span>
      ) : null}
      <Input
        icon={<HiOutlineMail className="absolute ml-3 text-slate-600" />}
        type="email"
        placeholder={"邮箱"}
        validate={true}
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleRegister}
        disabled={
          !username ||
          !password ||
          !confirmPassword ||
          !email ||
          password !== confirmPassword
        }
        className={`w-full my-2 py-1.5 relative text-neutral-50 disabled:bg-gray-300 disabled:hover:shadow-none ${
          isRegistering
            ? "bg-blue-300 after:absolute after:w-6 after:h-6 after:inset-x-0 after:inset-y-0 after:m-auto after:border-transparent after:border-4 after:rounded-full after:border-t-white after:animate-loading"
            : "bg-blue-500 duration-300 hover:shadow-lg"
        }`}
      >
        <span className={`${isRegistering ? "opacity-0" : ""}`}>{"注 册"}</span>
      </button>
    </div>
  );
};

export default RegisterCard;
