import { DatePicker, Modal, Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
const { RangePicker } = DatePicker;

import MyButton from "../../../common/MyButton";

const itemTitleStyle = "w-24 py-1 pr-2 text-right font-semibold text-gray-600";

const RateViewModal = ({
  curRate,
  rateParamNames,
  visibility,
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
  ];

  return (
    <Modal
      key={visibility}
      title={"费率详情"}
      open={visibility}
      onCancel={handleCancel}
      footer={
        <MyButton key="back" onClick={handleCancel}>
          {"关闭"}
        </MyButton>
      }
    >
      <div className="flex flex-col m-2 mb-4">
        <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
          <p className={itemTitleStyle}>费率参数名称</p>
          <p className="flex-1 py-1 items-center">
            <span className="mr-4">{`${inOut}项 `}</span>
            {rateParamNames.filter((_) => _.id === +rateParamNameId)[0]
              ?.rateName || ""}
          </p>
        </div>
        <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
          <p className={itemTitleStyle}>年期/分档</p>
          <p className="flex-1 flex items-center">
            <span className="px-8 border-solid border-[1px] border-gray-300 rounded bg-gray-100">
              {yearPeriodStart}
            </span>
            <MdArrowRightAlt className="mx-4 text-lg" />
            <span className="px-8 border-solid border-[1px] border-gray-300 rounded bg-gray-100">
              {yearPeriodEnd}
            </span>
          </p>
        </div>
        <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
          <p className={itemTitleStyle}>使用期间</p>
          <RangePicker
            defaultValue={[dayjs(validateDateStart), dayjs(validateDateEnd)]}
            style={{ flex: 1, paddingRight: "0.5rem" }}
            disabled
          />
        </div>
        <div className="flex mb-1 gap-2 items-center rounded hover:bg-gray-100">
          <p className={itemTitleStyle}>参数说明</p>
          <p className="flex-1">{paramDescription}</p>
        </div>
        <div className="flex mb-1 gap-2 items-start rounded hover:bg-gray-100">
          <p className={`${itemTitleStyle} shrink-0`}>参数值表</p>
          <Table
            rowKey={"year"}
            className="py-2 pr-2 flex-1"
            columns={columns}
            dataSource={paramRateList}
            pagination={false}
            size="small"
            scroll={{ y: 200 }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RateViewModal;
