import { DatePicker, InputNumber, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
const { RangePicker } = DatePicker;

import { toast } from "react-toastify";
import { AddOrUpdateRate } from "../../../../services/commision-rate";
import { createInputStyle } from "../../../../utils/styles";
import MyButton from "../../../common/MyButton";

const itemTitleStyle = "w-24 py-1 pr-2 text-right font-semibold text-gray-600";

const RateCreateModal = ({
  insurId,
  rateParamNames,
  visibility,
  closeModal,
  getRates,
}) => {
  const [curRate, setCurRate] = useState({
    inOut: "收",
    rateParamNameId: 1,
    paramRateList: [],
    yearPeriodStart: 1,
    yearPeriodEnd: 1,
  });

  const [id, setId] = useState(1);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(1);

  const [curParamRateList, setCurParamRateList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateRate = () => {
    AddOrUpdateRate({ insurId, ...curRate })
      .then(() => {
        toast.success("新增成功!");
      })
      .finally(() => {
        closeModal();
        getRates();
      });
  };

  const handleOpenEdit = (record) => {
    setId(record.id);
    setYear(record.year);
    setRate(record.rate);
    setIsModalVisible(true);
  };

  const generateList = () => {
    const { yearPeriodStart, yearPeriodEnd } = curRate;
    if (yearPeriodStart > yearPeriodEnd) {
      toast.warn("请输入正确的年期范围!");
      return;
    }
    const list = new Array(yearPeriodEnd - yearPeriodStart + 1)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        year: index + yearPeriodStart,
        rate: 0,
      }));
    setCurParamRateList(list);
    setCurRate((pre) => ({
      ...pre,
      paramRateList: [...list],
    }));
    toast.success("成功生成参数表!");
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
    ,
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (record) => (
        <Space size="middle">
          <a
            className="text-blue-500"
            onClick={() => {
              handleOpenEdit(record);
            }}
          >
            编辑
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        key={visibility}
        title={"新增费率"}
        open={visibility}
        onCancel={closeModal}
        footer={[
          <MyButton key="back" onClick={closeModal}>
            {"关闭"}
          </MyButton>,
          <MyButton key="ok" type={"primary"} onClick={handleCreateRate}>
            {"提交"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col m-2 mb-4">
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>费率参数名称</p>
            <div className="flex-1 flex py-1 items-center">
              <select
                defaultValue={curRate.inOut}
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
                defaultValue={curRate.rateParamNameId}
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
                defaultValue={curRate.yearPeriodStart}
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
                defaultValue={curRate.yearPeriodEnd}
                onChange={(value) => {
                  setCurRate((pre) => ({ ...pre, yearPeriodEnd: value }));
                }}
              />
              <button
                onClick={generateList}
                disabled={!curRate.yearPeriodStart || !curRate.yearPeriodEnd}
                className="ml-auto px-2 py-0.5 border-solid border-[1.5px] rounded transition-all duration-100 border-transparent bg-green-500 text-white hover:bg-green-500/90 disabled:bg-slate-400/50 disabled:cursor-not-allowed"
              >
                产生参数值表
              </button>
            </p>
          </div>
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>使用期间</p>
            <RangePicker
              style={{ flex: 1, paddingRight: "0.5rem" }}
              onChange={(value) => {
                const [from, to] =
                  value?.map((_) => _.format("YYYY-MM-DD")) || [];
                setCurRate((pre) => ({
                  ...pre,
                  validateDateStart: from,
                  validateDateEnd: to,
                }));
              }}
            />
          </div>
          <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
            <p className={itemTitleStyle}>参数说明</p>
            <input
              type="text"
              className={createInputStyle}
              value={curRate.paramDescription}
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

export default RateCreateModal;
