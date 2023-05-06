import { Modal } from "antd";
import React, { useState } from "react";
import { AddOrUpdateCar } from "../../../services/car";
import MyButton from "../../common/MyButton";
import AddInformation from "./AddInformation";
import { toast } from "react-toastify";

const AddModal = ({
  visibility,
  setIsModalVisible,
  allCompanyOptions,
  allBranchOptions,
  getCars,
}) => {
  const companyInt2StrMap = new Map(
    allCompanyOptions.map((obj) => [obj.value, obj.label])
  );
  const branchInt2StrMap = new Map(
    allBranchOptions.map((obj) => [obj.value, obj.label])
  );

  const [info, setInfo] = useState({});

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = () => {
    const body = {
      ...info,
      companyName: info.companyName.map((_) => companyInt2StrMap.get(_)),
      branchName: info.branchName.map((_) => branchInt2StrMap.get(_)),
    };
    AddOrUpdateCar(body).then((res) => {
      if (res.data) {
        toast.success("新增车险费率成功!");
        setIsModalVisible(false);
        getCars();
      } else {
        toast.error("出错啦!");
      }
    });
  };

  return (
    <Modal
      key={`add modal ${visibility}`}
      title={"新增车险费率"}
      open={visibility}
      closable={false}
      footer={[
        <MyButton key="cancel" onClick={handleCancel}>
          {"关闭"}
        </MyButton>,
        <MyButton type="primary" key="ok" onClick={handleAdd}>
          {"确定"}
        </MyButton>,
      ]}
    >
      <AddInformation
        info={info}
        setInfo={setInfo}
        allCompanyOptions={allCompanyOptions}
        allBranchOptions={allBranchOptions}
      />
    </Modal>
  );
};

export default AddModal;
