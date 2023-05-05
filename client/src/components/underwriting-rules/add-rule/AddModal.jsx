import { Modal } from "antd";
import React, { useState } from "react";
import { AddOrUpdateRule } from "../../../services/rule";
import MyButton from "../../common/MyButton";
import AddInformation from "./AddInformation";
import { toast } from "react-toastify";

const AddModal = ({
  visibility,
  setIsModalVisible,
  allCompanyOptions,
  allBranchOptions,
  getRules,
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
    AddOrUpdateRule(body).then((res) => {
      if (res.data) {
        toast.success("新增核保规则成功!");
        setIsModalVisible(false);
        getRules();
      } else {
        toast.error("出错啦!");
      }
    });
  };

  return (
    <Modal
      width={"60%"}
      key={`add modal ${visibility}`}
      title={"新增核保规则"}
      open={visibility}
      onCancel={handleCancel}
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
