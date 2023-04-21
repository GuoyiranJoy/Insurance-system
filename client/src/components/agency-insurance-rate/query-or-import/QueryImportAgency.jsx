import React from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import { FiDatabase } from "react-icons/fi";

const QueryImportAgency = () => {
  return (
    <div className="w-4/5 mx-auto my-0 pt-2 pb-2 pl-10 lg:pl-12 pr-10 lg:pr-12">
      <h2 className="text-3xl tracking-wider py-6">您需要...</h2>
      <div className="flex mx-auto my-0 py-6 justify-evenly bg-white rounded">
        <section className="flex flex-col items-center gap-6 px-12 py-6">
          <h3 className="text-lg tracking-wider">生成费率导入空模板</h3>
          <RiFileExcel2Line className="w-36 h-36 p-6 text-green-600 bg-gray-100 rounded-full hover:cursor-pointer hover:bg-gray-200" />
          <p className="text-sm text-slate-600">
            *您可以在弹出的对话框中对某些字段进行选择
          </p>
        </section>
        <section className="flex flex-col items-center gap-6 px-12 py-6">
          <h3 className="text-lg tracking-wider">从已有文件批量导入数据</h3>
          <FiDatabase className="w-36 h-36 p-6 text-[#67a4e0] bg-gray-100 rounded-full hover:cursor-pointer hover:bg-gray-200" />
          <p className="text-sm text-slate-600">
            *文件内格式不符合要求的数据将不能成功导入
          </p>
        </section>
      </div>
    </div>
  );
};

export default QueryImportAgency;
