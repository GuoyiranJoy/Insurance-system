import { Modal } from "antd";
import React, { useState } from "react";
import MyButton from "../common/MyButton";
import AddInformation from "./AddInformation";

const AddModal = ({ visibility, setIsModalVisible, getRules }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      width={"60%"}
      key={visibility}
      title={"核保规则添加"}
      open={visibility}
      closable={false}
      footer={[
        <MyButton key="cancel" loading={loading} onClick={handleCancel}>
          {"关闭"}
        </MyButton>,
        <MyButton
          type="primary"
          key="ok"
          loading={loading}
          // onClick={handlePost}
        >
          {"确定"}
        </MyButton>,
      ]}
    >
      <AddInformation info={info} setInfo={setInfo} />
    </Modal>
  );
};

export default AddModal;
