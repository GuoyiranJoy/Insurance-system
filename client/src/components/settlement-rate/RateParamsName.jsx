import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "费率参数名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "说明",
    dataIndex: "remark",
    key: "remark",
  },
];

const RateParamsName = () => {
  return <Table columns={columns} dataSource={[]} scroll={{ y: 500 }} />;
};

export default RateParamsName;