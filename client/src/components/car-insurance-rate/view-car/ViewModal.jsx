import { Modal } from "antd";
import React from "react";
import MyButton from "../../common/MyButton";
import ViewInformation from "./ViewInformation";

const ViewModal = ({ curCar, visibility, setIsModalVisible }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      width={"50%"}
      key={`view modal ${visibility}`}
      title={"车险费率详情"}
      open={visibility}
      onCancel={handleCancel}
      footer={
        <MyButton key="cancel" onClick={handleCancel}>
          {"关闭"}
        </MyButton>
      }
    >
      <ViewInformation curCar={curCar} />
    </Modal>
  );
};

export default ViewModal;
