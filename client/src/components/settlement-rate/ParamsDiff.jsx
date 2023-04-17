import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 140,
  },
  {
    title: "项目名称",
    dataIndex: "name",
    key: "name",
    width: 240,
  },
  {
    title: "说明",
    dataIndex: "remark",
    key: "remark",
  },
];

const data = [
  { id: 0, name: "一般险种", remark: "" },
  { id: 11, name: "团体险种", remark: "" },
  { id: 12, name: "卡单险种", remark: "" },
  { id: 13, name: "车险险种", remark: "" },
  { id: 14, name: "财险险种", remark: "" },
  { id: 98, name: "自营网络平台险种", remark: "" },
  { id: 99, name: "第三方网络平台险种", remark: "" },
];

const ParamsDiff = () => {
  return <Table columns={columns} dataSource={data} scroll={{ y: 500 }} />;
};

export default ParamsDiff;
