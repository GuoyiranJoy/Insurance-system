import React from "react";
import Logo from "../components/login-register/Logo";
import ContentCard from "../components/login-register/ContentCard";

const Login = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 py-28 items-center bg-loginBg bg-no-repeat bg-cover bg-fixed bg-center bg-[#F5F5F5]">
      <Logo />
      <ContentCard />
    </div>
  );
};

export default Login;
