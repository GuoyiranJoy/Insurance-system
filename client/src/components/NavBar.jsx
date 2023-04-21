import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Title from "../assets/title.png";

const NavBar = ({ items }) => {
  const { pathname } = useLocation();

  return (
    <nav className="basis-52 shrink-0 bg-[#383D4D] select-none">
      <div className="sticky w-52 top-6 left-0">
        <NavLink to="/main">
          <img src={Title} alt="title" className="h-6 my-6 px-4" />
        </NavLink>
        <ul>
          {items &&
            items.map(({ id, name, route, icon }) => (
              <li key={id}>
                <NavLink
                  className={`flex gap-1 items-center px-2 py-3 border-l-4 hover:cursor-pointer tracking-wide transition-all ${
                    pathname.slice(6) === route
                      ? "text-white bg-[#50566D] border-[#7C7EE6]"
                      : "text-[#8994BA] border-transparent hover:bg-[#2c2f3b]"
                  }`}
                  to={route}
                >
                  {icon}
                  <p className="text-sm">{name}</p>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
