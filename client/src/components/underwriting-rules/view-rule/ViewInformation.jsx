import React from "react";
import MyTag from "../../common/MyTag";

const itemTitleStyle = "px-2 py-1 font-semibold text-gray-600";

const ViewInformation = ({ record }) => {
  const { name, rule, companyName, branchName, releaseDate } = record;
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex gap-2 justify-between items-center rounded hover:bg-gray-100">
        <div className="flex items-center gap-2">
          <p className={itemTitleStyle}>规则名称</p>
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-2 mr-10">
          <p className={itemTitleStyle}>发布日期</p>
          <p>{releaseDate}</p>
        </div>
      </div>
      <div className="mb-2 flex gap-2 items-center rounded hover:bg-gray-100">
        <p className={itemTitleStyle}>保险公司</p>
        <div className="flex items-center">
          {companyName.map((_, index) => (
            <MyTag
              key={`company ${index}`}
              content={_}
              bgColor={"bg-[#E6F4FF]"}
              borderColor={"border-[#1F7CFF]"}
              textColor={"text-[#1F7CFF]"}
            />
          ))}
        </div>
      </div>
      <div className="mb-2 flex gap-2 items-center rounded hover:bg-gray-100">
        <p className={itemTitleStyle}>分支机构</p>
        <div className="flex items-center">
          {branchName.map((_, index) => (
            <MyTag
              key={`branch ${index}`}
              content={_}
              bgColor={"bg-[#F6FFED]"}
              borderColor={"border-[#52C41A]"}
              textColor={"text-[#52C41A]"}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center rounded hover:bg-gray-100">
        <p className={`${itemTitleStyle} self-start`}>规则内容</p>
        <div
          className="flex-1 flex px-2 bg-white my-2 mr-4 rounded min-h-[120px]"
          dangerouslySetInnerHTML={{ __html: rule }}
        />
      </div>
    </div>
  );
};

export default ViewInformation;
