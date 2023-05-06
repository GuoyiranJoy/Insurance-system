import { Modal } from "antd";
import React, { useState } from "react";
import MyButton from "../../../common/MyButton";
import AddInformation from "./AddInformation";
import { AddInsurance } from "../../../../services/insurance";
import { toast } from "react-toastify";

const AddModal = ({
  allCompanyNames,
  paramDiffNames,
  visibility,
  setIsModalVisible,
  getInsurance,
}) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ commonYear: [] });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePost = () => {
    setLoading(true);
    AddInsurance(info)
      .then(() => {
        toast.success("新增险种信息成功!");
        setIsModalVisible(false);
        getInsurance("add");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      key={visibility}
      title={"新增险种信息"}
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
      <AddInformation
        info={info}
        setInfo={setInfo}
        allCompanyNames={allCompanyNames}
        paramDiffNames={paramDiffNames}
      />
    </Modal>
  );
};

export default AddModal;
