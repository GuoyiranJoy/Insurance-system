import React, { useEffect, useState } from "react";
import {
  HiLockClosed,
  HiLockOpen,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";

import { Input } from "./Input";

const RegisterCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [timeLeft, setTimeLeft] = useState(null);

  const [isRegistering, setIsRegistering] = useState(false);
  const [didSendCodeOnce, setDidSendCodeOnce] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    setIsRegistering(true);
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (didSendCodeOnce) {
      return;
    }
    setDidSendCodeOnce(true);
    setTimeLeft(60);
  };

  useEffect(() => {
    if (!didSendCodeOnce) {
      return;
    }
    const sendTimer = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(sendTimer);
        setDidSendCodeOnce(false);
      } else {
        setTimeLeft((pre) => pre - 1);
      }
    }, 1000);

    return () => clearInterval(sendTimer);
  }, [timeLeft]);

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
        placeholder={"请输入用户名"}
        validate={true}
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
      />
      <Input
        id={"password"}
        name={"password"}
        icon={<HiLockOpen className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"请输入密码"}
        validate={true}
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <Input
        id={"confirm-password"}
        name={"confirm-password"}
        icon={<HiLockClosed className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"请确认密码"}
        validate={true}
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Input
        id={"email"}
        name={"email"}
        icon={<HiOutlineMail className="absolute ml-3 text-slate-600" />}
        type="email"
        placeholder={"请输入注册邮箱"}
        validate={true}
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <div className="w-full flex items-center py-2">
        <label htmlFor={code}></label>
        <input
          autoComplete="off"
          type="number"
          name="code"
          id="code"
          className="appearance-none leading-5 w-3/5 py-2 px-3 border-2 border-[#E1E7E9] text-slate-700 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          placeholder="请输入6位验证码"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          disabled={!email}
          className={`flex-1 h-full ml-2 text-sm text-center rounded disabled:bg-gray-300 ${
            didSendCodeOnce
              ? " bg-gray-300 text-slate-700"
              : "bg-blue-500 text-white"
          }`}
          onClick={handleSendCode}
        >
          {didSendCodeOnce ? `${timeLeft}s后重新发送` : "发送验证码"}
        </button>
      </div>
      <button
        disabled={!username || !password || !confirmPassword || !email || !code}
        className={`w-full my-2 py-1.5 relative text-neutral-50 disabled:bg-gray-300 disabled:hover:shadow-none ${
          isRegistering
            ? "bg-blue-300 after:absolute after:w-6 after:h-6 after:inset-x-0 after:inset-y-0 after:m-auto after:border-transparent after:border-4 after:rounded-full after:border-t-white after:animate-loading"
            : "bg-blue-500 duration-300 hover:shadow-lg"
        }`}
      >
        <span className={`${isRegistering ? "opacity-0" : ""}`}>{"注 册"}</span>
      </button>
    </form>
  );
};

export default RegisterCard;
