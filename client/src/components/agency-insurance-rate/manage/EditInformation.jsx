import React, { useState } from "react";
import { Table, Space } from "antd";
import { masterOptions } from "../../../utils/options";
import { buttonStyle, querySelectStyle } from "../../../utils/styles";

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
    annual: "1",
    illustrate: "胡彦斌",
  },
];

const EditInformation = ({ record }) => {
  const [newRecord, setNewRecord] = useState({ ...record });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p>保险公司</p>
        <p className="flex-1 py-1 font-semibold">{record.company}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p>主&ensp;/附约</p>
        <select
          defaultValue={record.master}
          onChange={(e) => {
            setNewRecord((pre) => ({ ...pre, master: +e.target.value }));
          }}
          className={querySelectStyle}
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
        <input
          className="border border-gray-300 border-solid rounded flex-1"
          type="text"
          name=""
          id=""
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>险种类别</p>
        <select
          className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
          name=""
          id=""
        >
          <option value="">全部</option>
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <p>险种全称</p>
        <input
          className="border border-gray-300 border-solid rounded flex-1"
          type="text"
          name=""
          id=""
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>险种简称</p>
        <input
          className="border border-gray-300 border-solid rounded flex-1"
          type="text"
          name=""
          id=""
        />
        <label htmlFor="">
          <input type="checkbox" name="insurance-code" id="insurance-code" />
          费率同步主约
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <p>参数区别</p>
        <select
          className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
          name=""
          id=""
        >
          <option value="">全部</option>
        </select>
        <label htmlFor="">
          <input type="checkbox" name="insurance-code" id="insurance-code" />
          费率同步首年
        </label>
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
    </div>
  );
};

export default EditInformation;
