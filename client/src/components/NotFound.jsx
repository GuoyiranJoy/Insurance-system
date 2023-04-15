import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gray-200 h-full flex justify-center items-center">
      <div className="bg-white px-16 py-12 rounded-md">
        <h1 className="font-bold text-3xl pb-10">404</h1>
        <p className="text-gray-500 text-lg pb-4">你所浏览的网页暂时无法访问</p>
        <NavLink
          className="px-4 py-1 text-lg bg-blue-500 text-white rounded-full"
          to="/main"
        >
          回到首页
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
