import React from "react";

const MyButton = ({ children, onClick, type }) => {
  return (
    <button
      className={`mx-2 px-4 py-0.5 border-solid border-[1.5px] rounded transition-all duration-100  ${
        type === "primary"
          ? "border-transparent bg-blue-500 text-white hover:bg-blue-500/90"
          : "hover:border-blue-400 hover:text-blue-500"
      }`}
      onClick={onClick}
    >
      {children?.split("").join(" ")}
    </button>
  );
};

export default MyButton;
