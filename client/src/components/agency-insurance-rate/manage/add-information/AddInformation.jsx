import { DatePicker, Input, InputNumber, Modal, Space, Table } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  insuranceTypeOptions,
  masterOptionsForCreate,
} from "../../../../utils/options";
import { buttonStyle, createInputStyle } from "../../../../utils/styles";
import MyButton from "../../../common/MyButton";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const requiredFieldStyle =
  "w-16 text-gray-700 after:content-['*'] after:text-red-500";

const AddInformation = ({ info, setInfo, allCompanyNames, paramDiffNames }) => {
  const [year, setYear] = useState(1);
  const [description, setDescription] = useState("");
  const [commonYearId, setCommonYearId] = useState(1);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
    setInfo((pre) => ({
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
    const newCommonYear = info.commonYear
      ? info.commonYear.concat([newItem])
      : [newItem];
    setInfo((pre) => ({
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
    setInfo((pre) => ({
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

  useEffect(() => {
    setInfo({
      companyId: allCompanyNames[0]?.value,
      mainOrVice: masterOptionsForCreate[0]?.value,
      insurType: insuranceTypeOptions[0].name,
      paramDiffNameId: paramDiffNames[0].value,
    });
  }, []);

  const commYearColumns = [
    {
      title: "年期/分档",
      dataIndex: "year",
      width: 100,
    },
    {
      title: "说明",
      dataIndex: "description",
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
            移除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <p className={requiredFieldStyle}>保险公司</p>
          <select
            className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
            defaultValue={allCompanyNames[0].value}
            onChange={(e) => {
              setInfo((pre) => ({
                ...pre,
                companyId: +e.target.value,
              }));
            }}
          >
            {allCompanyNames.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <p className={requiredFieldStyle}>主&ensp;/附约</p>
          <select
            className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
            onChange={(e) => {
              setInfo((pre) => ({
                ...pre,
                mainOrVice: e.target.value,
              }));
            }}
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
            id="insurance-code"
            onChange={(e) => {
              setInfo((pre) => ({
                ...pre,
                code: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className={requiredFieldStyle}>险种类别</p>
          <select
            className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
            id="insurance-type"
            onChange={(e) => {
              setInfo((pre) => ({
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
            onChange={(e) => {
              setInfo((pre) => ({
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
            onChange={(e) => {
              setInfo((pre) => ({
                ...pre,
                insurShortName: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className={requiredFieldStyle}>参数区别</p>
          <select
            className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
            onChange={(e) => {
              setInfo((pre) => ({
                ...pre,
                paramDiffNameId: +e.target.value,
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
          columns={commYearColumns}
          dataSource={info.commonYear?.map((_, index) => ({
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
            style={{ flex: 1 }}
            onChange={(time) => {
              const [start, end] = time;
              setInfo((pre) => ({
                ...pre,
                startSaleTime: dayjs(start).toDate(),
                stopSaleTime: dayjs(end).toDate(),
              }));
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className="w-16 text-gray-700">备&emsp;&emsp;注</p>
          <input
            className={createInputStyle}
            type="text"
            onChange={(e) => {
              setInfo((pre) => ({
                ...pre,
                remark: e.target.value,
              }));
            }}
          />
        </div>
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

export default AddInformation;
