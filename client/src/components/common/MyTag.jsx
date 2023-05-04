import React from "react";

const MyTag = ({ content, bgColor, textColor, borderColor }) => {
  return (
    <div
      className={`${bgColor} rounded border-solid ${borderColor} border-[1px] ${textColor} px-1 my-1 mr-2`}
    >
      {content}
    </div>
  );
};

export default MyTag;
