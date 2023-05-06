import {
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Space,
  Table,
  Tabs,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QueryRate } from "../../../../services/commision-rate";
import { UpdateInsurance } from "../../../../services/insurance";
import { GetParamNames } from "../../../../services/rate-param-name";
import {
  insuranceTypeOptions,
  masterOptionsForCreate,
} from "../../../../utils/options";
import {
  buttonStyle,
  createInputStyle,
  editSelectStyle,
} from "../../../../utils/styles";
import MyButton from "../../../common/MyButton";
import RateTab from "../rate-information/RateTab";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const requiredFieldStyle =
  "w-16 text-gray-700 after:content-['*'] after:text-red-500";

const EditInformation = ({
  record,
  allCompanyNames,
  paramDiffNames,
  setIsModalVisible,
  getInsurance,
}) => {
  const [newRecord, setNewRecord] = useState({ ...record });

  const [commissionRate, setCommissionRate] = useState([]);
  const [rateParamNames, setRateParamNames] = useState([]);

  const [year, setYear] = useState(1);
  const [description, setDescription] = useState("");
  const [commonYearId, setCommonYearId] = useState(1);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [activeKey, setActiveKey] = useState("1");

  const {
    insurId,
    companyId,
    code,
    mainOrVice,
    insurType,
    insurFullName,
    insurShortName,
    paramDiffNameId,
    startSaleTime,
    stopSaleTime,
    remark,
    commonYear,
  } = newRecord;

  const reset = () => {
    setYear(1);
    setDescription("");
  };

  const handleCommonYearEdit = ({ id, year, description }) => {
    setIsEditModalVisible(true);
    setCommonYearId(id);
    setYear(year);
    setDescription(description);
  };

  const handleCommonYearDelete = (id) => {
    setNewRecord((pre) => ({
      ...pre,
      commonYear: pre.commonYear
        .map((_, index) => ({ ..._, id: index + 1 }))
        .filter((_) => _.id !== id),
    }));
    reset();
  };

  const handleCommonYearAddOk = () => {
    if (!year) {
      toast.error("请输入交费年期!");
      return;
    }
    const newItem = { year, description };
    const newCommonYear = newRecord.commonYear
      ? newRecord.commonYear.concat([newItem])
      : [newItem];
    setNewRecord((pre) => ({
      ...pre,
      commonYear: newCommonYear,
    }));
    reset();
    setIsAddModalVisible(false);
  };

  const handleCommonYearEditOk = () => {
    if (!year) {
      toast.error("请输入交费年期!");
      return;
    }
    const newItem = { year, description };
    setNewRecord((pre) => ({
      ...pre,
      commonYear: [
        ...pre.commonYear.slice(0, commonYearId - 1),
        newItem,
        ...pre.commonYear.slice(commonYearId),
      ],
    }));
    reset();
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditOk = () => {
    UpdateInsurance(newRecord).then(() => {
      toast.success("编辑险种信息成功!");
      setIsModalVisible(false);
      getInsurance();
    });
  };

  const commonYear_columns = [
    {
      title: "年期/分档",
      dataIndex: "year",
      width: 100,
    },
    {
      title: "说明",
      dataIndex: "description",
      render: (record) => record.replace("null", ""),
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (record) => (
        <Space size="middle">
          <a
            className="text-blue-500"
            onClick={() => handleCommonYearEdit(record)}
          >
            编辑
          </a>
          <a
            className="text-red-500"
            onClick={() => handleCommonYearDelete(record.id)}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    GetParamNames().then((res) => {
      setRateParamNames(res.data.data);
    });
  }, []);

  const getRates = () => {
    QueryRate(insurId).then((res) => {
      setCommissionRate(res.data.data);
    });
  };

  useEffect(() => {
    if (activeKey === "2") {
      getRates();
    }
  }, [activeKey]);

  const items = [
    {
      key: "1",
      label: "险种明细",
      children:
        activeKey === "1" ? (
          <div className="flex flex-col gap-2 mx-2 -mt-2 mb-4">
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>保险公司</p>
              <p className="flex-1 py-1 font-semibold">
                {allCompanyNames.filter((_) => _.value === companyId)[0]
                  ?.label || ""}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>主&ensp;/附约</p>
              <select
                defaultValue={mainOrVice}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    mainOrVice: e.target.value,
                  }));
                }}
                className={editSelectStyle}
              >
                {masterOptionsForCreate.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>险种代码</p>
              <input
                className={createInputStyle}
                type="text"
                value={code}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    code: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>险种类别</p>
              <select
                defaultValue={insurType}
                className={editSelectStyle}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    insurType: e.target.value,
                  }));
                }}
              >
                {insuranceTypeOptions.length &&
                  insuranceTypeOptions.map(({ value, name }) => (
                    <option key={value} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>险种全称</p>
              <input
                className={createInputStyle}
                type="text"
                value={insurFullName}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    insurFullName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className="w-16 text-gray-700">险种简称</p>
              <input
                className={createInputStyle}
                type="text"
                value={insurShortName}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    insurShortName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>参数区别</p>
              <select
                className={editSelectStyle}
                defaultValue={paramDiffNameId}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    paramDiffNameId: e.target.value,
                  }));
                }}
              >
                {paramDiffNames.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold">交费年期一览表</p>
              <button
                className={buttonStyle}
                onClick={() => setIsAddModalVisible(true)}
              >
                新增交费年期
              </button>
            </div>
            <Table
              rowKey="id"
              columns={commonYear_columns}
              dataSource={commonYear?.map((_, index) => ({
                ..._,
                id: index + 1,
              }))}
              pagination={false}
              size="small"
              scroll={{ y: 80 }}
            />
            <div className="flex gap-2 items-center">
              <p className={requiredFieldStyle}>销售期间</p>
              <RangePicker
                defaultValue={[dayjs(startSaleTime), dayjs(stopSaleTime)]}
                style={{ flex: 1 }}
                onChange={(value) => {
                  const [from, to] =
                    value?.map((_) => _.format("YYYY-MM-DD")) || [];
                  setNewRecord((pre) => ({
                    ...pre,
                    startSaleTime: from,
                    stopSaleTime: to,
                  }));
                }}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className="w-16 text-gray-700">备&emsp;&emsp;注</p>
              <input
                className={createInputStyle}
                type="text"
                value={remark}
                onChange={(e) => {
                  setNewRecord((pre) => ({
                    ...pre,
                    remark: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        ) : null,
    },
    {
      key: "2",
      label: "核佣费率列表",
      children:
        activeKey === "2" ? (
          <RateTab
            insurId={insurId}
            rateParamNames={rateParamNames}
            data={commissionRate}
            getRates={getRates}
          />
        ) : null,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={items}
          onChange={(e) => setActiveKey(e)}
          style={{
            marginBottom: -14,
          }}
        ></Tabs>
      </div>
      <div className="mt-4 mb-2 flex justify-end">
        <MyButton key="back" onClick={handleEditCancel}>
          {"关闭"}
        </MyButton>
        {activeKey === "1" && (
          <MyButton type="primary" onClick={handleEditOk}>
            {"保存"}
          </MyButton>
        )}
      </div>
      {/* year AddModal */}
      <Modal
        key={`add modal ${isAddModalVisible}`}
        title={"交费年期添加"}
        open={isAddModalVisible}
        closable={false}
        footer={[
          <MyButton
            key="cancel"
            onClick={() => {
              setIsAddModalVisible(false);
            }}
          >
            {"关闭"}
          </MyButton>,
          <MyButton type="primary" key="ok" onClick={handleCommonYearAddOk}>
            {"确定"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <p className="w-8 mr-2">年期</p>
            <InputNumber
              min={1}
              max={50}
              defaultValue={year}
              onChange={(value) => {
                setYear(value);
              }}
            />
          </div>
          <div className="flex items-start">
            <p className="w-8 mr-2">说明</p>
            <TextArea
              rows={4}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
      {/* year EditModal */}
      <Modal
        key={`edit modal ${isEditModalVisible}`}
        title={"交费年期编辑"}
        open={isEditModalVisible}
        closable={false}
        footer={[
          <MyButton
            key="cancel"
            onClick={() => {
              setIsEditModalVisible(false);
            }}
          >
            {"关闭"}
          </MyButton>,
          <MyButton type="primary" key="ok" onClick={handleCommonYearEditOk}>
            {"确定"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <p className="w-8 mr-2">年期</p>
            <InputNumber
              min={1}
              max={50}
              value={year}
              onChange={(value) => {
                setYear(value);
              }}
            />
          </div>
          <div className="flex items-start">
            <p className="w-8 mr-2">说明</p>
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditInformation;
