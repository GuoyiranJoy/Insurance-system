import React, { useState } from "react";
import { FiDatabase } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";
import GenerateModal from "./GenerateModal";
import ImportModal from "./ImportModal";

const QueryImportAgency = () => {
  const [isGenerateModalVisible, setIsGenerateModalVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  return (
    <div className="w-4/5 mx-auto my-0 pt-2 pb-2 pl-10 lg:pl-12 pr-10 lg:pr-12">
      <p className="text-3xl tracking-wider py-6">您需要...</p>
      <div className="flex mx-auto my-0 py-6 justify-evenly bg-white rounded">
        <section className="flex flex-col items-center gap-6 px-12 py-6">
          <p className="text-lg tracking-wider">生成费率导入空模板</p>
          <RiFileExcel2Line
            onClick={() => setIsGenerateModalVisible(true)}
            className="w-36 h-36 p-6 text-green-600 bg-gray-100 rounded-full hover:cursor-pointer hover:bg-gray-200"
          />
          <p className="text-sm text-slate-600">
            *您可以在弹出的对话框中对某些字段进行选择
          </p>
        </section>
        <section className="flex flex-col items-center gap-6 px-12 py-6">
          <p className="text-lg tracking-wider">从已有文件批量导入数据</p>
          <FiDatabase
            onClick={() => setIsImportModalVisible(true)}
            className="w-36 h-36 p-6 text-[#67a4e0] bg-gray-100 rounded-full hover:cursor-pointer hover:bg-gray-200"
          />
          <p className="text-sm text-slate-600">
            *文件内格式不符合要求的数据将不能成功导入
          </p>
        </section>
      </div>
      <GenerateModal
        visibility={isGenerateModalVisible}
        setVisibility={setIsGenerateModalVisible}
      />
      <ImportModal
        visibility={isImportModalVisible}
        setVisibility={setIsImportModalVisible}
      />
    </div>
  );
};

export default QueryImportAgency;
