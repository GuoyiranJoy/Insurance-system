import React, { useState } from "react";
import { inputStyle } from "../../utils/styles";
import { errorInputStyle } from "../../utils/styles";

export const Input = ({
  id,
  name,
  icon,
  type,
  placeholder,
  value,
  validate,
  handleChange,
}) => {
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  return (
    <div className="w-full flex items-center py-2">
      <label htmlFor={name}></label>
      {icon}
      <input
        autoComplete="off"
        type={type}
        name={name}
        id={id}
        className={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          handleChange(e);
          if (validate) {
            e.target.classList.remove(...errorInputStyle.split(" "));
            setShowErrorMsg(false);
          }
        }}
        onBlur={(e) => {
          if (validate) {
            if (!value) {
              e.target.classList.add(...errorInputStyle.split(" "));
              setShowErrorMsg(true);
            }
          }
        }}
      />
      {showErrorMsg ? (
        <span className="absolute pt-14 pl-1 text-sm text-rose-600">
          {"这是必填项"}
        </span>
      ) : null}
    </div>
  );
};
