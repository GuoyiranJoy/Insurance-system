import { Modal } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { preProcessData } from "../../../services/pre-process";
import { AddOrUpdateRule } from "../../../services/rule";
import MyButton from "../../common/MyButton";
import AddInformation from "./AddInformation";

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
      companyName: info.companyName?.map((_) => companyInt2StrMap.get(_)),
      branchName: info.branchName?.map((_) => branchInt2StrMap.get(_)),
    };
    if (Object.keys(preProcessData(body)).length < 5) {
      toast.warn("请将内容填写完整!");
      return;
    }
    AddOrUpdateRule(body).then((res) => {
      if (res.data) {
        toast.success("新增核保规则成功!");
        setIsModalVisible(false);
        getRules(undefined, "add");
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
