import React from "react";
import { MdLogout } from "react-icons/md";
import DefaultAvatar from "../assets/avatar.png";
import { useAuth } from "./AuthProvider";

const Header = () => {
  const token = localStorage.getItem("token");
  const { onLogout } = useAuth();
  return (
    <div className="z-[99999] sticky top-0 flex bg-white px-6 py-3 shadow-[0_2px_5px_1px_rgba(0,0,0,0.3)]">
      <div className="ml-auto flex items-center gap-3">
        <img src={DefaultAvatar} alt="avatar" className="h-6 rounded-full" />
        <p className="text-[#474747]">
          {JSON.parse(token).username || "anonymous"}
        </p>
        <div className="w-[2.5px] py-3 rounded bg-slate-300"></div>
        <MdLogout
          className="hover:cursor-pointer"
          title="退出"
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default Header;
