import { DatePicker, Space, Table, Tabs } from "antd";
import React, { useState } from "react";
import {
  insuranceTypeOptions,
  masterOptions,
  paramTypeOptions,
} from "../../../utils/options";
import {
  buttonStyle,
  createInputStyle,
  editSelectStyle,
} from "../../../utils/styles";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";

const columns = [
  {
    title: "年期/分档",
    dataIndex: "annual",
  },
  {
    title: "说明",
    dataIndex: "illustrate",
  },
  {
    title: "操作",
    key: "action",
    width: 160,
    render: (_, record) => (
      <Space size="middle">
        <a className="text-blue-500">编辑</a>
        <a className="text-red-500">移除</a>
      </Space>
    ),
  },
];

const dataSource = [
  {
    annual: 5,
    illustrate: "",
  },
];

const EditInformation = ({ record }) => {
  console.log(record);
  const [newRecord, setNewRecord] = useState({ ...record });

  const {
    company,
    code,
    main_or_vice,
    insurance_type,
    insurance_cname,
    insurance_sname,
    param_type,
    start_sale_time,
    stop_sale_time,
    remark,
  } = record;

  const items = [
    {
      key: "1",
      label: `险种明细`,
    },
    {
      key: "2",
      label: `核佣费率列表`,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        defaultActiveKey="1"
        items={items}
        type="card"
        style={{
          marginBottom: -14,
        }}
      />
      <div className="flex gap-2 items-center">
        <p>保险公司</p>
        <p className="flex-1 py-1 font-semibold">{company}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p>主&ensp;/附约</p>
        <select
          defaultValue={main_or_vice}
          onChange={(e) => {
            setNewRecord((pre) => ({ ...pre, master: +e.target.value }));
          }}
          className={editSelectStyle}
        >
          {masterOptions.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <p>险种代码</p>
        <input className={createInputStyle} type="text" value={code} />
      </div>
      <div className="flex gap-2 items-center">
        <p>险种类别</p>
        <select
          defaultValue={insurance_type}
          className={editSelectStyle}
          name=""
          id=""
        >
          {insuranceTypeOptions.length &&
            insuranceTypeOptions.map(({ value, name }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <p>险种全称</p>
        <input
          className={createInputStyle}
          type="text"
          value={insurance_cname}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>险种简称</p>
        <input
          className={createInputStyle}
          type="text"
          value={insurance_sname}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>参数区别</p>
        <select className={editSelectStyle} defaultValue={param_type}>
          {paramTypeOptions.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold">交费年期一览表</p>
        <button className={buttonStyle}>新增</button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
      />
      <div className="flex gap-2 items-center">
        <p>销售期间</p>
        <RangePicker
          defaultValue={[dayjs(start_sale_time), dayjs(stop_sale_time)]}
          style={{ flex: 1 }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>备&emsp;&emsp;注</p>
        <input className={createInputStyle} type="text" value={remark} />
      </div>
    </div>
  );
};

export default EditInformation;
