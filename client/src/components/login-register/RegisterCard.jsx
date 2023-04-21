import React, { useState } from "react";
import { HiLockClosed, HiLockOpen, HiOutlineUser } from "react-icons/hi";

import { Input } from "./Input";

const RegisterCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    setIsRegistering(true);
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
        icon={<HiLockOpen className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"密码"}
        validate={true}
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <Input
        id={"confirm-password"}
        name={"confirm-password"}
        icon={<HiLockClosed className="absolute ml-3 text-slate-600" />}
        type="password"
        placeholder={"确认密码"}
        validate={true}
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        disabled={!username || !password || !confirmPassword}
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
