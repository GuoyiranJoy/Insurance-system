import React, { useState } from "react";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";

const showCSS =
  "text-blue-500 text-lg relative outline-none focus:outline-none before:absolute before:rounded-lg before:w-6 before:h-1 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-200";

const ContentCard = () => {
  const [loginShow, setLoginShow] = useState(true);
  const [regShow, setRegShow] = useState(false);
  return (
    <div className="w-80% md:w-[480px] p-6 flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
      <nav className="flex justify-center gap-8 text-gray-500 font-semibold">
        <button
          className={loginShow ? showCSS : "outline-none focus:outline-none"}
          onClick={() => {
            setLoginShow(true);
            setRegShow(false);
          }}
        >
          {"登 录"}
        </button>
        <button
          className={regShow ? showCSS : "outline-none focus:outline-none"}
          onClick={() => {
            setLoginShow(false);
            setRegShow(true);
          }}
        >
          {"注 册"}
        </button>
      </nav>
      {loginShow && <LoginCard />}
      {regShow && <RegisterCard />}
    </div>
  );
};

export default ContentCard;
