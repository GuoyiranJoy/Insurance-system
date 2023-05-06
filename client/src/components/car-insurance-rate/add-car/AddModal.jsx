import { Modal } from "antd";
import React, { useState } from "react";
import { AddOrUpdateCar } from "../../../services/car";
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

  const [car, setCar] = useState({
    companyNameList: [],
    branchNameList: [],
    vehicleType: "家庭自用汽车6座以下",
    insurTypeName: "交强险",
    isChecked: 0,
  });

  const handleAdd = () => {
    const body = {
      ...car,
      companyNameList: car.companyNameList?.map((_) =>
        companyInt2StrMap.get(_)
      ),
      branchNameList: car.branchNameList?.map((_) => branchInt2StrMap.get(_)),
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
      footer={null}
    >
      <AddInformation
        curCar={car}
        setCar={setCar}
        allCompanyOptions={allCompanyOptions}
        allBranchOptions={allBranchOptions}
        submit={handleAdd}
        closeModal={() => {
          setIsModalVisible(false);
        }}
      />
    </Modal>
  );
};

export default AddModal;
