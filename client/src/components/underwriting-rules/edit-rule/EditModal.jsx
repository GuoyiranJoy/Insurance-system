import { Modal } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { preProcessData } from "../../../services/pre-process";
import { AddOrUpdateRule } from "../../../services/rule";
import MyButton from "../../common/MyButton";
import EditInformation from "./EditInformation";

const EditModal = ({
  curRecord,
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
  const companyStr2IntMap = new Map(
    allCompanyOptions.map((obj) => [obj.label, obj.value])
  );
  const branchStr2IntMap = new Map(
    allBranchOptions.map((obj) => [obj.label, obj.value])
  );

  const [info, setInfo] = useState({
    ...curRecord,
    companyName: curRecord.companyName.map((_) => companyStr2IntMap.get(_)),
    branchName: curRecord.branchName.map((_) => branchStr2IntMap.get(_)),
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    const body = {
      ...info,
      companyName: info.companyName?.map((_) => companyInt2StrMap.get(_)),
      branchName: info.branchName?.map((_) => branchInt2StrMap.get(_)),
    };
    if (Object.keys(preProcessData(body)).length < 6) {
      toast.warn("请将内容填写完整!");
      return;
    }
    AddOrUpdateRule(body).then((res) => {
      if (res.data) {
        toast.success("更新核保规则成功!");
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
      key={`rule edit modal ${visibility}`}
      title={"修改核保规则"}
      open={visibility}
      onCancel={handleCancel}
      footer={[
        <MyButton key="cancel" onClick={handleCancel}>
          {"关闭"}
        </MyButton>,
        <MyButton type="primary" key="ok" onClick={handleEdit}>
          {"确定"}
        </MyButton>,
      ]}
    >
      <EditInformation
        info={info}
        setInfo={setInfo}
        allCompanyOptions={allCompanyOptions}
        allBranchOptions={allBranchOptions}
      />
    </Modal>
  );
};

export default EditModal;
