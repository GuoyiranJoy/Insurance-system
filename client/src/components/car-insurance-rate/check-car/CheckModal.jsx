import { Modal } from "antd";
import React from "react";
import MyButton from "../../common/MyButton";
import ViewInformation from "../view-car/ViewInformation";
import { CheckCar } from "../../../services/car";
import { toast } from "react-toastify";

const CheckModal = ({ curCar, visibility, setIsModalVisible, getCars }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    CheckCar(curCar.carInsurId).then(() => {
      toast.success("审核成功!");
      setIsModalVisible(false);
      getCars();
    });
  };

  return (
    <Modal
      width={"50%"}
      key={`check modal ${visibility}`}
      title={"审核车险费率"}
      open={visibility}
      onCancel={handleCancel}
      footer={[
        <MyButton key="cancel" onClick={handleCancel}>
          {"关闭"}
        </MyButton>,
        <MyButton key="check" type={"primary"} onClick={handleOk}>
          {"审核"}
        </MyButton>,
      ]}
    >
      <ViewInformation curCar={curCar} />
    </Modal>
  );
};

export default CheckModal;
