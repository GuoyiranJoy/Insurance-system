import { Modal } from "antd";
import React from "react";
import MyButton from "../../common/MyButton";
import ViewInformation from "./ViewInformation";

const ViewModal = ({ visibility, setIsModalVisible, curRecord }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      width={"60%"}
      key={`view modal ${visibility}`}
      title={"核保规则详情"}
      open={visibility}
      onCancel={handleCancel}
      footer={[
        <MyButton key="cancel" onClick={handleCancel}>
          {"关闭"}
        </MyButton>,
      ]}
    >
      <ViewInformation record={curRecord} />
    </Modal>
  );
};

export default ViewModal;
