import React, { useState } from "react";
import { errorInputStyle, inputStyle } from "../../utils/styles";

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
        className={
          showErrorMsg ? `${inputStyle} ${errorInputStyle}` : inputStyle
        }
        placeholder={showErrorMsg ? `请输入${placeholder}` : placeholder}
        value={value}
        onChange={(e) => {
          handleChange(e);
          if (validate) {
            setShowErrorMsg(false);
          }
        }}
        onBlur={() => {
          if (validate) {
            if (!value) {
              setShowErrorMsg(true);
            }
          }
        }}
      />
    </div>
  );
};
