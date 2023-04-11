import React, { useState } from "react";
import { Modal } from "antd";
import MyButton from "../../common/MyButton";
import AddInformation from "./AddInformation";
import axios from "axios";

const AddModal = ({ visibility, setIsModalVisible, getInsurance }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePost = () => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://localhost:8080/insurance",
      data: info,
    })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setIsModalVisible(false);
        getInsurance();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      key={visibility}
      title={"险种信息添加"}
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
          onClick={handlePost}
        >
          {"确定"}
        </MyButton>,
      ]}
    >
      <AddInformation setInfo={setInfo} />
    </Modal>
  );
};

export default AddModal;
