import { Modal } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ImportInsur } from "../../../services/excel";
import MyButton from "../../common/MyButton";

const ImportModal = ({ visibility, setVisibility }) => {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDataImport = () => {
    if (!file) {
      toast.error("请先上传需要解析的文件");
      return;
    } else {
      ImportInsur(file)
        .then((res) => {
          if (res.data.data) {
            toast.success("全部导入成功!");
          } else {
            toast.warn("导入失败, 请检查数据格式!");
          }
        })
        .catch(() => {
          toast.error("导入失败, 请检查数据格式!");
        });
    }
  };

  return (
    <Modal
      key={visibility}
      title={"导入文件"}
      open={visibility}
      onCancel={() => setVisibility(false)}
      footer={[
        <MyButton onClick={handleDataImport} type="primary">
          数据解析
        </MyButton>,
      ]}
    >
      <input
        type="file"
        className="py-4"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileChange}
      />
    </Modal>
  );
};

export default ImportModal;
