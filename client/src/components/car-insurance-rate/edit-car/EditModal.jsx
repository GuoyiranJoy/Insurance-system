import { Modal } from "antd";
import React, { useState } from "react";
import MyButton from "../../common/MyButton";
import EditInformation from "./EditInformation";
import { toast } from "react-toastify";
import { preProcessData } from "../../../services/pre-process";
import { AddOrUpdateCar } from "../../../services/car";

const EditModal = ({
  curCar,
  visibility,
  setIsModalVisible,
  allCompanyOptions,
  allBranchOptions,
  getCars,
}) => {
  const [car, setCar] = useState(curCar);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    if (Object.keys(preProcessData(car)).length < 11) {
      toast.warn("请将内容填写完整!");
      return;
    }
    AddOrUpdateCar(car).then(() => {
      toast.success("编辑成功!");
      setIsModalVisible(false);
      getCars();
    });
  };

  return (
    <Modal
      width={"50%"}
      key={`edit modal ${visibility}`}
      title={"编辑车险费率"}
      open={visibility}
      closable={false}
      footer={[
        <MyButton key="cancel" onClick={handleCancel}>
          {"关闭"}
        </MyButton>,
        <MyButton key="check" type={"primary"} onClick={handleOk}>
          {"保存"}
        </MyButton>,
      ]}
    >
      <EditInformation
        curCar={car}
        setCar={setCar}
        allCompanyOptions={allCompanyOptions}
        allBranchOptions={allBranchOptions}
      />
    </Modal>
  );
};

export default EditModal;
