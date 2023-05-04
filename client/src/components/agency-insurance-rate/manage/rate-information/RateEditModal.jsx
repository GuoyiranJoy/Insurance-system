import { DatePicker, Modal, Table, InputNumber, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
const { RangePicker } = DatePicker;

import MyButton from "../../../common/MyButton";
import { createInputStyle } from "../../../../utils/styles";

const itemTitleStyle = "w-24 py-1 pr-2 text-right font-semibold text-gray-600";

const RateEditModal = ({
  curRate,
  setCurRate,
  rateParamNames,
  visibility,
  handleOk,
  handleCancel,
}) => {
  const {
    rateParamNameId,
    inOut,
    yearPeriodStart,
    yearPeriodEnd,
    validateDateStart,
    validateDateEnd,
    paramRateList = [],
    paramDescription,
  } = curRate;

  const [curParamRateList, setCurParamRateList] = useState(
    paramRateList.length &&
      paramRateList.map((_, index) => ({ ..._, id: index + 1 }))
  );

  const [id, setId] = useState(1);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (record) => {
    setId(record.id);
    setYear(record.year);
    setRate(record.rate);
    setIsModalVisible(true);
  };

  const handleEditOk = () => {
    const newItem = { id, year, rate };
    setCurParamRateList((pre) => [
      ...pre.slice(0, id - 1),
      newItem,
      ...pre.slice(id),
    ]);
    setCurRate((pre) => ({
      ...pre,
      paramRateList: [
        ...curParamRateList.slice(0, id - 1),
        newItem,
        ...curParamRateList.slice(id),
      ],
    }));
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "年度",
      dataIndex: "year",
      width: 50,
    },
    {
      title: "费率",
      dataIndex: "rate",
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (record) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => handleEdit(record)}>
            编辑
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        key={`edit ${visibility}`}
        title={"编辑费率"}
        open={visibility}
        onCancel={handleCancel}
        footer={[
          <MyButton key="back" onClick={handleCancel}>
            {"关闭"}
          </MyButton>,
          <MyButton key="ok" type={"primary"} onClick={handleOk}>
            {"保存"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col m-2 mb-4">
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>费率参数名称</p>
            <div className="flex-1 flex py-1 items-center">
              <select
                defaultValue={inOut}
                className="mr-2 py-0.5 pl-0.5 pr-1 border-solid border-2 rounded"
                onChange={(e) => {
                  setCurRate((pre) => ({
                    ...pre,
                    inOut: e.target.value,
                  }));
                }}
              >
                <option value={"收"}>收</option>
                <option value={"支"}>支</option>
              </select>
              <p className="mr-8">项</p>
              <select
                defaultValue={rateParamNameId}
                className="mr-4 py-0.5 pl-0.5 pr-1 border-solid border-2 rounded"
                onChange={(e) => {
                  setCurRate((pre) => ({
                    ...pre,
                    rateParamNameId: e.target.value,
                  }));
                }}
              >
                {rateParamNames.map(({ id, rateName }) => (
                  <option key={id} value={id}>
                    {rateName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>年期/分档</p>
            <p className="flex-1 flex items-center">
              <InputNumber
                min={1}
                max={50}
                size="small"
                className="py-0.5"
                defaultValue={yearPeriodStart}
                onChange={(value) => {
                  setCurRate((pre) => ({ ...pre, yearPeriodStart: value }));
                }}
              />
              <MdArrowRightAlt className="mx-4 text-lg" />
              <InputNumber
                min={1}
                max={50}
                size="small"
                className="py-0.5"
                defaultValue={yearPeriodEnd}
                onChange={(value) => {
                  setCurRate((pre) => ({ ...pre, yearPeriodEnd: value }));
                }}
              />
            </p>
          </div>
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>使用期间</p>
            <RangePicker
              defaultValue={[dayjs(validateDateStart), dayjs(validateDateEnd)]}
              style={{ flex: 1, paddingRight: "0.5rem" }}
              onChange={(time) => {
                const [start, end] = time;
                setCurRate((pre) => ({
                  ...pre,
                  validateDateStart: dayjs(start).toDate(),
                  validateDateEnd: dayjs(end).toDate(),
                }));
              }}
            />
          </div>
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>参数说明</p>
            <input
              type="text"
              className={createInputStyle}
              value={paramDescription}
              onChange={(e) => {
                setCurRate((pre) => ({
                  ...pre,
                  paramDescription: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex mb-1 gap-2 items-start rounded hover:bg-gray-100">
            <p className={`${itemTitleStyle} shrink-0`}>参数值表</p>
            <Table
              rowKey={"year"}
              className="py-2 pr-2 flex-1"
              columns={columns}
              dataSource={curParamRateList}
              pagination={false}
              size="small"
              scroll={{ y: 200 }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        key={`rate ${isModalVisible}`}
        title={"编辑参数值"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <MyButton
            key="back"
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            {"关闭"}
          </MyButton>,
          <MyButton key="ok" type={"primary"} onClick={handleEditOk}>
            {"保存"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start">
            <p className="w-8 mr-2">年度</p>
            <p>{year}</p>
          </div>
          <div className="flex items-center">
            <p className="w-8 mr-2">费率</p>
            <InputNumber
              min={0.1}
              max={1}
              precision={1}
              step={0.1}
              defaultValue={rate}
              onChange={(value) => {
                setRate(value);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RateEditModal;
